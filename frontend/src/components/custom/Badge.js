import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { backgroundColors, textColors } from '../../styles/colors';
import { media } from '../../styles/mediaqueries';
import { fontSize, lineHeight } from '../../styles/mixins';

const Element = styled.p`
  text-align: center;
  font-weight: bold;
  color: ${props =>
    props.label === "New"
      ? textColors.new
      : props.label === "Pending"
        ? textColors.primary
        : textColors.primary};
  ${fontSize(18)};
  ${lineHeight(24)};
`;

const Container = styled.div`
    position: relative;
    padding: 16px 16px 16p 0;
    z-index: 1;
    width: 30%;
    background: ${props =>
    props.label === "New"
      ? backgroundColors.new
      : props.label === "Pending"
        ? backgroundColors.danger
        : backgroundColors.secondary};
    img {
      height: 100%;
      top: 0;
      position: absolute;
      left: -102px;
      z-index: -1;
      fill: ${props =>
    props.label === "New"
      ? backgroundColors.new
      : props.label === "Pending"
        ? backgroundColors.danger
        : backgroundColors.secondary};
    }
    ${media.sm`
      width: 168px;
      ${fontSize(24)};
    `}
`;

const Badge = ({ label }) => (
  <Container label={label}>
    <Element label={label}>{label}</Element>
    <img src='images/wave-icon.svg' alt="badge icon" />
  </Container>
);

Badge.propTypes = {
  /**
   * Label for badge
   * @param {String} label
   */
  label: PropTypes.string
}

Badge.defaultProps = {
  label: "Label"
}

export default Badge;
