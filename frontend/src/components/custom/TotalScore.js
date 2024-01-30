import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { backgroundColors } from '../../styles/colors';
import { media } from '../../styles/mediaqueries';
import { fontSize, lineHeight } from '../../styles/mixins';

const GreyBox = styled.div`
  background: ${backgroundColors.secondary};
  display: flex;
  justify-content: space-between;
  padding: 24px;
  font-weight: bold;
  ${fontSize(20)};
  ${lineHeight(32)};
  white-space: nowrap;
  span {
    margin-right: 19px;
  }
  margin-top: 32px;

  ${media.xs`
    ${fontSize(20)};
    ${lineHeight(24)};
    margin-top: 40px;
    span {
      width: 144px;
      margin-right: 0;
      text-align: center;
    }
  `}

  ${media.sm`
    ${fontSize(24)};
    ${lineHeight(24)};
  `}
`;

const Total = ({ total }) => (
  <GreyBox>
    <label>Total Score</label>
    <span>{total}</span>
  </GreyBox>
);

Total.propTypes = {
  /**
   * Total score of the game
   * @param {Number} total
   */
  total: PropTypes.number
}

Total.defaultProps = {
  total: 0
}

export default Total;
