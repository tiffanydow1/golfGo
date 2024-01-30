import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [player, setPlayer] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:4000/api/players/655d44b3ed62a5112eb078f9`)
      .then(async ({ data: player }) => {
        setPlayer(player);
      })
  }, []);

  console.log(player, 'playyyyer')

  return (
    <div>
      <h3>Account Page</h3>

      <p>username: {player.username}</p>
      <p>email: {player.email}</p>

      {Array.isArray(player.games) && player.games.length > 0 && player.games.map(game => (
        <div>
          <h3>Game History</h3>

          <p>{game.name}</p>

          <p>{game.game_length}</p>

          <p>{game.location}</p>

          <p>{game.date}</p>
        </div>
      ))}
    </div>
  )
};

export default Account;
