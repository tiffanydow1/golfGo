import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as LinkBase } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoGolfOutline } from 'react-icons/io5';

import Structure from '../basic/layout/Structure';
import Text from '../basic/Text';

import NavMenu from './NavMenu';

const Banner = styled(Structure)`
  z-index: 10;
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.colors.green500};
  width: 100%;
  height: 50px;
`;

const Link = styled(LinkBase)`
  text-decoration: none;
`;

const MenuItem = styled(LuMenu)`
  position: absolute;
  top: 10px;
  left: 15px;
  width: 1.875rem;
  height: 1.875rem;
  color: ${({ theme }) => theme.colors.pearl};
  font-size: 1.875rem;
  background: none;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.pearl};
  font-size: 2rem;
  font-weight: 600;
`;

const GolfIcon = styled(IoGolfOutline)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.pearl};
`;

const Navbar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <Banner>
        <Structure
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="3.125rem"
          margin="0 auto"
          maxWidth="37.5rem"
        >
          <Link to="#" onClick={toggleMenu}>
            <MenuItem />
          </Link>

          <Link to="/">
            <Structure
              display="flex"
              alignItems="center"
            >
              <Title>
                GolfGo
              </Title>

              <GolfIcon />
            </Structure>
          </Link>
        </Structure>
      </Banner>

      <NavMenu
        active={showMenu}
        onLinkClick={toggleMenu}
      />
    </>
  );
};

export default Navbar;
