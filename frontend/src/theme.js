export default {
  typography: {
    primary: "'Montserrat', arial, sans-serif",
    weight: 300,
    weights: {
      light: 100,
      normal: 300,
      medium: 600,
      bold: 900,
    },
    sizes: {
      xxlarge: '1.5rem', // 24px
      xlarge: '1.375rem', // 22px
      large: '1.25rem', // 20px
      medium: '1.125rem', // 18px
      small: '1rem', // 16px
      xsmall: '0.875rem', // 14px
      xxsmall: '0.75rem', // 12px
    },

    // Heading, titles, sub-titles
    heading: {
      primary: {
        family: "'Montserrat', arial, sans-serif",
        weights: {
          light: 100,
          normal: 400,
          medium: 600,
          bold: 900,
        },
        sizes: {
          xxlarge: '6rem', // 96px,
          xlarge: '3rem', // 48px,
          large: '2.5rem', // 40px
          medium: '2rem', // 32px,
          small: '1.5rem', // 24px,
          xsmall: '1.25rem', // 20px,
          xxsmall: '1rem', // 16px
        },
      },
    },

    // Paragraphs
    paragraph: {
      family: "'Montserrat', arial, sans-serif",
      weight: 300,
      sizes: {
        large: '1.25rem', // 20px
        medium: '1.125rem', // 18px,
        small: '1rem', // 16px,
        xsmall: '0.875rem', // 14px
      },
    },
  },

  forms: {
    input: {
      height: '2.5rem', // 40px
    },
    select: {
      height: '2.5rem', // 40px
      color: '#EEEEEE',
    },
    button: {
      height: {
        small: '2rem', // 32px,
        medium: '2.5rem', // 40px,
        large: '3rem', // 48px
      },
      padding: {
        small: '0 0.75rem',
        medium: '0 1.5rem',
        large: '0 2rem',
      },
      fontSize: {
        large: '1.1rem', // 18px,
        medium: '1rem', // 16px,
        small: '0.875rem', // 14px
      },
      radius: '0',
    },
  },

  layout: {
    // Spacing map
    // https://sid.studio/post/spacing-in-reusable-components/
    sizes: {
      xxsmall: '0.25rem', // 4px,
      xsmall: '0.5rem', // 8px,
      small: '1rem', // 16px,
      medium: '1.25rem', // 18px,
      large: '1.5rem', // 24px,
      xlarge: '2rem', // 32px,
      xxlarge: '4rem', // 64px,
      xxxlarge: '6rem', // 96px
    },
  },

  colors: {
    // blue
    primary: '#7C9FC4',

    // red
    accent: '#F2AEA1',

    // purple
    accent2: '#9E889E',

    // actions
    error: '#B00020',

    // Text
    // Gentler black is better for reading https://twitter.com/AustinTByrd/status/1107985325224325121?s=19
    pearl: '#fefefe', // white
    charcoal: '#333333', // black

    white: '#ffffff',
    black: '#000000',

    // green/beige
    beige: '#f0ece4',
    green100: '#869a7b',
    green500: '#748067',
    rust: '#936b4e',
    purple: '#736780',

    // greys/neutrals
    grey50: '#FAFAFA',
    grey100: '#F5F5F5',
    grey200: '#EEEEEE',
    grey300: '#E0E0E0',
    grey400: '#BDBDBD',
    grey500: '#9E9E9E',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey900: '#212121',
  },
};
