import { css } from 'styled-components';

import { BREAKPOINTS } from '../../utils/constants';

/**
 * A styled-components CSS media query helper
 * Allows to create media queries within styled-components based off of our--
 * --breakpoint conventions
 *
 * Usage:
 * const Awesome = styled.div`
 *  width: 100%;
 *
 *  ${CSSMediaQueries.tablet`
 *    width: auto;
 *  `}
 * `;
 */
// Iterate through the sizes and create a media template
export const CSSMediaQueries = Object
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
