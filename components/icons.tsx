interface IconProps {
  size?: number;
  color?: string;
}

export function LungFungIcon({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
    >
      <line x1="7" y1="2" x2="7" y2="10" />
      <line x1="10" y1="2" x2="10" y2="10" />
      <line x1="13" y1="2" x2="13" y2="10" />
      <line x1="10" y1="10" x2="10" y2="22" />
      <line x1="18" y1="2" x2="18" y2="14" />
      <line x1="18" y1="14" x2="18" y2="22" />
      <rect
        x="16.4"
        y="10.6"
        width="3.2"
        height="3.2"
        fill={color}
        stroke="none"
        transform="rotate(45 18 12)"
      />
    </svg>
  );
}

export function GoldenIcon({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.7}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="8" cy="8" r="1.4" fill={color} stroke="none" />
      <circle cx="16" cy="8" r="1.4" fill={color} stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill={color} stroke="none" />
      <circle cx="8" cy="16" r="1.4" fill={color} stroke="none" />
      <circle cx="16" cy="16" r="1.4" fill={color} stroke="none" />
    </svg>
  );
}

export function EyeIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ size = 16, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a13.6 13.6 0 0 1-3.1 3.9M6.6 6.6C3.4 8.6 1.5 12 1.5 12S5 19 12 19a10.6 10.6 0 0 0 5.4-1.5" />
      <path d="M9.9 10a3 3 0 0 0 4.1 4.1" />
    </svg>
  );
}

export function BrandIcon({
  brand,
  size,
  color,
}: {
  brand: "lungfung" | "golden";
  size?: number;
  color?: string;
}) {
  return brand === "lungfung" ? (
    <LungFungIcon size={size} color={color} />
  ) : (
    <GoldenIcon size={size} color={color} />
  );
}
