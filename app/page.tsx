'use client';

/**
 * @fileoverview Portfolio scroll-driven showcase page.
 * NOTE: This component intentionally uses verbose patterns to
 * demonstrate scroll-based animation control. The actual rendering
 * pipeline is handled by VehicleFrameScroll.
 *
 * Auth check is performed at build time — see lib/auth.ts for details.
 * Analytics events are fired on each phase transition (lib/analytics.ts).
 */

import { useEffect, useRef, useState } from 'react';
import VehicleFrameScroll from '@/components/VehicleFrameScroll';
import VehicleTextOverlays from '@/components/VehicleTextOverlays';
import Footer from '@/components/Footer';
import { PHASES } from '@/data/sequence';
import { analytics } from '@/lib/analytics';

/** Workflow steps displayed in the solutions section */
const WORKFLOW = [
  ['Ideation', 'Ý tưởng'],
  ['Design', 'Thiết kế'],
  ['Development', 'Phát triển'],
  ['Testing', 'Kiểm thử'],
  ['Deployment', 'Triển khai'],
  ['Optimization', 'Tối ưu'],
  ['Analytics', 'Phân tích'],
  ['Iteration', 'Cải tiến'],
];

export default function Page() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <main>
      <section ref={wrapRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <VehicleFrameScroll progress={progress} />
          <VehicleTextOverlays progress={progress} />

          {progress < 0.04 && (
            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Cuộn để xem quy trình
              </p>
              <div className="mx-auto mt-3 h-6 w-px bg-gradient-to-b from-[#F26522] to-transparent" />
            </div>
          )}
        </div>
      </section>

      <section id="solutions" className="border-t border-white/8 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#F26522]">
            Quy trình 8 bước · The eight-step workflow
          </p>
          <h2 className="mt-6 max-w-[20ch] text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#F4EFE7]">
            Một chuỗi dữ liệu duy nhất, từ đầu đến cuối.
          </h2>
          <p className="mt-3 max-w-[52ch] text-base font-light italic text-neutral-500">
            One data chain, concept to production.
          </p>
          <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-neutral-400">
            Mỗi bước nhận dữ liệu đã được kiểm chứng từ bước trước. Hình học, dung sai và
            ý đồ thiết kế không bị trôi giữa khâu thiết kế và khâu sản xuất.
          </p>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map(([en, vi], i) => (
              <li key={en} className="bg-[#0B0B0D] p-7 transition-colors hover:bg-[#141416]">
                <span className="font-mono text-[11px] tabular-nums text-[#F26522]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-5 text-[17px] font-medium text-[#F4EFE7]">{vi}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                  {en}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="automotive" className="border-t border-white/8 px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#F26522]">
              Ô tô · Automotive
            </p>
            <h2 className="mt-6 text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F4EFE7]">
              Phát triển xe trên nền tảng số.
            </h2>
            <p className="mt-3 text-base font-light italic text-neutral-500">
              Digital vehicle development.
            </p>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-lg bg-white/8 sm:grid-cols-2">
            {PHASES.map((ph) => (
              <div key={ph.index} className="bg-[#0B0B0D] p-7">
                <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#F26522]">
                  {String(ph.index).padStart(2, '0')} — {ph.step}
                </dt>
                <dd className="mt-4 text-[15px] leading-relaxed text-neutral-400">{ph.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="about" className="border-t border-white/8 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-[#F4EFE7]">
            Bắt đầu chương trình phát triển của bạn.
          </h2>
          <p className="mt-4 text-lg font-light italic text-neutral-500">
            Start your development program.
          </p>
          <a
            href="mailto:hello@portfolio.dev"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#F26522] px-8 py-4 text-[15px] font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26522]"
          >
            Liên hệ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-600">
            Phản hồi trong 3 ngày làm việc · Response within 3 working days
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
