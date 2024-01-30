import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import HeadingBase from './HeadingBase';
import { fontThemeMixin, fontMixinPropTypes } from '../utils/style-utils';

// Convert a number to a string to match the theme
const sizeMap = {
  1: 'xlarge',
  2: 'large',
  3: 'medium',
  4: 'small',
  5: 'xsmall',
  6: 'xsmall',
};

const Heading = styled(HeadingBase)`
  margin: 0;
  ${({ lineBreak }) => lineBreak && `line-break: ${lineBreak};`}

  ${({
  theme,
  variant,
  weight,
  size,
  color,
}) => {
    if (variant === 'outline') {
      // Default to white if no color is provided
      // Otherwise try and get a theme color
      // Finally use the color provided if we can't use it from a theme
      const handledColor = color || 'pearl';
      return css`
        color: ${theme.colors[handledColor] || handledColor};
        -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
        -webkit-text-stroke-width: 1px;
        letter-spacing: 2px;
        -webkit-text-stroke-color: ${theme.colors[handledColor] || handledColor};
        font-family: ${theme.typography.heading.secondary.family};
        font-weight: ${theme.typography.heading.secondary.weights[weight]};
        font-size: ${typeof size === 'number'
          ? theme.typography.heading.secondary.sizes[sizeMap[size]]
          : theme.typography.heading.secondary.sizes[size]
        };
      `;
    }

    if (variant === 'serif') {
      // Default to white if no color is provided
      // Otherwise try and get a theme color
      // Finally use the color provided if we can't use it from a theme
      const handledColor = color || 'charcoal';

      return css`
        color: ${theme.colors[handledColor] || handledColor};
        font-family: ${theme.typography.heading.primary.family};
        font-weight: ${theme.typography.heading.primary.weights[weight]};
        font-size: ${typeof size === 'number'
          ? theme.typography.heading.primary.sizes[sizeMap[size]]
          : theme.typography.heading.primary.sizes[size]
        };
      `;
    }

    // Assumes variant === 'sans-serif'

    // Default to white if no color is provided
    // Otherwise try and get a theme color
    // Finally use the color provided if we can't use it from a theme
    const handledColor = color || 'charcoal';

    return css`
      color: ${theme.colors[handledColor] || handledColor};
      font-family: ${theme.typography.heading.secondary.family};
      font-weight: ${theme.typography.heading.secondary.weights[weight]};
      font-size: ${typeof size === 'number'
        ? theme.typography.heading.secondary.sizes[sizeMap[size]]
        : theme.typography.heading.secondary.sizes[size]
      };
    `;
  }}

  ${(props) => fontThemeMixin(props, { fontSizes: props.theme.typography.heading.primary.sizes })}
`;

Heading.propTypes = {
  ...fontMixinPropTypes,

  /**
   * The size of the heading
   * @param {Number|String} size
   */
  size: PropTypes.oneOf([
    // Sizes by H value, ex: <Heading size={3} />, H3
    1, 2, 3, 4, 5,

    // Sizes by word, ex: <Heading size="medium" />, H3
    'xsmall', 'small', 'medium', 'large', 'xlarge',
  ]),

  /**
   * The variant to select from
   * @params {String} variant
   */
  variant: PropTypes.oneOf(['outline', 'serif', 'sans-serif']),
};

Heading.defaultProps = {
  weight: 'normal',
  variant: 'serif',
};

export default Heading;
