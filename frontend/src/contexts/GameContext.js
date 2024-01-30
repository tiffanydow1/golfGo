import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState(() => {
    // Load game data from local storage if available
    const savedGameData = localStorage.getItem('gameData');
    return savedGameData ? JSON.parse(savedGameData) : null;
  });

  useEffect(() => {
    // Update local storage when gameData changes
    if (gameData) {
      localStorage.setItem('gameData', JSON.stringify(gameData));
    }
  }, [gameData]);

  const updateGameData = (newGameData) => {
    setGameData(newGameData);
  };

  const clearGameData = () => {
    localStorage.removeItem('gameData');
    setGameData(null);
  };

  return (
    <GameContext.Provider value={{ gameData, updateGameData, clearGameData }}>
      {children}
    </GameContext.Provider>
  );
}
