import palettes from './palettes';

export const getRandomPalette = () =>
  palettes[Math.floor(Math.random() * palettes.length)];

export const downloadArt = (dataURL, seed) => {
  const link = document.createElement('a');

  link.setAttribute('download', `${seed}.png`);
  link.setAttribute('href', encodeURI(dataURL));
  link.setAttribute('target', '_blank');

  link.click();

  document.removeChild(link);
};

// invert color helpers
const hexToComponents = hex =>
  /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

const componentToHex = c => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = (r, g, b) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

export const invertColor = hex => {
  const rgb = hexToComponents(hex);

  const { r, g, b } = rgb
    ? {
        r: 255 - parseInt(rgb[1], 16),
        g: 255 - parseInt(rgb[2], 16),
        b: 255 - parseInt(rgb[3], 16)
      }
    : {
        r: 1,
        g: 1,
        b: 1
      };

  return rgbToHex(r, g, b);
};
