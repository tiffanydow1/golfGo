import styled from 'styled-components';

// Styles adapted from
// https://github.com/necolas/normalize.css/blob/master/normalize.css

export default styled.button.attrs(({ type }) => ({
  type: type || 'button', // convenience: most likely use-case is handle an event not submit a form
}))`
  padding: 0;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 100%;
  background: none;
  border: none;

  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  margin: 0; /* 2 */

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */
  /* 1 */
  overflow: visible;

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */
  /* 1 */
  text-transform: none;

  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */
  &,
  &[type="button"],
  &[type="reset"],
  &[type="submit"] {
    -webkit-appearance: button;
  }

  /**
   * Remove the inner border and padding in Firefox.
   */
  &::-moz-focus-inner,
  &[type="button"]::-moz-focus-inner,
  &[type="reset"]::-moz-focus-inner,
  &[type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
   * Restore the focus styles unset by the previous rule.
   */
  &:-moz-focusring,
  &[type="button"]:-moz-focusring,
  &[type="reset"]:-moz-focusring,
  &[type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
`;
