import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Score = ({ hole, par }) => {
  const [score, setScore] = useState(par);

  return (
    <div>
      <button onClick={() => setScore(score - 1)}>-</button>

      <input
        type="text"
        name={`hole-${hole}`}
        value={score}
        onChange={(event) => setScore(Number(event.target.value))}
      />

      <button onClick={() => setScore(score + 1)}>+</button>
    </div>
  );
}

Score.propTypes = {
  /**
   * Number of the hole
   * @param {Number} hole
   */
  hole: PropTypes.number,

  /**
   * Par for the hole
   * @param {Number} par
   */
  par: PropTypes.number
}

Score.defaultProps = {
  hole: 1,
  par: 0,
}

export default Score;
