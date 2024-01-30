import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { backgroundColors } from '../../styles/colors';

const Container = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: auto;
  margin-bottom: 2rem;
  background: ${backgroundColors.primary};
  box-shadow: ${backgroundColors.gradiant};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Card = ({ children }) => (
  <Container>
    {children}
  </Container>
);

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
