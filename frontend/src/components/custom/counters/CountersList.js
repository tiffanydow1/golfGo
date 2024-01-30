import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { media } from '../../../styles/mediaqueries';

import Counter from './Counter';

const CountersItem = styled.li`
  ${media.xs`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

const CountersListPadding = styled.ul`
  padding: 0 24px;
  li {
    margin-bottom: 16px;
    ${media.xs`
      margin-bottom: 32px;
    `}
  }

  li:last-of-type {
    margin-bottom: 0;
  }
`;

const CountersList = ({ gameLength, handleTotalUpdate }) => {
  const renderCounters = () => {
    let counters = [];
    for (let i = 1; i <= gameLength; i++) {
      counters.push(
        <CountersItem key={i}>
          <Counter
            label={`Hole ${i}`}
            value={0}
            handleTotalUpdate={handleTotalUpdate}
          />
        </CountersItem>
      );
    }
    return counters;
  }

  return (
    <CountersListPadding>
      {renderCounters()}
    </CountersListPadding>
  );
}

CountersList.propTypes = {
  /**
   * Number of hole info
   * @param {Number} gameLength
   */
  gameLength: PropTypes.number,

  /**
   * Function to handle updating score
   * @param {Function} handleTotalUpdate
   */
  handleTotalUpdate: PropTypes.func.isRequired
};

CountersList.defaultProps = {
  gameLength: 18,
}

export default CountersList;
