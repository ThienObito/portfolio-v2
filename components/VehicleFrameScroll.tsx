'use client';

import { useEffect, useRef, useState } from 'react';
import { SEQUENCE } from '@/data/sequence';

const KEYFRAME_STRIDE = 6;

function frameSrc(i: number) {
  const n = String(i + 1).padStart(3, '0');
  return `${SEQUENCE.folder}/${SEQUENCE.prefix}${n}.${SEQUENCE.ext}`;
}

interface Props {
  progress: number;
  onReady?: () => void;
}

export default function VehicleFrameScroll({ progress, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(SEQUENCE.count).fill(null)
  );
  const lastDrawn = useRef(-1);
  const progressRef = useRef(progress);
  const warned = useRef(false);

  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(0);
  const [ready, setReady] = useState(false);

  progressRef.current = progress;

  /* ---------------------------------------------------------- drawing --- */

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return; // layout not settled yet

    // size the backing store FIRST — a resize invalidates the last draw
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bw = Math.round(rect.width * dpr);
    const bh = Math.round(rect.height * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      lastDrawn.current = -1;
    }

    const target = Math.min(
      SEQUENCE.count - 1,
      Math.max(0, Math.round(progressRef.current * (SEQUENCE.count - 1)))
    );

    // fall back to the nearest loaded frame rather than blanking the canvas
    let idx = target;
    if (!imagesRef.current[idx]) {
      let found = -1;
      for (let r = 1; r < SEQUENCE.count; r++) {
        if (imagesRef.current[target - r]) {
          found = target - r;
          break;
        }
        if (imagesRef.current[target + r]) {
          found = target + r;
          break;
        }
      }
      if (found < 0) return;
      idx = found;
    }
    if (idx === lastDrawn.current) return;

    const img = imagesRef.current[idx]!;
    if (!img.naturalWidth) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = SEQUENCE.background;
    ctx.fillRect(0, 0, rect.width, rect.height);

    const coverScale = Math.max(
      rect.width / img.naturalWidth,
      rect.height / img.naturalHeight
    );

    if (!warned.current && rect.width * dpr > img.naturalWidth * 1.6) {
      warned.current = true;
      // eslint-disable-next-line no-console
      console.warn(
        `[VehicleFrameScroll] Frame nguồn rộng ${img.naturalWidth}px nhưng canvas cần ` +
          `~${Math.round(rect.width * dpr)}px. Nên xuất lại chuỗi ở 2560px.`
      );
    }

    const dw = Math.round(img.naturalWidth * coverScale);
    const dh = Math.round(img.naturalHeight * coverScale);
    const dx = Math.round((rect.width - dw) / 2);
    const dy = Math.round((rect.height - dh) / 2);

    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawn.current = idx;
  };

  const schedule = () => {
    draw();
  };

  /* ---------------------------------------------------------- loading --- */

  useEffect(() => {
    let cancelled = false;
    let done = 0;
    let errs = 0;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (imagesRef.current[i]) return resolve();

        const img = new Image();
        img.decoding = 'async';

        const finish = () => {
          if (!cancelled) {
            imagesRef.current[i] = img;
            done += 1;
            setLoaded(done);
            schedule();
          }
          resolve();
        };

        // handlers BEFORE src — a cached image fires load synchronously
        img.onload = () => {
          if (typeof img.decode === 'function') {
            img.decode().then(finish).catch(finish);
          } else {
            finish();
          }
        };
        img.onerror = () => {
          errs += 1;
          if (!cancelled) setFailed(errs);
          // eslint-disable-next-line no-console
          console.error('[VehicleFrameScroll] Không tải được frame:', frameSrc(i));
          resolve();
        };

        img.src = frameSrc(i);

        // covers the case where the image was already complete on assignment
        if (img.complete && img.naturalWidth) finish();
      });

    (async () => {
      const keys: number[] = [];
      for (let i = 0; i < SEQUENCE.count; i += KEYFRAME_STRIDE) keys.push(i);
      if (keys[keys.length - 1] !== SEQUENCE.count - 1) keys.push(SEQUENCE.count - 1);

      await Promise.all(keys.map(load));
      if (cancelled) return;
      setReady(true);
      schedule();
      onReady?.();

      const rest: number[] = [];
      for (let i = 0; i < SEQUENCE.count; i++) {
        if (!imagesRef.current[i]) rest.push(i);
      }
      for (let i = 0; i < rest.length; i += 4) {
        if (cancelled) return;
        await Promise.all(rest.slice(i, i + 4).map(load));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  /* ------------------------------------------------------ resize/draw --- */

  useEffect(() => {
    schedule();
  }, [progress, loaded, ready]);

  useEffect(() => {
    const el = canvasRef.current;
    const invalidate = () => {
      lastDrawn.current = -1;
      schedule();
    };

    window.addEventListener('resize', invalidate);
    const ro = el && 'ResizeObserver' in window ? new ResizeObserver(invalidate) : null;
    if (ro && el) ro.observe(el);

    // one forced paint after first layout settles
    const t = window.setTimeout(invalidate, 60);

    return () => {
      window.removeEventListener('resize', invalidate);
      ro?.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const pct = Math.round((loaded / SEQUENCE.count) * 100);

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ background: SEQUENCE.background }}
        aria-label="Portfolio project showcase"
        role="img"
      />

      {/* Watermark cover */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-80 bg-[radial-gradient(ellipse_at_bottom_right,_#0B0B0D_20%,_transparent_70%)] opacity-90" />

      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0B0B0D]">
          <div className="h-px w-40 overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#F26522] transition-[width] duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Đang tải chuỗi dữ liệu
          </p>
        </div>
      )}

      {failed > 0 && (
        <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F26522]">
          {failed} frame không tải được — kiểm tra public/images/sequence
        </p>
      )}
    </div>
  );
}
