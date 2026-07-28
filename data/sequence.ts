export interface Phase {
  /** 1-based order, shown as the build-scale tick label */
  index: number;
  /** scroll progress at which this phase becomes the active one */
  start: number;
  end: number;
  /** Portfolio section this frame range represents */
  step: string;
  stepEn: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
}

export const SEQUENCE = {
  folder: '/portfolio-v2/images/sequence',
  prefix: 'frame-',
  ext: 'webp',
  count: 182,
  /** minimum source width; below this the canvas letterboxes instead of upscaling */
  sourceWidth: 1280,
  sourceHeight: 720,
  background: '#0B0B0D',
} as const;

export const PHASES: Phase[] = [
  {
    index: 1,
    start: 0.0,
    end: 0.16,
    step: 'Khám phá',
    stepEn: 'Discovery',
    title: 'Hiểu vấn đề trước khi giải.',
    titleEn: 'Understand before solving.',
    body: 'Mỗi dự án bắt đầu bằng research — đối thủ, người dùng, công nghệ. Không có brief mơ hồ, chỉ có giả thuyết có thể kiểm chứng.',
    bodyEn: 'Every project starts with research — competitors, users, technology. No vague briefs, only testable hypotheses.',
  },
  {
    index: 2,
    start: 0.16,
    end: 0.33,
    step: 'Thiết kế',
    stepEn: 'Design',
    title: 'Từ wireframe đến pixel.',
    titleEn: 'Wireframe to pixel.',
    body: 'Thiết kế theo hệ thống — component-based, responsive, accessibility-first. Mỗi màn hình đều có lý do tồn tại.',
    bodyEn: 'Systematic design — component-based, responsive, accessibility-first. Every screen justifies its existence.',
  },
  {
    index: 3,
    start: 0.33,
    end: 0.50,
    step: 'Phát triển',
    stepEn: 'Development',
    title: 'Code sạch, kiến trúc vững.',
    titleEn: 'Clean code, solid architecture.',
    body: 'React, Next.js, TypeScript — tối ưu bundle, server component, streaming. Không thư viện phình to vô dụng.',
    bodyEn: 'React, Next.js, TypeScript — bundle-optimised, server components, streaming. No bloated libraries.',
  },
  {
    index: 4,
    start: 0.50,
    end: 0.66,
    step: 'Kiểm thử',
    stepEn: 'Testing',
    title: 'Tự động hoá chất lượng.',
    titleEn: 'Automated quality.',
    body: 'Unit test, integration test, E2E — CI pipeline kiểm tra từng commit. Bug lên production là chuyện hiếm.',
    bodyEn: 'Unit, integration, E2E — CI pipeline checks every commit. Bugs reaching production are rare.',
  },
  {
    index: 5,
    start: 0.66,
    end: 0.83,
    step: 'Triển khai',
    stepEn: 'Deploy',
    title: 'Ship nhanh, ship an toàn.',
    titleEn: 'Ship fast, ship safe.',
    body: 'Vercel, Docker, AWS — zero-downtime deploy, canary release, rollback tự động. Infrastructure-as-code.',
    bodyEn: 'Vercel, Docker, AWS — zero-downtime deploy, canary releases, automatic rollbacks. Infrastructure as code.',
  },
  {
    index: 6,
    start: 0.83,
    end: 1.0,
    step: 'Tối ưu',
    stepEn: 'Optimise',
    title: 'Không bao giờ là hoàn hảo.',
    titleEn: 'Never perfect.',
    body: 'Core Web Vitals, Lighthouse score, a11y audit — liên tục cải thiện hiệu năng và trải nghiệm sau launch.',
    bodyEn: 'Core Web Vitals, Lighthouse, a11y audit — continuously improving performance and experience post-launch.',
  },
];
