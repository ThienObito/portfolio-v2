'use client';

import { useState } from 'react';

/**
 * Sits bottom-right, which is also where the generated frames carry their
 * provenance mark — the bubble covers it in the full-bleed layout.
 */
export default function ContactBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[19rem] rounded-2xl border border-white/10 bg-[#1E1F22] p-5 shadow-2xl">
          <p className="text-sm font-semibold text-[#F4EFE7]">Contact</p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-400">
            Have a project in mind? Let's talk about how we can work together.
          </p>
          <a
            href="mailto:hello@portfolio.dev"
            className="mt-4 block rounded-lg bg-[#F26522] py-2.5 text-center text-sm font-medium text-white transition hover:brightness-110"
          >
            Get in touch
          </a>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            Available for work
          </p>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Đóng hộp liên hệ' : 'Mở hộp liên hệ'}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#F26522] shadow-lg shadow-black/60 transition hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          )}
        </svg>
      </button>
    </>
  );
}
