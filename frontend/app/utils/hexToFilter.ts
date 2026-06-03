// Converts a hex color to a CSS filter string that recolors a white SVG/PNG.
// Algorithm: iterative solver by Barrett Sonntag (css-filter-converter).

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (h.length !== 6) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

class Color {
  r: number; g: number; b: number;
  constructor(r: number, g: number, b: number) { this.r = r; this.g = g; this.b = b; }

  set(r: number, g: number, b: number) { this.r = r; this.g = g; this.b = b; }

  hueRotate(angle = 0) {
    const rad = (angle / 180) * Math.PI;
    const sin = Math.sin(rad), cos = Math.cos(rad);
    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.140, 0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value), 0.7152 + 0.2848 * (1 - value), 0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value), 0.769 - 0.769 * (1 - value), 0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value), 0.686 + 0.314 * (1 - value), 0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value), 0.534 - 0.534 * (1 - value), 0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value, 0.715 - 0.715 * value, 0.072 - 0.072 * value,
      0.213 - 0.213 * value, 0.715 + 0.285 * value, 0.072 - 0.072 * value,
      0.213 - 0.213 * value, 0.715 - 0.715 * value, 0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix: number[]) {
    const { r, g, b } = this;
    this.r = Math.max(0, Math.min(255, r * matrix[0] + g * matrix[1] + b * matrix[2]));
    this.g = Math.max(0, Math.min(255, r * matrix[3] + g * matrix[4] + b * matrix[5]));
    this.b = Math.max(0, Math.min(255, r * matrix[6] + g * matrix[7] + b * matrix[8]));
  }

  brightness(value = 1) { this.linear(value); }
  contrast(value = 1)   { this.linear(value, -(0.5 * value) + 0.5); }

  linear(slope = 1, intercept = 0) {
    this.r = Math.max(0, Math.min(255, this.r * slope + intercept * 255));
    this.g = Math.max(0, Math.min(255, this.g * slope + intercept * 255));
    this.b = Math.max(0, Math.min(255, this.b * slope + intercept * 255));
  }

  invert(value = 1) {
    this.r = Math.max(0, Math.min(255, (value + this.r / 255 * (1 - 2 * value)) * 255));
    this.g = Math.max(0, Math.min(255, (value + this.g / 255 * (1 - 2 * value)) * 255));
    this.b = Math.max(0, Math.min(255, (value + this.b / 255 * (1 - 2 * value)) * 255));
  }

  hsl(): [number, number, number] {
    const r = this.r / 255, g = this.g / 255, b = this.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [h * 360, s * 100, l * 100];
  }
}

function loss(filters: number[], target: Color): number {
  const c = new Color(0, 0, 0);
  c.set(255, 255, 255); // start from white
  c.invert(filters[0] / 100);
  c.sepia(filters[1] / 100);
  c.saturate(filters[2] / 100);
  c.hueRotate(filters[3] * 3.6);
  c.brightness(filters[4] / 100);
  c.contrast(filters[5] / 100);
  const [th, ts, tl] = target.hsl();
  const [ch, cs, cl] = c.hsl();
  return (
    Math.abs(c.r - target.r) +
    Math.abs(c.g - target.g) +
    Math.abs(c.b - target.b) +
    Math.abs(ch - th) +
    Math.abs(cs - ts) +
    Math.abs(cl - tl)
  );
}

function spsa(target: Color): number[] {
  const filters = [50, 20, 3750, 50, 100, 100];
  let best = filters.slice(), bestLoss = Infinity;

  for (let i = 0; i < 500; i++) {
    const ck = 1 / (i + 1) ** 0.16667;
    const deltas = filters.map(() => (Math.random() > 0.5 ? 1 : -1));
    const ranges = [100, 100, 7500, 100, 100, 100];
    const high = filters.map((f, j) => Math.min(ranges[j], Math.max(0, f + ck * deltas[j])));
    const low  = filters.map((f, j) => Math.min(ranges[j], Math.max(0, f - ck * deltas[j])));
    const lossHigh = loss(high, target);
    const lossLow  = loss(low,  target);
    const gradient = (lossHigh - lossLow) / (2 * ck);
    const ak = 15 / (i + 1) ** 0.602;
    filters.forEach((_, j) => { filters[j] = Math.min(ranges[j], Math.max(0, filters[j] - ak * gradient * deltas[j])); });
    const l = loss(filters, target);
    if (l < bestLoss) { bestLoss = l; best = filters.slice(); }
  }
  return best;
}

/** Returns a CSS filter string that recolors a white source image to the given hex color. */
export function hexToFilter(hex: string): string | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const target = new Color(...rgb);
  const filters = spsa(target);
  const [invert, sepia, saturate, hueRotate, brightness, contrast] = filters;
  return [
    `invert(${Math.round(invert)}%)`,
    `sepia(${Math.round(sepia)}%)`,
    `saturate(${Math.round(saturate)}%)`,
    `hue-rotate(${Math.round(hueRotate * 3.6)}deg)`,
    `brightness(${Math.round(brightness)}%)`,
    `contrast(${Math.round(contrast)}%)`,
  ].join(' ');
}
