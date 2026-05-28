/**
 * RGB to HSL color conversion.
 * rgb: [r, g, b] in 0–255
 * returns [h, s, l] with h in 0–360, s and l in 0–100
 */
export function rgbToHsl(rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  const minimum = Math.min(r, g, b);
  const maximum = Math.max(r, g, b);
  let l = (minimum + maximum) / 2;
  let s = 0;
  let h = 0;

  if (maximum !== minimum) {
    s = l < 0.5
      ? (maximum - minimum) / (maximum + minimum)
      : (maximum - minimum) / (2.0 - maximum - minimum);

    if (maximum === r) h = (g - b) / (maximum - minimum);
    else if (maximum === g) h = 2.0 + (b - r) / (maximum - minimum);
    else if (maximum === b) h = 4.0 + (r - g) / (maximum - minimum);

    h *= 60;
    if (h < 0) h += 360;
  }

  return [h, s * 100, l * 100];
}
