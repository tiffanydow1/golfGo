import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonIcon from './../buttons/ButtonIcon';
import { colors } from '../../../styles/colors';
import { media } from '../../../styles/mediaqueries';
import { fontSize, lineHeight } from '../../../styles/mixins';

const CounterBox = styled.div`
  border: 1px solid ${colors.charcoal30};
  border-radius: 50px;
  display: flex;
  flex-wrap: nowrap;
  padding: 4px;
  justify-content: space-between;
  input {
    display: inline-block;
    text-align: center;
    max-width: 58px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const Label = styled.label`
  ${fontSize(20)};
  ${lineHeight(32)};
  margin-bottom: 8px;
  display: block;
  ${media.xs`
    ${fontSize(20)};
  `}
  ${media.sm`
    ${fontSize(24)};
    ${lineHeight(40)};
  `}
`;

const Counter = ({ value: initialValue, label, handleTotalUpdate }) => {
  const [value, setValue] = useState(initialValue);

  const decrease = () => {
    setValue(prev => Math.max(prev - 1, 0));

    handleTotalUpdate(-1);
  };

  const increase = () => {
    setValue(prev => Math.max(prev + 1, 0));

    handleTotalUpdate(1);
  };

  return (
    <>
      <Label>{label}</Label>

      <CounterBox>
        <ButtonIcon
          onClick={decrease}
          disabled={value <= 0}
          icon="images/minus-icon.svg"
        />

        <input readOnly value={value} />

        <ButtonIcon
          onClick={increase}
          icon="images/plus-icon.svg"
        />
      </CounterBox>
    </>
  );
};

Counter.propTypes = {
  /**
   * Counter value
   * @param {Number} value
   */
  value: PropTypes.number,

  /**
   * Counter label
   * @param {String} label
   */
  label: PropTypes.string.isRequired,

  /**
   * Function that handles calculating total score
   * @param {Function} handleTotalUpdate
   */
  handleTotalUpdate: PropTypes.func.isRequired
};

Counter.defaultProps = {
  value: 0,
  label: "Hole 1",
  handleTotalUpdate: () => { } // noop
};

export default Counter;
