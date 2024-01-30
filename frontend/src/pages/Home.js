import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';

import Structure from '../components/basic/layout/Structure';
import Heading from '../components/basic/Heading';
import Text from '../components/basic/Text';
import ButtonBase from '../components/basic/Button';
import Dropdown from '../components/custom/Dropdown';

import { courseData } from '../data/courses';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.charcoal};
  font-weight: 600;
`;

const Button = styled(ButtonBase)`
  border: ${({ theme }) => `2px solid ${theme.colors.purple}`};
  color: ${({ theme }) => theme.colors.purple};
  border-radius: 10px;
  height: 80px;
  width: 48%;
  box-shadow: 2px 2px 7px #17360052;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.pearl};
    box-shadow: inset 0px 0px 5px #383b94;
    opacity: 1;
    cursor: default;
  }
`;

const StartButton = styled(ButtonBase)`
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.green500};
  color: ${({ theme }) => theme.colors.pearl};
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Home = () => {
  const { user } = useAuth();
  const { updateGameData } = useGame();

  let navigate = useNavigate();

  const [gameLength, setGameLength] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCreateGame = (event) => {
    event.preventDefault();

    axios.post('http://localhost:4000/api/games/add', {
      player_id: user._id,
      course: selectedCourse,
      game_length: gameLength,
      date: Date.now()
    })
      .then(({ data: game}) => {
        updateGameData(game);
        navigate('/game');
      })
  };

  return (
    <Structure
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="80%"
    >
      <Text fontSize="medium">
        Welcome, {user.username}!
      </Text>

      <Structure
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        marginTop="1.5rem"
      >
        <Heading
          fontSize="1.75rem"
          fontWeight="700"
        >
          Create Game
        </Heading>

        <Form onSubmit={(event) => handleCreateGame(event)}>
          <Structure
            width="100%"
            margin="1rem 0"
          >
            <Label>Course Name</Label>

            <Structure marginTop="0.5rem">
              <Dropdown
                placeholder="Select a course..."
                options={courseData}
                isSearchable
                onChange={(value) => setSelectedCourse(value)}
              />
            </Structure>
          </Structure>

          <Structure
            width="100%"
            margin="1.5rem 0"
            textAlign="center"
          >
            <Label htmlFor="course-length">Game Type</Label>

            <Structure
              display="flex"
              justifyContent="space-between"
              width="100%"
              marginTop="1rem"
            >
              <Button
                type="button"
                disabled={gameLength === 9}
                onClick={() => setGameLength(9)}
              >
                9-Hole
                <br />
                Course
              </Button>

              <Button
                type="button"
                disabled={gameLength === 18}
                onClick={() => setGameLength(18)}
              >
                18-Hole
                <br />
                Course
              </Button>
            </Structure>
          </Structure>

          <Structure marginTop="1rem">
            <StartButton
              type="submit"
              disabled={gameLength === 0 || !courseData}
            >
              Start Game
            </StartButton>
          </Structure>
        </Form>
      </Structure>
    </Structure>
  );
};

export default Home;
