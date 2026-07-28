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
  folder: '/images/sequence',
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
    end: 0.17,
    step: 'Quét 3D',
    stepEn: '3D Scanning',
    title: 'Bắt đầu từ dữ liệu thật.',
    titleEn: 'It starts with real data.',
    body: 'Máy quét cầm tay ghi lại hàng triệu điểm đo trên bề mặt vật thể. Không phỏng đoán, không dựng lại từ trí nhớ — chỉ có hình học đúng như nó tồn tại.',
    bodyEn: 'Handheld scanning captures millions of measured points. No guesswork — only the geometry as it actually exists.',
  },
  {
    index: 2,
    start: 0.17,
    end: 0.34,
    step: 'Thiết kế ngược',
    stepEn: 'Reverse Engineering',
    title: 'Đám mây điểm thành hình học.',
    titleEn: 'Point cloud becomes geometry.',
    body: 'Dữ liệu quét được chuyển thành lưới đa giác rồi thành bề mặt Class-A. Đây là bước biến phép đo thành mô hình có thể chỉnh sửa và sản xuất.',
    bodyEn: 'Scan data becomes a mesh, then a Class-A surface — a measurement turned into an editable, manufacturable model.',
  },
  {
    index: 3,
    start: 0.34,
    end: 0.505,
    step: 'Mô phỏng CAE',
    stepEn: 'CAE Simulation',
    title: 'Kiểm chứng trước khi có kim loại.',
    titleEn: 'Validated before any metal exists.',
    body: 'Kết cấu, khí động học và nhiệt được mô phỏng trên mô hình số. Lỗi được tìm thấy khi sửa còn rẻ, chứ không phải khi khuôn đã cắt.',
    bodyEn: 'Structure, aerodynamics and thermal behaviour are simulated first — so problems surface while they are still cheap to fix.',
  },
  {
    index: 4,
    start: 0.505,
    end: 0.67,
    step: 'In 3D',
    stepEn: 'Additive Manufacturing',
    title: 'Từ số hoá đến vật thể.',
    titleEn: 'From data back into matter.',
    body: 'Mô hình được in từng lớp thành mẫu vật lý. Thứ vừa tồn tại trong máy tính nay có thể cầm trên tay, lắp thử, và đo lại.',
    bodyEn: 'The model is printed layer by layer into a physical part — something you can hold, fit and re-measure.',
  },
  {
    index: 5,
    start: 0.67,
    end: 0.835,
    step: 'Kỹ thuật & JIG',
    stepEn: 'Engineering & JIG',
    title: 'Hoàn thiện đến từng bề mặt.',
    titleEn: 'Finished down to the surface.',
    body: 'Dung sai, gá lắp và quy trình gia công được chuẩn hoá. Đây là bước đưa một mẫu thử trở thành thứ có thể sản xuất lặp lại.',
    bodyEn: 'Tolerances, fixtures and process are locked in — the step that turns a prototype into something repeatable.',
  },
  {
    index: 6,
    start: 0.835,
    end: 1.0,
    step: 'Chế tạo mẫu',
    stepEn: 'Prototyping',
    title: 'Sẵn sàng cho sản xuất.',
    titleEn: 'Ready for production.',
    body: '17 năm, một chuỗi dữ liệu liền mạch từ ý tưởng đến sản phẩm — cho Ô tô, Y tế, Hàng không vũ trụ và Công nghiệp.',
    bodyEn: 'Seventeen years, one unbroken data chain from concept to product — across automotive, medical, aerospace and industry.',
  },
];
