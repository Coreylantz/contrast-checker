const colorVersion = {
  hex: 'hex',
  rgb: 'rgb'
};

const contrastType = {
  normalText: 4.5,
  largeText: 3.1,
  icon: 3.1
}

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const rgb = result ? [
    r = parseInt(result[1], 16),
    g = parseInt(result[2], 16),
    b = parseInt(result[3], 16),
  ] : null;

  return rgb;
};

const transformRGB = (rgb) => {
  return rgb.match(/\d+/g);
};

const luminanace = (r, g, b) => {
  const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (rgb1, rgb2) => {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;

  const lum1 = luminanace(r1, g1, b1);
  const lum2 = luminanace(r2, g2, b2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

const getContrast = (
  foreground, 
  background, 
  colorType = colorVersion.hex, 
  ratioType = contrastType.normalText
  ) => {
  let colorOne = hexToRgb(foreground);
  let colorTwo = hexToRgb(background);

  if(colorType === colorType.rgb) {
    colorOne = transformRGB(foreground);
    colorTwo = transformRGB(background);
  }

  const contrastRatio = contrast(colorOne, colorTwo);

  return contrastRatio >= ratioType;
};

console.log(getContrast('#FFFFFF', '#FFFFFF'));