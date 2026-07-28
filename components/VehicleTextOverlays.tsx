'use client';

import { PHASES } from '@/data/sequence';

interface Props {
  progress: number;
}

/** eased 0→1→0 window so copy fades in, holds, then fades out */
function windowOpacity(p: number, start: number, end: number) {
  const span = end - start;
  const inLen = span * 0.22;
  const outLen = span * 0.18;
  if (p < start || p > end) return 0;
  if (p < start + inLen) return (p - start) / inLen;
  if (p > end - outLen) return (end - p) / outLen;
  return 1;
}

export default function VehicleTextOverlays({ progress }: Props) {
  const active = PHASES.reduce(
    (best, ph) =>
      progress >= ph.start && progress < ph.end ? ph.index : best,
    1
  );

  return (
    <>
      {/* scrim keeps copy legible over the brightest frames */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(11,11,13,0.92) 0%, rgba(11,11,13,0.72) 30%, rgba(11,11,13,0) 62%)',
        }}
      />

      {PHASES.map((ph) => {
        const o = windowOpacity(progress, ph.start, ph.end);
        return (
          <div
            key={ph.index}
            className="pointer-events-none absolute inset-y-0 left-0 flex w-full items-center px-6 sm:px-12 lg:w-[52%] lg:px-20"
            style={{
              opacity: o,
              transform: `translateY(${(1 - o) * 14}px)`,
              transition: 'opacity 120ms linear, transform 120ms linear',
            }}
            aria-hidden={o < 0.5}
          >
            <div className="max-w-[34ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#F26522]">
                {String(ph.index).padStart(2, '0')} — {ph.step}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                {ph.stepEn}
              </p>

              <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#F4EFE7]">
                {ph.title}
              </h2>
              <p className="mt-2 text-[clamp(0.95rem,1.4vw,1.15rem)] font-light italic leading-snug text-neutral-500">
                {ph.titleEn}
              </p>

              <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-neutral-400">
                {ph.body}
              </p>
              <p className="mt-3 max-w-[46ch] text-[13px] leading-relaxed text-neutral-600">
                {ph.bodyEn}
              </p>
            </div>
          </div>
        );
      })}

      {/* ── signature: build-head scale, like a print job in progress ── */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 md:block lg:right-10">
        <div className="relative h-[46vh] w-px bg-white/12">
          <div
            className="absolute left-0 w-px bg-[#F26522]"
            style={{ top: 0, height: `${progress * 100}%` }}
          />
          <div
            className="absolute -left-3 h-px w-7 bg-[#F26522] shadow-[0_0_12px_rgba(242,101,34,0.9)]"
            style={{ top: `${progress * 100}%` }}
          />
          {PHASES.map((ph) => (
            <div
              key={ph.index}
              className="absolute left-0 flex items-center gap-2"
              style={{ top: `${ph.start * 100}%` }}
            >
              <span
                className={`h-px transition-all duration-300 ${
                  ph.index === active ? 'w-3 bg-[#F26522]' : 'w-1.5 bg-white/25'
                }`}
              />
              <span
                className={`font-mono text-[9px] tabular-nums transition-colors duration-300 ${
                  ph.index === active ? 'text-[#F26522]' : 'text-neutral-700'
                }`}
              >
                {String(ph.index).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
