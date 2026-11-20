// Marca de Studio Digital: "S" geométrica sobre degradado morado.
export default function BrandMark({ size = 36 }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2D1457" />
          <stop offset="1" stopColor="#6C3BDB" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#bm-g)" />
      <path d="M44 16H28A8 8 0 0 0 28 32H36A8 8 0 0 1 36 48H20" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
