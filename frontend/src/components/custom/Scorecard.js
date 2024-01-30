import React, { useState } from 'react';
import styled from 'styled-components';

import { fontSize, lineHeight } from '../../styles/mixins';
import { media } from '../../styles/mediaqueries';

import CountersList from './counters/CountersList';
import TotalScore from './TotalScore';
import Card from './Card';
import Badge from './Badge';

const Header = styled.div`
  margin-bottom: 24px;
  position: relative;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
`;

const Title = styled.h2`
  ${fontSize(20)};
  ${lineHeight(22)};
  padding: 16px 0 0 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 113px);
  white-space: nowrap;

  ${media.xs`
    ${fontSize(24)};
    width: calc(100% - 125px);
    ${lineHeight(28)};
  `}

  ${media.sm`
    ${fontSize(26)};
    ${lineHeight(22)};
  `}
`;

const Scorecard = ({ gameLength }) => {
  const [totalScore, setTotalScore] = useState(0);

  const handleTotalUpdate = (value) => {
    setTotalScore(Math.max(totalScore + 1, 0));
  };

  const submitScore = () => {

  }

  return (
    <Card>
      <Header>
        <Title>Game #</Title>

        <Badge></Badge>
      </Header>

      <CountersList
        gameLength={gameLength}
        handleTotalUpdate={handleTotalUpdate}
      />

      <TotalScore total={totalScore} />

      <button>Submit</button>
    </Card>
  );
};

export default Scorecard;
