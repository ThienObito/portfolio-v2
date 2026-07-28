const COLS = [
  {
    head: 'Giải pháp',
    headEn: 'Solutions',
    items: ['Web App', 'Mobile App', 'UI/UX Design', 'API Design', 'Performance', 'Consulting'],
  },
  {
    head: 'Lĩnh vực',
    headEn: 'Industries',
    items: ['Tech', 'Finance', 'Healthcare', 'Education'],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/8 bg-[#141416] px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-[15px] font-semibold tracking-[0.22em] text-[#F4EFE7]">
            THINK<span className="text-[#F26522]">SMART</span>
          </p>
          <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-neutral-400">
            Creative developer with 8+ years building digital products. Specialising in interactive web experiences and performant applications.
          </p>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-neutral-600">
            From startups to enterprise — delivering clean, scalable, and delightful software.
          </p>
          <a
            href="mailto:hello@portfolio.dev"
            className="mt-6 inline-block text-sm text-[#F26522] transition hover:brightness-125"
          >
            hello@portfolio.dev
          </a>
        </div>

        {COLS.map((c) => (
          <div key={c.head}>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500">
              {c.head} · {c.headEn}
            </p>
            <ul className="mt-5 space-y-2.5">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-neutral-400 transition-colors hover:text-[#F4EFE7]">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-[1600px] flex-col gap-2 border-t border-white/8 pt-6 text-[11px] text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Văn phòng tại cả ba miền Việt Nam · Offices across all three regions of Vietnam</p>
        <p>© {new Date().getFullYear()} Portfolio</p>
      </div>
    </footer>
  );
}
