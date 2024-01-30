import styled from 'styled-components';

import {
  sizeMixin,
  displayMixin,
  fontThemeMixin,
  fontMixinPropTypes,
  paddingMixin,
  positionMixin,
  backgroundThemeMixin,
  backgroundMixinPropTypes,
  overflowMixin,
  overflowMixinPropTypes,
} from '../utils/style-utils';

/**
 * A component to handle non-header/non-paragraph use cases
 *
 * Usage examples:
 *
 * Basic:
 * <Text>Username</Text>
 *
 * Many props:
 * <Text
 *  color="#fff"
 * fontWeight="900"
 * textAlign="center"
 * >
 *  Username
 * </Text>
 */

const Text = styled.span`
  ${sizeMixin}
  ${displayMixin}
  ${fontThemeMixin}
  ${paddingMixin}
  ${positionMixin}
  ${backgroundThemeMixin}
  ${overflowMixin}
`;

Text.propTypes = {
  ...fontMixinPropTypes,
  ...backgroundMixinPropTypes,
  ...overflowMixinPropTypes,
};

Text.defaultProps = {
  color: 'charcoal',
  fontWeight: 'normal',
  fontFamily: 'primary', // Default to primary font family
  fontSize: 'small',
  textAlign: 'left',
  textDecoration: 'none',
};

export default Text;
