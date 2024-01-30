import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { BREAKPOINTS } from './constants';

const capitalize = (string = '') => typeof string === 'string' && string.length > 0
  ? string[0].toUpperCase() + string.slice(1)
  : '';

// This is an exact duplicate of `CSSMediaQueries` inside of components/layout
// Importing it causes a circular dependency, so... here we are
const CSSMediaQueries = Object
  .entries(BREAKPOINTS)
  .reduce((accumulator, [label, [min, max]]) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${min}px) {
        ${css(...args)}
      }
    `;

    accumulator[`${label}Only`] = (...args) => css`
      @media (min-width: ${min}px) and (max-width: ${max}px) {
        ${css(...args)}
      }
    `;

    return accumulator;
  }, {});

export const displayMixin = ({ display }) => css`
  ${display && `display: ${display};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'display', css: 'display' },
  ],
)}
`;

export const displayMixinPropTypes = {
  /**
   * Any css-valid display
   * @param {String} display
   */
  display: PropTypes.oneOf([
    /* <display-outside> values */
    'block',
    'inline',
    'run-in',

    /* <display-inside> values */
    'flow',
    'flow-root',
    'table',
    'flex',
    'grid',
    'ruby',

    /* <display-outside> plus <display-inside> values */
    'block flow',
    'inline table',
    'flex run-in',

    /* <display-listitem> values */
    'list-item',
    'list-item block',
    'list-item inline',
    'list-item flow',
    'list-item flow-root',
    'list-item block flow',
    'list-item block flow-root',
    'flow list-item block',

    /* <display-internal> values */
    'table-row-group',
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-cell',
    'table-column-group',
    'table-column',
    'table-caption',
    'ruby-base',
    'ruby-text',
    'ruby-base-container',
    'ruby-text-container',

    /* <display-box> values */
    'contents',
    'none',

    /* <display-legacy> values */
    'inline-block',
    'inline-table',
    'inline-flex',
    'inline-grid',

    /* Global values */
    'inherit',
    'initial',
    'unset',
  ]),
};

// Mixin for width/height
export const sizeMixin = ({
  width, height, minHeight, minWidth, maxHeight, maxWidth,
}) => css`
  ${(width === 0 || width) && `width: ${width};`}
  ${(height === 0 || height) && `height: ${height};`}
  ${(minWidth === 0 || minWidth) && `min-width: ${minWidth};`}
  ${(maxWidth === 0 || maxWidth) && `max-width: ${maxWidth};`}
  ${(minHeight === 0 || minHeight) && `min-height: ${minHeight};`}
  ${(maxHeight === 0 || maxHeight) && `max-height: ${maxHeight};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'width', css: 'width' },
    { prop: 'height', css: 'height' },
    { prop: 'minWidth', css: 'min-width' },
    { prop: 'maxWidth', css: 'max-width' },
    { prop: 'minHeight', css: 'min-height' },
    { prop: 'maxHeight', css: 'max-height' },
  ],
)}
`;

export const fontMixin = ({
  color,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  textDecoration,
  textShadow,
  textTransform,
  textOverflow,
  fontStyle,
  whiteSpace,
}) => css`
  ${color && `color: ${color};`}
  ${fontFamily && `font-family: ${fontFamily};`}
  ${fontSize && `font-size: ${fontSize};`}
  ${fontWeight && `font-weight: ${fontWeight};`}
  ${fontStyle && `font-style: ${fontStyle};`}
  ${letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${lineHeight && `line-height: ${lineHeight};`}
  ${textAlign && `text-align: ${textAlign};`}
  ${textDecoration && `text-decoration: ${textDecoration};`}
  ${textShadow && `text-shadow: ${textShadow};`}
  ${textTransform && `text-transform: ${textTransform};`}
  ${textOverflow && `text-overflow: ${textOverflow};`}
  ${whiteSpace && `white-space: ${whiteSpace};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'color', css: 'color' },
    { prop: 'fontFamily', css: 'font-family' },
    { prop: 'fontSize', css: 'font-size' },
    { prop: 'fontWeight', css: 'font-weight' },
    { prop: 'letterSpacing', css: 'letter-spacing' },
    { prop: 'lineHeight', css: 'line-height' },
    { prop: 'textAlign', css: 'text-align' },
    { prop: 'textDecoration', css: 'text-decoration' },
    { prop: 'textShadow', css: 'text-shadow' },
    { prop: 'textTransform', css: 'text-transform' },
    { prop: 'textOverflow', css: 'text-overflow' },
    { prop: 'whiteSpace', css: 'white-space' },
  ],
)}
`;

export const fontThemeMixin = (
  {
    theme,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecoration,
    textShadow,
    textTransform,
    textOverflow,
    fontStyle,
    wordBreak,
    whiteSpace,
    overflowWrap,
    fontVariant,
    fontVariantLigatures,
    fontVariantNumeric,
    fontVariationSettings,
  },
  { fontSizes: customFontSizes } = {}
) => {
  const fontSizes = customFontSizes || theme.typography.sizes;

  return (css`
  ${color && `color: ${theme.colors[color] || color};`}
  ${fontFamily && `font-family: ${theme.typography[fontFamily] || fontFamily};`}
  ${fontSize && `font-size: ${fontSizes[fontSize] || fontSize};`}
  ${fontWeight && `font-weight: ${theme.typography.weights[fontWeight] || fontWeight};`}
  ${fontStyle && `font-style: ${fontStyle};`}
  ${letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${lineHeight && `line-height: ${lineHeight};`}
  ${textAlign && `text-align: ${textAlign};`}
  ${textDecoration && `text-decoration: ${textDecoration};`}
  ${textShadow && `text-shadow: ${textShadow};`}
  ${textTransform && `text-transform: ${textTransform};`}
  ${textOverflow && `text-overflow: ${textOverflow};`}
  ${wordBreak && `word-break: ${wordBreak};`}
  ${whiteSpace && `white-space: ${whiteSpace};`}
  ${overflowWrap && `overflow-wrap: ${overflowWrap};`}
  ${fontVariant && `font-variant: ${fontVariant};`}
  ${fontVariantLigatures && `font-variant-ligatures: ${fontVariantLigatures};`}
  ${fontVariantNumeric && `font-variant-numeric: ${fontVariantNumeric};`}
  ${fontVariationSettings && `font-variation-settings: ${fontVariationSettings};`}

  ${props => generateBreakpoints(
    props,
    [
      { prop: 'color', css: 'color', theme: theme.colors },
      { prop: 'fontFamily', css: 'font-family', theme: theme.typography },
      { prop: 'fontSize', css: 'font-size', theme: fontSizes },
      { prop: 'fontWeight', css: 'font-weight', theme: theme.typography.weights },
      { prop: 'letterSpacing', css: 'letter-spacing' },
      { prop: 'lineHeight', css: 'line-height' },
      { prop: 'textAlign', css: 'text-align' },
      { prop: 'textDecoration', css: 'text-decoration' },
      { prop: 'textShadow', css: 'text-shadow' },
      { prop: 'textTransform', css: 'text-transform' },
      { prop: 'textOverflow', css: 'text-overflow' },
      { prop: 'wordBreak', css: 'word-break' },
      { prop: 'whiteSpace', css: 'white-space' },
      { prop: 'overflowWrap', css: 'overflow-wrap' },
      { prop: 'fontVariant', css: 'font-variant' },
      { prop: 'fontVariantLigatures', css: 'font-variant-ligatures' },
      { prop: 'fontVariantNumeric', css: 'font-variant-numeric' },
      { prop: 'fontVariationSettings', css: 'font-variation-settings' },
    ],
  )}
`);
};

export const fontMixinPropTypes = {
  /**
   * Any css-valid color
   * @param {String} color
   */
  color: PropTypes.string,

  /**
   * A font weight, ex: 100, 'bold'
   * @param {String|Number} fontWeight
   */
  fontWeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * A font font family, ex: 'Helvetica, sans-serif'
   * @param {String} fontFamily
   */
  fontFamily: PropTypes.string,

  /**
   * A font size, ex: '1rem'
   * @param {String} fontSize
   */
  fontSize: PropTypes.string,

  /**
   * Text alignment
   * @param {String} textAlign
   */
  textAlign: PropTypes.oneOf([
    'start',
    'end',
    'left',
    'right',
    'center',
    'justify',
    'justify-all',
    'match-parent',
  ]),

  /**
   * Text decoration
   * @param {String} textDecoration
   */
  textDecoration: PropTypes.string,

  /**
   * Line height
   * @param {String} lineHeight
   */
  lineHeight: PropTypes.string,

  /**
   * Text shadow
   * @param {String} textShadow
   */
  textShadow: PropTypes.string,

  /**
   * Text transform
   * @param {String} textTransform
   */
  textTransform: PropTypes.string,

  /**
   * Text overflow
   * @param {String} textOverflow
   */
  textOverflow: PropTypes.string,

  /**
   * Letter spacing
   * @param {String} letterSpacing
   */
  letterSpacing: PropTypes.string,

  /**
   * Word break
   * @param {String} wordBreak
   */
  wordBreak: PropTypes.oneOf([
    /* Keyword values */
    'normal',
    'break-all',
    'keep-all',
    'break-word', /* deprecated */

    /* Global values */
    'inherit',
    'initial',
    'unset',
  ]),

  /**
   * White space
   * @param {String} whiteSpace
   */
  whiteSpace: PropTypes.oneOf([
    'normal',
    'nowrap',
    'pre',
    'pre-wrap',
    'pre-line',
    'break-spaces',
  ]),

  /**
   * Overflow wrap
   * @param {String} overflowWrap
   */
  overflowWrap: PropTypes.oneOf([
    /* Keyword values */
    'normal',
    'break-word',
    'anywhere',

    /* Global values */
    'inherit',
    'initial',
    'unset',
  ]),

  /**
   * Shorthand for setting font variables
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
   * @param {String} fontVariant
   */
  fontVariant: PropTypes.string,

  /**
   * CSS property controls which ligatures and contextual forms are used in textual content of the elements it applies to.
   * This leads to more harmonized forms in the resulting text.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures
   * @param {String} fontVariantLigatures
   */
  fontVariantLigatures: PropTypes.oneOf([
    /* Keyword values */
    'normal',
    'none',
    'common-ligatures', /* <common-lig-values> */
    'no-common-ligatures', /* <common-lig-values> */
    'discretionary-ligatures', /* <discretionary-lig-values> */
    'no-discretionary-ligatures', /* <discretionary-lig-values> */
    'historical-ligatures', /* <historical-lig-values> */
    'no-historical-ligatures', /* <historical-lig-values> */
    'contextual', /* <contextual-alt-values> */
    'no-contextual', /* <contextual-alt-values> */

    /* Global values */
    'inherit',
    'initial',
    'unset',
  ]),

  /**
   * CSS property controls the usage of alternate glyphs for numbers, fractions, and ordinal markers.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
   * @param {String} fontVariantNumeric
   */
  fontVariantNumeric: PropTypes.oneOf([
    'normal',
    'ordinal',
    'slashed-zero',
    'lining-nums', /* <numeric-figure-values> */
    'oldstyle-nums', /* <numeric-figure-values> */
    'proportional-nums', /* <numeric-spacing-values> */
    'tabular-nums', /* <numeric-spacing-values> */
    'diagonal-fractions', /* <numeric-fraction-values> */
    'stacked-fractions', /* <numeric-fraction-values> */
    'oldstyle-nums stacked-fractions',

    /* Global values */
    'inherit',
    'initial',
    'unset',
  ]),

  /**
   * CSS property provides low-level control over variable font characteristics,
   * by specifying the four letter axis names of the characteristics you want to vary, along with their values.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
   * @param {String} fontVariationSettings
   */
  fontVariationSettings: PropTypes.string,
};

export const opacityMixin = ({
  opacity,
}) => css`
  ${typeof opacity === 'number' && `opacity: ${opacity};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'opacity', css: 'opacity' },
  ],
)}
`;

export const opacityMixinPropTypes = {
  /**
   * An opacity value
   * @param {Number} padding
   */
  opacity: PropTypes.number,
};

export const boxShadowMixin = ({
  boxShadow,
}) => css`
  ${boxShadow && `box-shadow: ${boxShadow};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'boxShadow', css: 'box-shadow' },
  ],
)}
`;

export const boxShadowMixinPropTypes = {
  /**
   * The box-shadow CSS property adds shadow effects around an element's frame.
   * You can set multiple effects separated by commas.
   * A box shadow is described by X and Y offsets relative to the element, blur and spread radius, and color.
   * @param {string} boxShadow
   */
  boxShadow: PropTypes.string,
};

export const paddingMixin = ({
  padding, paddingTop, paddingRight, paddingBottom, paddingLeft,
}) => css`
  ${(padding === 0 || padding) && `padding: ${padding};`}
  ${(paddingTop === 0 || paddingTop) && `padding-top: ${paddingTop};`}
  ${(paddingRight === 0 || paddingRight) && `padding-right: ${paddingRight};`}
  ${(paddingBottom === 0 || paddingBottom) && `padding-bottom: ${paddingBottom};`}
  ${(paddingLeft === 0 || paddingLeft) && `padding-left: ${paddingLeft};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'padding', css: 'padding' },
    { prop: 'paddingTop', css: 'padding-top' },
    { prop: 'paddingRight', css: 'padding-right' },
    { prop: 'paddingBottom', css: 'padding-bottom' },
    { prop: 'paddingLeft', css: 'padding-left' },
  ],
)}
`;

export const paddingThemeMixin = ({
  theme, padding, paddingTop, paddingRight, paddingBottom, paddingLeft,
}) => {
  // Get all the part of the padding if they're separated by a space
  const paddingParts = typeof padding === 'string' && padding.split(' ');

  // Iterate over the padding values if there are multiple parts
  const paddings = (Array.isArray(paddingParts) && paddingParts.length > 0)
    // Test each value in the shorthand against the size map
    ? padding
      .split(' ')
      .map(direction => theme.layout.sizes[direction] || direction)
      .join(' ')

    // Just a flag value for all 4 dimensions
    : padding;

  return css`
    ${(paddings === 0 || paddings) && `padding: ${paddings};`}
    ${(paddingTop === 0 || paddingTop) && `padding-top: ${theme.layout.sizes[paddingTop] || paddingTop};`}
    ${(paddingRight === 0 || paddingRight) && `padding-right: ${theme.layout.sizes[paddingRight] || paddingRight};`}
    ${(paddingBottom === 0 || paddingBottom) && `padding-bottom: ${theme.layout.sizes[paddingBottom] || paddingBottom};`}
    ${(paddingLeft === 0 || paddingLeft) && `padding-left: ${theme.layout.sizes[paddingLeft] || paddingLeft};`}

    ${props => generateBreakpoints(
    props,
    [
      { prop: 'padding', css: 'padding' },
      { prop: 'paddingTop', css: 'padding-top', theme: theme.layout.sizes },
      { prop: 'paddingRight', css: 'padding-right', theme: theme.layout.sizes },
      { prop: 'paddingBottom', css: 'padding-bottom', theme: theme.layout.sizes },
      { prop: 'paddingLeft', css: 'padding-left', theme: theme.layout.sizes },
    ],
    { theme: theme.layout.sizes }
  )}
  `;
};

export const paddingMixinPropTypes = {
  /**
   * A padding value
   * @param {String|Number} padding
   */
  padding: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A padding value
   * @param {String|Number} paddingTop
   */
  paddingTop: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A padding value
   * @param {String|Number} paddingRight
   */
  paddingRight: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A padding value
   * @param {String|Number} paddingBottom
   */
  paddingBottom: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A padding value
   * @param {String|Number} paddingLeft
   */
  paddingLeft: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),
};

export const marginMixin = ({
  margin, marginTop, marginRight, marginBottom, marginLeft,
}) => css`
  ${(margin === 0 || margin) && `margin: ${margin};`}
  ${(marginTop === 0 || marginTop) && `margin-top: ${marginTop};`}
  ${(marginRight === 0 || marginRight) && `margin-right: ${marginRight};`}
  ${(marginBottom === 0 || marginBottom) && `margin-bottom: ${marginBottom};`}
  ${(marginLeft === 0 || marginLeft) && `margin-left: ${marginLeft};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'margin', css: 'margin' },
    { prop: 'marginTop', css: 'margin-top' },
    { prop: 'marginRight', css: 'margin-right' },
    { prop: 'marginBottom', css: 'margin-bottom' },
    { prop: 'marginLeft', css: 'margin-left' },
  ],
)}
`;

export const marginThemeMixin = ({
  theme, margin, marginTop, marginRight, marginBottom, marginLeft,
}) => {
  // Get all the part of the margin if they're separated by a space
  const marginParts = typeof margin === 'string' && margin.split(' ');

  // Iterate over the margin values if there are multiple parts
  const margins = (Array.isArray(marginParts) && marginParts.length > 0)
    // Test each value in the shorthand against the size map
    ? margin
      .split(' ')
      .map(direction => theme.layout.sizes[direction] || direction)
      .join(' ')

    // Just a flag value for all 4 dimensions
    : margin;

  return css`
    ${(margins === 0 || margins) && `margin: ${margins};`}
    ${(marginTop === 0 || marginTop) && `margin-top: ${theme.layout.sizes[marginTop] || marginTop};`}
    ${(marginRight === 0 || marginRight) && `margin-right: ${theme.layout.sizes[marginRight] || marginRight};`}
    ${(marginBottom === 0 || marginBottom) && `margin-bottom: ${theme.layout.sizes[marginBottom] || marginBottom};`}
    ${(marginLeft === 0 || marginLeft) && `margin-left: ${theme.layout.sizes[marginLeft] || marginLeft};`}

    ${props => generateBreakpoints(
    props,
    [
      { prop: 'margin', css: 'margin', theme: theme.layout.sizes },
      { prop: 'marginTop', css: 'margin-top', theme: theme.layout.sizes },
      { prop: 'marginRight', css: 'margin-right', theme: theme.layout.sizes },
      { prop: 'marginBottom', css: 'margin-bottom', theme: theme.layout.sizes },
      { prop: 'marginLeft', css: 'margin-left', theme: theme.layout.sizes },
    ],
    { theme: theme.layout.sizes }
  )}
  `;
};

export const marginMixinPropTypes = {
  /**
   * A margin value
   * @param {String|Number} margin
   */
  margin: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A margin value
   * @param {String|Number} marginTop
   */
  marginTop: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A margin value
   * @param {String|Number} marginRight
   */
  marginRight: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A margin value
   * @param {String|Number} marginBottom
   */
  marginBottom: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),

  /**
   * A margin value
   * @param {String|Number} marginLeft
   */
  marginLeft: PropTypes.oneOfType([
    // A value with a unit
    PropTypes.string,

    // Only 0 is a valid number
    PropTypes.oneOf([0]),
  ]),
};

export const overflowMixin = ({ overflow, overflowX, overflowY }) => css`
  ${overflow && `overflow: ${overflow};`}
  ${overflowX && `overflow-x: ${overflowX};`}
  ${overflowY && `overflow-y: ${overflowY};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'overflow', css: 'overflow' },
    { prop: 'overflowX', css: 'overflow-x' },
    { prop: 'overflowY', css: 'overflow-y' },
  ],
)}
`;

export const overflowMixinPropTypes = {
  /**
   * Overflow properties
   * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
   */
  overflow: PropTypes.oneOf([
    // Keyword values
    'visible',
    'hidden',
    'scroll',
    'auto',
    'hidden visible',

    // Global values
    'inherit',
    'initial',
    'unset',
  ]),

  overflowX: PropTypes.oneOf([
    // Keyword values
    'visible',
    'hidden',
    'scroll',
    'auto',
    'hidden visible',

    // Global values
    'inherit',
    'initial',
    'unset',
  ]),

  overflowY: PropTypes.oneOf([
    // Keyword values
    'visible',
    'hidden',
    'scroll',
    'auto',
    'hidden visible',

    // Global values
    'inherit',
    'initial',
    'unset',
  ]),
};

export const pointerEventsMixin = ({ pointerEvents }) => css`
  ${pointerEvents && `pointer-events: ${pointerEvents};`}
`;

export const pointerEventsMixinPropTypes = {
  /**
   * Overflow properties
   * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
   */
  pointerEvents: PropTypes.oneOf([
    // Keyword values
    'auto',
    'none',

    // Global values
    'inherit',
    'initial',
    'unset',
  ]),
};

export const flexMixin = ({
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignSelf,
  alignContent,
  flexShrink,
  flexGrow,
  flexBasis,
  flex,
  order,
}) => css`
  ${flexDirection && `flex-direction: ${flexDirection};`}
  ${flexWrap && `flex-wrap: ${flexWrap};`}
  ${(flexBasis === 0 || flexBasis) && `flex-basis: ${flexBasis};`}
  ${justifyContent && `justify-content: ${justifyContent};`}
  ${alignItems && `align-items: ${alignItems};`}
  ${alignSelf && `align-self: ${alignSelf};`}
  ${alignContent && `align-content: ${alignContent};`}
  ${(flexShrink === 0 || flexShrink) && `flex-shrink: ${flexShrink};`}
  ${(flexGrow === 0 || flexGrow) && `flex-grow: ${flexGrow};`}
  ${(flex === 0 || flex) && `flex: ${flex};`}
  ${(typeof order === 'number' || order) && `order: ${order};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'display', css: 'display' },
    { prop: 'flexDirection', css: 'flex-direction' },
    { prop: 'flexWrap', css: 'flex-wrap' },
    { prop: 'justifyContent', css: 'justify-content' },
    { prop: 'alignItems', css: 'align-items' },
    { prop: 'alignSelf', css: 'align-self' },
    { prop: 'alignContent', css: 'align-content' },
    { prop: 'flexShrink', css: 'flex-shrink' },
    { prop: 'flexBasis', css: 'flex-basis' },
    { prop: 'flexGrow', css: 'flex-grow' },
    { prop: 'flex', css: 'flex' },
    { prop: 'order', css: 'order' },
  ],
)}
`;

export const flexMixinPropTypes = {
  /**
   * The direction of the children in the structure
   * @param {String} flexDirection the axis or order
   */
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),

  /**
   * How should the content wrap?
   * @param {String} flexWrap
   */
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),

  /**
   * How should the content be justified?
   * @param {String} justifyContent
   */
  justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),

  /**
   * How should the items be aligned?
   * @param {String} alignItems
   */
  alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),

  /**
   * How should it align itself
   * @param {String} alignSelf
   */
  alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),

  /**
   * How should the content be aligned?
   * @param {String} alignContent
   */
  alignContent: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),

  /**
   * In a child of a flexbox context, how proportionally small should the element get?
   * @param {Number} flexShrink
   */
  flexShrink: PropTypes.number,

  /**
   * In a child of a flexbox context, how proportionally large should the element get?
   * @param {Number} flexGrow
   */
  flexGrow: PropTypes.number,

  /**
   * The flex CSS property sets how a flex item will grow or shrink to fit the space available in its flex container
   * It is a shorthand for flex-grow, flex-shrink, and flex-basis.
   * @param {Number|String} flex
   */
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The order CSS property sets the order to lay out an item in a flex or grid container.
   * Items in a container are sorted by ascending order value and then by their source code order.
   * @param {Number|String} order
   */
  order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export const gridMixin = ({
  gridTemplateColumns,
  gridColumnGap,
  gridTemplateRows,
  gridRowGap,
  gridColumn,
  gridColumnStart,
  gridColumnEnd,
  gridRow,
  gridRowStart,
  gridRowEnd,
}) => css`
  ${gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns};`}
  ${gridColumnGap && `grid-column-gap: ${gridColumnGap};`}
  ${gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}
  ${gridRowGap && `grid-row-gap: ${gridRowGap};`}
  ${gridColumn && `grid-column: ${gridColumn};`}
  ${gridColumnStart && `grid-column-start: ${gridColumnStart};`}
  ${gridColumnEnd && `grid-column-end: ${gridColumnEnd};`}
  ${gridRow && `grid-row: ${gridRow};`}
  ${gridRowStart && `grid-row-start: ${gridRowStart};`}
  ${gridRowEnd && `grid-row-end: ${gridRowEnd};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'display', css: 'display' },
    { prop: 'gridTemplateColumns', css: 'grid-template-columns' },
    { prop: 'gridColumnGap', css: 'grid-column-gap' },
    { prop: 'gridTemplateRows', css: 'grid-template-rows' },
    { prop: 'gridRowGap', css: 'grid-row-gap' },
    { prop: 'gridColumn', css: 'grid-column' },
    { prop: 'gridColumnStart', css: 'grid-column-start' },
    { prop: 'gridColumnEnd', css: 'grid-column-end' },
    { prop: 'gridRow', css: 'grid-row' },
    { prop: 'gridRowStart', css: 'grid-row-start' },
    { prop: 'gridRowEnd', css: 'grid-row-end' },
  ],
)}
`;

export const gridMixinPropTypes = {
  /**
   * Define the line names and track sizing functions of the grid columns
   * @param {String} gridTemplateColumns
   */
  gridTemplateColumns: PropTypes.string,

  /**
   * The column-gap CSS property sets the size of the gap (gutter) between an element's columns
   * @param {String} gridColumnGap
   */
  gridColumnGap: PropTypes.string,

  /**
   * Define the line names and track sizing functions of the grid rows
   * @param {String} gridTemplateRows
   */
  gridTemplateRows: PropTypes.string,

  /**
   * The row-gap CSS property sets the size of the gap (gutter) between an element's grid rows
   * @param {String} gridRowGap
   */
  gridRowGap: PropTypes.string,

  /**
   * The grid-column CSS shorthand property specifies a grid item's size and location within a grid column by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area
   * @param {String} gridColumn
   */
  gridColumn: PropTypes.string,

  /**
   * The grid-column-start CSS property specifies a grid item’s start position within the grid column by contributing a line,
   * a span, or nothing (automatic) to its grid placement.
   * This start position defines the block-start edge of the grid area
   * @param {String} gridColumnStart
   */
  gridColumnStart: PropTypes.string,

  /**
   * The grid-column-end CSS property specifies a grid item’s end position within the grid column by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the block-end edge of its grid area
   * @param {String} gridColumnEnd
   */
  gridColumnEnd: PropTypes.string,

  /**
   * The grid-row CSS shorthand property specifies a grid item’s size and location within the grid row by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start and inline-end edge of its grid area.
   * @param {String} gridRow
   */
  gridRow: PropTypes.string,

  /**
   * The grid-row-start CSS property specifies a grid item’s start position within the grid row by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the inline-start edge of its grid area.
   * @param {String} gridRowStart
   */
  gridRowStart: PropTypes.string,

  /**
   * The grid-row-end CSS property specifies a grid item’s end position within the grid row by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the inline-end edge of its grid area.
   * @param {String} gridRowEnd
   */
  gridRowEnd: PropTypes.string,
};

export const positionMixin = ({
  position, top, right, bottom, left, zIndex,
}) => css`
  ${position && `position: ${position};`}
  ${(typeof top === 'number' || typeof top === 'string') && `top: ${top};`}
  ${(typeof right === 'number' || typeof right === 'string') && `right: ${right};`}
  ${(typeof bottom === 'number' || typeof bottom === 'string') && `bottom: ${bottom};`}
  ${(typeof left === 'number' || typeof left === 'string') && `left: ${left};`}
  ${(typeof zIndex === 'number' || typeof zIndex === 'string') && `z-index: ${zIndex};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'position', css: 'position' },
    { prop: 'top', css: 'top' },
    { prop: 'right', css: 'right' },
    { prop: 'bottom', css: 'bottom' },
    { prop: 'left', css: 'left' },
    { prop: 'zIndex', css: 'z-index' },
  ],
)}
`;

export const positionThemeMixin = ({
  theme, position, top, right, bottom, left, zIndex,
}) => css`
  ${position && `position: ${position};`}
  ${(top || top === 0) && `top: ${theme.layout.sizes[top] || top};`}
  ${(right || right === 0) && `right: ${theme.layout.sizes[right] || right};`}
  ${(bottom || bottom === 0) && `bottom: ${theme.layout.sizes[bottom] || bottom};`}
  ${(left || left === 0) && `left: ${theme.layout.sizes[left] || left};`}
  ${(zIndex || zIndex === 0) && `z-index: ${zIndex};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'position', css: 'position' },
    { prop: 'top', css: 'top', theme: theme.layout.sizes },
    { prop: 'right', css: 'right', theme: theme.layout.sizes },
    { prop: 'bottom', css: 'bottom', theme: theme.layout.sizes },
    { prop: 'left', css: 'left', theme: theme.layout.sizes },
    { prop: 'zIndex', css: 'z-index' },
  ],
)}
`;

export const positionMixinPropTypes = {
  /**
   * The position CSS property specifies how an element is positioned in a document
   * https://developer.mozilla.org/en-US/docs/Web/CSS/position
   * @param {String} position
   */
  position: PropTypes.oneOf(['static', 'relative', 'absolute', 'fixed', 'sticky']),

  /**
   * The top position of an element
   * @param {String} top
   */
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * The right position of an element
   * @param {String} right
   */
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * The bottom position of an element
   * @param {String} bottom
   */
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * The left position of an element
   * @param {String} left
   */
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * The z-index of the element
   * @param {String} zIndex
   */
  zIndex: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
  ]),
};

export const transitionMixin = ({
  transition, transitionDelay, transitionDuration, transitionProperty, transitionTimingFunction,
}) => css`
  ${transition && `transition: ${transition};`}
  ${transitionDelay && `transition-delay: ${transitionDelay};`}
  ${transitionDuration && `transition-duration: ${transitionDuration};`}
  ${transitionProperty && `transition-property: ${transitionProperty};`}
  ${transitionTimingFunction && `transition-timing-function: ${transitionTimingFunction};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'transition', css: 'transition' },
    { prop: 'transitionDelay', css: 'transition-delay' },
    { prop: 'transitionDuration', css: 'transition-duration' },
    { prop: 'transitionProperty', css: 'transition-property' },
    { prop: 'transitionTimingFunction', css: 'transition-timing-function' },
  ],
)}
`;

export const transitionMixinPropTypes = {
  /**
   * The transition CSS property is a shorthand property for:
   * transition-property, transition-duration, transition-timing-function, and transition-delay.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transition
   * @param {String} transition
   */
  transition: PropTypes.string,

  /**
   * The transition-delay CSS property specifies the duration to wait before starting a property's transition effect when its value changes
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay
   * @param {String} transitionDelay
   */
  transitionDelay: PropTypes.string,

  /**
   * The transition-duration CSS property sets the length of time a transition animation should take to complete
   * By default, the value is 0s, meaning that no animation will occur.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
   * @param {String} transitionDuration
   */
  transitionDuration: PropTypes.string,

  /**
   * The transition-property CSS property sets the CSS properties to which a transition effect should be applied
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
   * @param {String} transitionProperty
   */
  transitionProperty: PropTypes.string,

  /**
   * The transition-timing-function CSS property sets how intermediate values are calculated for CSS properties being affected by a transition effect
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
   * @param {String} transitionTimingFunction
   */
  transitionTimingFunction: PropTypes.string,
};

export const backgroundMixin = ({
  background,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  backgroundRepeat,
  backgroundOrigin,
  backgroundClip,
  backgroundAttachment,
  backgroundColor,
  backdropFilter,
}) => css`
  ${background && `background: ${background};`}
  ${backgroundImage && `background-image: ${backgroundImage};`}
  ${backgroundPosition && `background-position: ${backgroundPosition};`}
  ${backgroundSize && `background-size: ${backgroundSize};`}
  ${backgroundRepeat && `background-repeat: ${backgroundRepeat};`}
  ${backgroundOrigin && `background-origin: ${backgroundOrigin};`}
  ${backgroundClip && `background-clip: ${backgroundClip};`}
  ${backgroundAttachment && `background-attachment: ${backgroundAttachment};`}
  ${backgroundColor && `background-color: ${backgroundColor};`}
  ${backdropFilter && `backdrop-filter: ${backdropFilter};`}
`;

export const backgroundThemeMixin = ({
  theme,
  background,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  backgroundRepeat,
  backgroundOrigin,
  backgroundClip,
  backgroundAttachment,
  backgroundColor,
  backdropFilter,
}) => css`
  ${background && `background: ${background};`}
  ${backgroundImage && `background-image: ${backgroundImage};`}
  ${backgroundPosition && `background-position: ${backgroundPosition};`}
  ${backgroundSize && `background-size: ${backgroundSize};`}
  ${backgroundRepeat && `background-repeat: ${backgroundRepeat};`}
  ${backgroundOrigin && `background-origin: ${backgroundOrigin};`}
  ${backgroundClip && `background-clip: ${backgroundClip};`}
  ${backgroundAttachment && `background-attachment: ${backgroundAttachment};`}
  ${backgroundColor && `background-color: ${theme.colors[backgroundColor] || backgroundColor};`}
  ${backdropFilter && `backdrop-filter: ${backdropFilter};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'background', css: 'background' },
    { prop: 'backgroundImage', css: 'background-image' },
    { prop: 'backgroundPosition', css: 'background-position' },
    { prop: 'backgroundSize', css: 'background-size' },
    { prop: 'backgroundRepeat', css: 'background-repeat' },
    { prop: 'backgroundOrigin', css: 'background-origin' },
    { prop: 'backgroundClip', css: 'background-clip' },
    { prop: 'backgroundAttachment', css: 'background-attachment' },
    { prop: 'backgroundColor', css: 'background-color' },
    { prop: 'backdropFilter', css: 'backdrop-filter' },
  ],
)}
`;

export const backgroundMixinPropTypes = {
  // The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background
  background: PropTypes.string,

  // The background-image CSS property sets one or more background images on an element.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
  backgroundImage: PropTypes.string,

  // The background-position CSS property sets the initial position for each background image.
  // The position is relative to the position layer set by background-origin.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
  backgroundPosition: PropTypes.string,

  // The background-size CSS property sets the size of the element's background image.
  // The image can be left to its natural size, stretched, or constrained to fit the available space.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
  backgroundSize: PropTypes.string,

  // The background-repeat CSS property sets how background images are repeated.
  // A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
  backgroundRepeat: PropTypes.string,

  // The background-origin CSS property sets the background positioning area.
  // In other words, it sets the origin position of an image set with the background-image property.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
  backgroundOrigin: PropTypes.string,

  // The background-clip CSS property sets whether an element's background <color>
  // or <image> extends underneath its border.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
  backgroundClip: PropTypes.string,

  // The background-attachment CSS property sets whether a background image's position is
  // fixed within the viewport, or scrolls with its containing block.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
  backgroundAttachment: PropTypes.oneOf([
    // Keyword values
    'scroll',
    'fixed',
    'local',

    // Global values
    'inherit',
    'initial',
    'unset',
  ]),

  // The background-color CSS property sets the background color of an element.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
  backgroundColor: PropTypes.string,

  // The backdrop-filter CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element.
  // Because it applies to everything behind the element,
  // to see the effect you must make the element or its background at least partially transparent.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
  backdropFilter: PropTypes.string,
};

export const borderMixin = ({
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
}) => css`
  ${border && `border: ${border};`}
  ${borderTop && `border-top: ${borderTop};`}
  ${borderRight && `border-right: ${borderRight};`}
  ${borderBottom && `border-bottom: ${borderBottom};`}
  ${borderLeft && `border-left: ${borderLeft};`}
  ${borderRadius && `border-radius: ${borderRadius};`}
  ${borderTopLeftRadius && `border-top-left-radius: ${borderTopLeftRadius};`}
  ${borderTopRightRadius && `border-top-right-radius: ${borderTopRightRadius};`}
  ${borderBottomLeftRadius && `border-bottom-left-radius: ${borderBottomLeftRadius};`}
  ${borderBottomRightRadius && `border-bottom-right-radius: ${borderBottomRightRadius};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'border', css: 'border' },
    { prop: 'borderTop', css: 'border-top' },
    { prop: 'borderRight', css: 'border-right' },
    { prop: 'borderBottom', css: 'border-bottom' },
    { prop: 'borderLeft', css: 'border-left' },
    { prop: 'borderRadius', css: 'border-radius' },
    { prop: 'borderTopLeftRadius', css: 'border-top-left-radius' },
    { prop: 'borderTopRightRadius', css: 'border-top-right-radius' },
    { prop: 'borderBottomLeftRadius', css: 'border-bottom-left-radius' },
    { prop: 'borderBottomRightRadius', css: 'border-bottom-right-radius' },
  ],
)}
`;

export const borderMixinPropTypes = {
  /**
   * Border
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border
   * @param {String} border
   */
  border: PropTypes.string,

  /**
   * Border top
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border
   * @param {String} borderTop
   */
  borderTop: PropTypes.string,

  /**
   * Border right
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border
   * @param {String} borderRight
   */
  borderRight: PropTypes.string,

  /**
   * Border bottom
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border
   * @param {String} borderBottom
   */
  borderBottom: PropTypes.string,

  /**
   * Border left
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border
   * @param {String} borderLeft
   */
  borderLeft: PropTypes.string,

  /**
   * Border radius
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
   * @param {String} borderRadius
   */
  borderRadius: PropTypes.string,

  /**
   * Border top left radius
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius
   * @param {String} borderTopLeftRadius
   */
  borderTopLeftRadius: PropTypes.string,

  /**
   * Border top right radius
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius
   * @param {String} borderTopRightRadius
   */

  borderTopRightRadius: PropTypes.string,
  /**
   * Border bottom left radius
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius
   * @param {String} borderBottomLeftRadius
   */
  borderBottomLeftRadius: PropTypes.string,

  /**
   * Border bottom right radius
   * https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius
   * @param {String} borderBottomRightRadius
   */
  borderBottomRightRadius: PropTypes.string,
};

export const transformMixin = ({ transform }) => css`
  ${transform && `transform: ${transform};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'transform', css: 'transform' },
  ],
)}
`;

export const transformMixinPropTypes = {
  /**
   * The object-fit property is specified as a single keyword chosen from the list of values below.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform
   * @param {String} transform
   */
  transform: PropTypes.string,
};

export const objectMixin = ({ objectFit, objectPosition }) => css`
  ${objectFit && `object-fit: ${objectFit};`}
  ${objectPosition && `object-position: ${objectPosition};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'objectFit', css: 'object-fit' },
    { prop: 'objectPosition', css: 'object-position' },
  ],
)}
`;

export const objectMixinPropTypes = {
  /**
   * The object-fit property is specified as a single keyword chosen from the list of values below.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   * @param {String} objectFit
   */
  objectFit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none', 'scale-down']),

  /**
   * The object-position CSS property specifies the alignment of the selected replaced element's contents within the element's box.
   * Areas of the box which aren't covered by the replaced element's object will show the element's background.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
   * @param {String} objectPosition
   */
  objectPosition: PropTypes.string,
};

export const allMixin = ({ all }) => css`
  ${all && `all: ${all};`}

  ${props => generateBreakpoints(
  props,
  [
    { prop: 'all', css: 'all' },
  ],
)}
`;

export const allMixinPropTypes = {
  /**
   * The all shorthand CSS property resets all of an element's properties except unicode-bidi, direction, and CSS Custom Properties.
   * It can set properties to their initial or inherited values, or to the values specified in another cascade layer or stylesheet origin.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/all
   * @param {String} objectFit
   */
  all: PropTypes.oneOf(['initial', 'inherit', 'unset', 'revert', 'revert-layer']),
};

/**
 * Build the CSS per rule per breakpoint
 * @param {String} breakpoint A breakpoint, ex: phone, tablet, desktop
 * @param {Object} propMap    An object with arrays of values of: css-attribute : value
 */
function generateRule(breakpoint, propMap = {}) {
  // Exit early
  const breakpointProps = propMap[breakpoint];
  if (!breakpoint || !breakpointProps) return '';

  if (!CSSMediaQueries[breakpoint]) return;

  return CSSMediaQueries[breakpoint]`
    ${breakpointProps.join('\n')}
  `;
}

/**
 * Generate the CSS declaration
 * @param {String}          propMap A map from a react prop to a css property
 * @param {String|Function} value   The value of the prop
 * @param {Object}          Theme   The theme object specific to the prop type
 */
function generateStyle(cssAttribute, value, theme = {}) {
  if (typeof value === 'function') {
    return value() || undefined;
  }

  return (typeof value === 'undefined')
    ? undefined
    : `${cssAttribute}: ${theme[value] || value};`;
}

/**
 * Generate CSS media queries from generate breakpoint prop names
 * ex: `align="center"` could be extended into `phoneAlign="center"`
 * Note: currently only works when the expected value is a direct output:
 * Yep: ${({ display }) => diplay && `display: ${display};`}
 * Nope: display: ${({ hide, inline }) => (hide ? 'none' : inline ? 'inline-flex' : 'flex')};
 * @param {Object} props        The component's props
 * @param {Array}  propNamesMap A map prop/css names: [{ prop: 'paddingTop', css: 'padding-top' }]
 */
export function generateBreakpoints(props = {}, propNamesMap = [], { theme = null } = {}) {
  // Flag to exit early if no props are set
  let propUsed = false;

  const breakpointKeys = Object.keys(BREAKPOINTS);

  const generatedMixinProps = breakpointKeys
    .reduce((accumulator, breakpoint) => {
      propNamesMap.forEach((propNameMap) => {
        const capitalizedPropName = capitalize(propNameMap.prop);
        const breakpointPropName = `${breakpoint}${capitalizedPropName}`;

        let handledPropValue = props[breakpointPropName];

        if (theme && typeof handledPropValue !== 'undefined') {
          // Get all the part of the padding if they're separated by a space
          const propValueParts = typeof handledPropValue === 'string' && handledPropValue.split(' ');

          // Iterate over the prop values if there are multiple parts
          handledPropValue = (Array.isArray(propValueParts) && propValueParts.length > 0)
            // Test each value in the shorthand against the theme
            ? propValueParts
              .map(value => theme[value] || value)
              .join(' ')

            // Use the provided value as is
            : handledPropValue;
        }

        // If the value is a function, call it
        const value = generateStyle(propNameMap.css, handledPropValue, propNameMap.theme);

        // Ignore props that don't contain a value
        if (typeof value === 'undefined') return;

        // Don't compute more values after generatedMixinProps if this flag is false
        if (typeof value !== 'undefined') propUsed = true;

        if (!accumulator[breakpoint]) {
          accumulator[breakpoint] = [];
        }

        accumulator[breakpoint].push(value);
      });

      return accumulator;
    }, {});

  // If there's no props, exit
  if (!propUsed) return '';

  return breakpointKeys.map(breakpoint => generateRule(breakpoint, generatedMixinProps));
}
