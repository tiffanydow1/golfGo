import { useMutation } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const createPlayer = async (newPlayerData) => {
  const response = await fetch('http://localhost:4000/api/players/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPlayerData),
  });

  if (!response.ok) {
    throw new Error('Error creating player');
  }

  return response.json();
};

export const useCreatePlayer = () => {
  const { login } = useAuth();
  let navigate = useNavigate();

  return useMutation(createPlayer, {
    onSuccess: (response) => {
      // Invalidate and refetch the players list when a new player is added
      login(response);
      console.log('player successfully created');
      navigate('/');
      // queryClient.invalidateQueries('players');
    },
  });
};
