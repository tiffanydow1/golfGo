import styled from 'styled-components';

import { CSSMediaQueries } from './CSSMediaQueries';

import {
  displayMixin,
  displayMixinPropTypes,
  sizeMixin,
  flexMixin,
  flexMixinPropTypes,
  gridMixin,
  gridMixinPropTypes,
  paddingThemeMixin,
  paddingMixinPropTypes,
  marginThemeMixin,
  marginMixinPropTypes,
  overflowMixin,
  overflowMixinPropTypes,
  positionThemeMixin,
  positionMixinPropTypes,
  backgroundThemeMixin,
  backgroundMixinPropTypes,
  borderMixin,
  borderMixinPropTypes,
  pointerEventsMixin,
  pointerEventsMixinPropTypes,
  transformMixin,
  transformMixinPropTypes,
  transitionMixin,
  transitionMixinPropTypes,
  opacityMixin,
  opacityMixinPropTypes,
  boxShadowMixin,
  boxShadowMixinPropTypes,
  fontThemeMixin,
  fontMixinPropTypes,
} from '../../utils/style-utils';

const Structure = styled.div`
  ${displayMixin}
  ${sizeMixin}
  ${flexMixin}
  ${gridMixin}
  ${paddingThemeMixin}
  ${marginThemeMixin}
  ${overflowMixin}
  ${positionThemeMixin}
  ${backgroundThemeMixin}
  ${borderMixin}
  ${pointerEventsMixin}
  ${transformMixin}
  ${transitionMixin}
  ${opacityMixin}
  ${boxShadowMixin}
  ${fontThemeMixin}

  // gap will be replaced by the officially supported CSS property one day
  // https://developer.mozilla.org/en-US/docs/Web/CSS/gap
  ${({ theme, gap }) => {
    // exit early
    if (!gap) return '';

    const [top, left] = gap
      .split(' ')
      .map(value => theme.layout.sizes[value] || value);

    return `
      > *:not(input[type="hidden"]) + *:not(input[type="hidden"]) {
        margin-top: ${top};
        margin-left: ${left || top};
      }
    `;
  }}

  ${({ theme, phoneGap }) => {
    // exit early
    if (!phoneGap) return '';

    const [top, left] = phoneGap
      .split(' ')
      .map(value => theme.layout.sizes[value] || value);

    return CSSMediaQueries.phone`
      > *:not(input[type="hidden"]) + *:not(input[type="hidden"]) {
        margin-top: ${top};
        margin-left: ${left || top};
      }
    `;
  }}

  ${({ theme, tabletGap }) => {
    // exit early
    if (!tabletGap) return '';

    const [top, left] = tabletGap
      .split(' ')
      .map(value => theme.layout.sizes[value] || value);

    return CSSMediaQueries.tablet`
      > *:not(input[type="hidden"]) + *:not(input[type="hidden"]) {
        margin-top: ${top};
        margin-left: ${left || top};
      }
    `;
  }}

  ${({ theme, desktopGap }) => {
    // exit early
    if (!desktopGap) return '';

    const [top, left] = desktopGap
      .split(' ')
      .map(value => theme.layout.sizes[value] || value);

    return CSSMediaQueries.desktop`
      > *:not(input[type="hidden"]) + *:not(input[type="hidden"]) {
        margin-top: ${top};
        margin-left: ${left || top};
      }
    `;
  }}
`;

Structure.propTypes = {
  ...displayMixinPropTypes,
  ...flexMixinPropTypes,
  ...gridMixinPropTypes,
  ...paddingMixinPropTypes,
  ...marginMixinPropTypes,
  ...overflowMixinPropTypes,
  ...positionMixinPropTypes,
  ...backgroundMixinPropTypes,
  ...borderMixinPropTypes,
  ...pointerEventsMixinPropTypes,
  ...transformMixinPropTypes,
  ...transitionMixinPropTypes,
  ...opacityMixinPropTypes,
  ...boxShadowMixinPropTypes,
  ...fontMixinPropTypes,
};

// none for now
// Structure.defaultProps = {};

export default Structure;
