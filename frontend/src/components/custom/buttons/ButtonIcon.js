import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { buttonColors } from '../../../styles/colors';
import { media } from '../../../styles/mediaqueries';

const Button = styled.button`
  border: none;
  padding: 0;
  border-radius: 50px;
  width: 38px;
  height: 38px;
  border: 1px solid ${buttonColors.initial.border};
  background: ${buttonColors.initial.background};
  transition: border 0.2s ease-in-out;
  * {
    fill: ${buttonColors.initial.content};
  }

  *:not(rect) {
    display: inline-block;
    width: 16px;
    height: 16px;
  }

  ${media.sm`
    &:hover:not(:disabled) {
      border: 1px solid ${buttonColors.hover.border};
      background: ${buttonColors.hover.background};
      * {
        fill: ${buttonColors.hover.content};
      }
    }
  `}

  &:focus {
    border: 1px solid ${buttonColors.focus.border};
    background: ${buttonColors.focus.background};
  }
  &:disabled {
    cursor: not-allowed;
    border: 1px solid ${buttonColors.disabled.border};
    backgrond: ${buttonColors.disabled.background};
    * {
      fill: ${buttonColors.disabled.content};
    }
  }
`;

const ButtonIcon = ({ icon, disabled, onClick, }) => (
  <Button onClick={onClick} disabled={disabled}>
    <img src={icon} alt="plus icon" />
  </Button>
);

ButtonIcon.propTypes = {
  /**
   * Icon for button
   * @param {String} icon
   */
  icon: PropTypes.string.isRequired,

  /**
   * Is button disabled?
   * @param {Boolean} disabled
   */
  disabled: PropTypes.bool,

  /**
   * Button onClick function
   * @param {Function} onClick
   */
  onClick: PropTypes.func.isRequired
}

ButtonIcon.defaultProps = {
  icon: "images/plus-icon.svg",
  disabled: null,
  onClick: () => { } // noop
};

export default ButtonIcon;
