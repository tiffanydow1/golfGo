import styled from 'styled-components';

// Styles adapted from
// https://github.com/necolas/normalize.css/blob/master/normalize.css

export default styled.select`
  box-sizing: border-box;
  cursor: pointer;

  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */
  text-transform: none; /* 1 */
`;
