// Article describing device grouping
// https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862
export const BREAKPOINTS_BY_DEVICE = {
  phone: [0, 599],
  tabletPortrait: [600, 899],
  tabletLandscape: [900, 1199],
  desktop: [1200, 1799],
  desktopLarge: [1800, 2000000],
};

export const BREAKPOINTS = {
  // Phone
  phone: [
    BREAKPOINTS_BY_DEVICE.phone[0],
    BREAKPOINTS_BY_DEVICE.tabletPortrait[1],
  ],

  // Table Portrait
  tablet: [...BREAKPOINTS_BY_DEVICE.tabletLandscape],

  // Tablet Landscape to Desktop Large
  desktop: [
    BREAKPOINTS_BY_DEVICE.desktop[0],
    BREAKPOINTS_BY_DEVICE.desktopLarge[1],
  ],
};
