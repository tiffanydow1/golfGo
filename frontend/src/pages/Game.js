import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useGame } from '../contexts/GameContext';

import Scorecard from '../components/custom/Scorecard';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Game = () => {
  const { gameData } = useGame();

  console.log(gameData, 'gameeee data');
  return (
    <Container>
      <h1>Game</h1>

      <Body>
        <h3>{gameData?.name}</h3>
        <p>{gameData?.location}</p>

        <Scorecard gameLength={gameData?.game_length} />
      </Body>
    </Container>

  );
};

Game.propTypes = {
  /**
   * Golf course name
   * @param {String} courseName
   */
  courseName: PropTypes.string,

  /**
   * Golf course location
   * @param {String} location
   */
  location: PropTypes.string
}

Game.defaultProps = {
  courseName: 'Indian Lake Golf Course',
  location: 'Hatchet Lake, NS'
};

export default Game;
