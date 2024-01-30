export const colors = {
  white: "#FFFFFF",
  charcoal80: "#4A4A4A",
  charcoal30: "#E3E3E3",
  yellow70: "#F5B340",
  orange80: "#F5A623",
  red: "#E22F45",
  darkRed: "#7F0F1C",
  green: "#23BA53",
  darkGreen: "#03501B"
};

export const textColors = {
  primary: colors.charcoal80,
  new: colors.darkGreen
};

export const buttonColors = {
  initial: {
    border: colors.white,
    background: colors.white,
    content: colors.orange80
  },
  hover: {
    border: colors.orange80,
    background: colors.white,
    content: colors.orange80
  },
  focus: {
    border: colors.orange80,
    background: colors.white,
    content: colors.orange80
  },
  disabled: {
    border: colors.white,
    background: colors.white,
    content: colors.charcoal30
  }
};

export const backgroundColors = {
  primary: colors.white,
  secondary: colors.charcoal30,
  tertiary: colors.yellow70,
  danger: colors.yellow70,
  new: colors.green,
  gradiant: "0px 4px 16px rgba(0, 0, 0, 0.25)"
};
