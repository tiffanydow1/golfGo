// https://github.com/bgrins/TinyColor/blob/master/tinycolor.js
// https://css-tricks.com/converting-color-spaces-in-javascript/
// https://blog.logrocket.com/how-to-manipulate-css-colors-with-javascript-fb547113a1b8

const CACHE = {};

/**
 * Pad a string with a character if it's below a threshold
 * @param {String} value The value to be padded
 * @param {Object} options Set `quantity` to define the length the string should be padded to
 *                         Set `character` to define what character to pad with
 */
function padStart(value = '', { quantity = 1, character = '' }) {
  let handledValue = value.toString();

  if (value.length < quantity) {
    while (handledValue.length < quantity) {
      handledValue = `${character}${handledValue}`;
    }
  }

  return handledValue;
}

/**
 * Modify a colour:
 * - Lightness
 * - Saturation
 * - RGB object to hex
 * - HEX object to RGB object
 * @param {Object|String} colorValue
 */
function Color(colorValue) {
  if (!colorValue) throw new Error('Provide either a hex color (hash optional): rgb: 000, rgba: 0008, rrggbb: 000000, rrggbbaa: 00000080, or an object of { red, green, blue }: { red: 0, green: 0, blue: 0 }, { red, green, blue, alpha }: { red: 0, green: 0, blue: 0, alpha: 0.5 }');

  const initialColor = colorValue;
  const color = colorValue;

  const methods = {
    get hex() {
      return toCSSHEX();
    },
    get rgb() {
      return toRGB();
    },
    get css() {
      return compatible();
    },
    toRGB,
    toHEX,
    toCSSHEX,
    lightness,
    saturation,
    toString() {
      return toCSSHEX();
    },
    toValue() {
      return toCSSHEX();
    },
  };

  /**
   * Determine what kind of colour is provided
   */
  const type = (() => {
    if (typeof colorValue === 'object' && ('red' in colorValue || 'blue' in colorValue || 'green' in colorValue)) return 'rgb';
    if (typeof colorValue === 'string') return 'hex';

    return '';
  })();

  /**
   * the `colors` value is mutated
   * It acts as our local reference to the changes it under goes
   */
  let colors = (() => {
    if (type === 'rgb') {
      const HSL = RGBToHSL(color);

      return { ...color, ...HSL };
    }

    if (type === 'hex') {
      let RGB;
      let HSL;

      // Cache the color so we don't waste cycles on re->RGB->HSL'ing it
      if (CACHE[color]) {
        const cachedColor = CACHE[color];
        RGB = cachedColor.RGB;
        HSL = cachedColor.HSL;
      } else {
        RGB = toRGB(color);
        HSL = RGBToHSL(RGB);

        CACHE[color] = { RGB, HSL };
      }

      return { ...RGB, ...HSL };
    }

    return { red: 0, green: 0, blue: 0 };
  })();

  // Get the alpha value if there is one
  const { alpha } = colors;

  /**
   * Convert a base 256 value to base ff
   * ex: 0-255 to 00-ff
   * @param {Number} value
   */
  function basee256ToFF(value = '') {
    return value.toString(16);
  }

  /**
   * Convert a base ff value to base 256
   * ex: 00-ff to 0-255
   * @param {String} value
   */
  function baseFFTo256(value = '00') {
    return parseInt(value, 16);
  }

  /**
   * Convert RGB to HSL
   * @param {Object} colors
   */
  function RGBToHSL({ red, green, blue } = colors) {
    // Make r, g, and b fractions of 1
    red /= 255;
    green /= 255;
    blue /= 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(red, green, blue);
    const cmax = Math.max(red, green, blue);
    const delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;
    let lightness = 0;

    // Calculate hue
    // No difference
    if (delta === 0) hue = 0;

    // Red is max
    else if (cmax === red) hue = ((green - blue) / delta) % 6;

    // Green is max
    else if (cmax === green) hue = (blue - red) / delta + 2;

    // Blue is max
    else hue = (red - green) / delta + 4;

    hue = Math.round(hue * 60);

    // Make negative hues positive behind 360°
    if (hue < 0) hue += 360;

    // Calculate lightness
    lightness = (cmax + cmin) / 2;

    // Calculate saturation
    saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    // Multiply l and s by 100
    saturation = +(saturation * 100).toFixed(1);
    lightness = +(lightness * 100).toFixed(1);

    return { hue, saturation, lightness };
  }

  /**
   * Convert HSL to RGB
   * @param {OBject} colors
   */
  function HSLToRGB({ hue: h, saturation: s, lightness: l }) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // set these on the global
    colors = {
      ...colors,
      red: r,
      green: g,
      blue: b,
    };

    return { red: r, green: g, blue: b };
  }

  /**
   * Convert a hex color to RGB
   * @param hex A hex value
   * ex: Color('#000000).toRGB() -> { red: 0, green: 0, blue: 0 }
   * ex: Color('#00000000).toRGB() -> { red: 0, green: 0, blue: 0, alpha: 0 }
   */
  function toRGB() {
    if (typeof color === 'object') return color;
    let hex = color.slice(color.startsWith('#') ? 1 : 0);

    // Convert shorthand hex to longhand
    // RGB -> RRGGBB: #024 -> #002244
    // RGBA -> RRGGBBAA: #024a -> #002244aa
    if (hex.length === 3 || hex.length === 4) {
      hex = [...hex].map(x => x + x).join('');
    }

    // Get each segment form the hex code, rr/gg/bb/aa
    let red = padStart(hex.slice(0, 2), { quantity: 2, chracter: 0 });
    let green = padStart(hex.slice(2, 4), { quantity: 2, chracter: 0 });
    let blue = padStart(hex.slice(4, 6), { quantity: 2, chracter: 0 });
    let alpha = hex.length === 8
      ? padStart(hex.slice(6, 8), { quantity: 2, chracter: 0 })
      : ''; // default to opaque

    // Convert each color segment into hex
    red = baseFFTo256(red);
    green = baseFFTo256(green);
    blue = baseFFTo256(blue);
    alpha = Number((baseFFTo256(alpha) / 255).toFixed(2)); // base10

    return {
      red,
      green,
      blue,
      ...(!Number.isNaN(alpha) && typeof alpha === 'number' && { alpha }),
    };
  }

  /**
   * When a alpha channel is used convert the colour object to a CSS compatible CSS value
   * https://developer.mozilla.org/en-US/docs/Web/CSS/color#Browser_compatibility
   */
  function toCSSRGB() {
    const { red, green, blue } = colors;

    const alphaCSS = hasAlpha()
      ? `, ${alpha}`
      : '';

    return `rgba(${red}, ${green}, ${blue}${alphaCSS})`;
  }

  /**
   * Convert an rgb value to hex
   * @param r Red value
   * @param g Green value
   * @param b Blue value
   * @param a Alpha value
   * ex: Color({ red: 0, green: 0, blue: 0 }).toHEX() -> 000000
   * ex: Color({ red: 0, green: 0, blue: 0, alpha: 0.5 }).toHEX() -> 00000080
   */
  function toHEX() {
    let { red, green, blue } = colors;

    // Convert a 256 value to hex: 255 -> FF
    // And pad the value if it's a single digit to make it color compliant
    red = padStart(basee256ToFF(red), { quantity: 2, character: 0 });
    green = padStart(basee256ToFF(green), { quantity: 2, character: 0 });
    blue = padStart(basee256ToFF(blue), { quantity: 2, character: 0 });
    const alphaChannel = hasAlpha()
      ? basee256ToFF(Math.round(alpha * 255))
      : '';

    return `${red}${green}${blue}${alphaChannel}`;
  }

  /**
   * Convert to a CSS-valid hex color
   * ex: Color({ red: 0, green: 0, blue: 0 }) -> '#00000000'
   * ex: Color({ red: 0, green: 0, blue: 0, alpha: 0.5 }) -> '#00000080'
   */
  function toCSSHEX() {
    return `#${toHEX()}`;
  }

  /**
   * Increase or decrease the lightness value of a colour
   * ex: Color('#000000').lightness(100).toHex => '#ffffff'
   * @param {Number} change Positive or negative number
   */
  function lightness(change) {
    const {
      hue,
      saturation,
      lightness,
      alpha,
    } = colors;

    let difference;

    if (change >= 0) {
      difference = Math.min(100, lightness + change);
    } else {
      difference = Math.max(0, lightness + change); // `change` is negative here
    }

    const HSL = { hue, saturation, lightness: difference };
    const RGB = { ...HSLToRGB(HSL), alpha };
    colors = { ...RGB, ...HSL };

    return methods;
  }

  /**
   * Increase or decrease the saturation value of a colour
   * ex: Color('#ff0000').saturation(100).toHex => '#df2020'
   * @param {Number} change Positive or negative number
   */
  function saturation(change) {
    const {
      hue,
      saturation,
      lightness,
      alpha,
    } = colors;

    let difference;

    if (change >= 0) {
      difference = Math.min(100, saturation + change);
    } else {
      difference = Math.max(0, saturation + change); // `change` is negative here
    }

    const HSL = { hue, saturation: difference, lightness };
    const RGB = { ...HSLToRGB(HSL), alpha };
    colors = { ...RGB, ...HSL };

    return methods;
  }

  /**
   * Not all browsers can support an alpha channel on hex #RRGGBBAA
   * This function provides RGBA as a fallback
   */
  function compatible() {
    if (hasAlpha()) return toCSSRGB();

    return toCSSHEX();
  }

  /**
   * Is the alpha channel set?
   * @return {Boolean}
   */
  function hasAlpha() {
    // Test for number and NaN (the only thing that doesn't equal itself?)
    return typeof alpha === 'number' && (alpha === alpha);
  }

  return methods;
}

export default Color;
