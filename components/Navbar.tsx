'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { vi: 'Giải pháp', href: '#solutions' },
  { vi: 'Ô tô', href: '#automotive' },
  { vi: 'Y tế', href: '#medical' },
  { vi: 'Về chúng tôi', href: '#about' },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? 'border-b border-white/8 bg-[#0B0B0D]/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M16 2 29 9.5v13L16 30 3 22.5v-13L16 2Z" stroke="#F26522" strokeWidth="1.6" />
            <path d="M16 9v14M10.5 12.5 16 9l5.5 3.5" stroke="#F4EFE7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] font-semibold tracking-[0.22em] text-[#F4EFE7]">
            THINK<span className="text-[#F26522]">SMART</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] tracking-wide text-neutral-400 transition-colors hover:text-[#F4EFE7]"
              >
                {l.vi}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full bg-[#F26522] px-5 py-2 text-[13px] font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26522]"
        >
          Liên hệ
        </a>
      </nav>
    </header>
  );
}
