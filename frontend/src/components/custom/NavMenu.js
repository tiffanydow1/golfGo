import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link as LinkBase } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { IoGolfOutline } from 'react-icons/io5';

import Structure from '../basic/layout/Structure';
import ButtonBase from '../basic/Button';
import Text from '../basic/Text';

const Wrapper = styled(Structure)`
  z-index: 30;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: calc(100vh - 1.5rem);
  overflow-y: auto;
  background-color: white;
  -webkit-overflow-scrolling: touch;
  transition: transform 300ms ease-in-out;
  transform: translateX(${({ active }) => (active ? '0%' : '-100%')});
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.green500};
  font-size: 2rem;
  font-weight: 600;
`;

const GolfIcon = styled(IoGolfOutline)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.green500};
`;

const Button = styled(ButtonBase)`
  padding: ${({ theme }) => theme.layout.sizes.xxsmall};
`;

const Icon = styled(LiaTimesSolid)`
  font-size: 1.75rem;
  color: black;
`;

const Link = styled(LinkBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  flex-shrink: 0;
`;

const Menu = styled(Structure)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  ${Link} {
    justify-content: flex-start;
    padding: 1rem 1.75rem;
  }
`;

const MenuItems = styled(Structure)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  flex-shrink: 0;
`;

const NAVIGATION = [
  {
    label: 'Game',
    URL: '/game',
  },
  {
    label: 'Profile',
    URL: '/account',
  },
  {
    label: 'Courses',
    URL: '/courses',
  },
  {
    label: 'History',
    URL: '/history'
  }
];

const NavMenu = ({ active, onLinkClick }) => (
  <Wrapper active={active}>
    <Structure
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      width="100%"
      padding="small"
      borderBottom="1px solid #F8F3EF"
      marginBottom="xsmall"
    >
      <Structure
        flexGrow={1}
        display="flex"
        justifyContent="center"
      >
        <Link
          to="/"
          onClick={(event) => onLinkClick(event)}
        >
          {/* Image comp width=6rem height="2.5rem" */}
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

      <Button
        type="button"
        onClick={(event) => {
          onLinkClick(event);
        }}
      >
        <Icon />
      </Button>
    </Structure>

    <Menu>
      {NAVIGATION.map(item => (
        <MenuItems key={item.URL}>
          <Link to={item.URL}>
            <Structure
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Text
                fontSize="large"
                color="charcoal"
                fontWeight="600"
                width="100%"
              >
                {item.label}
              </Text>
            </Structure>
          </Link>
        </MenuItems>
      ))}
    </Menu>
  </Wrapper >
);

NavMenu.propTypes = {
  /**
   * Is the sidebar active?
   * @param {Boolean} active
   */
  active: PropTypes.bool,

  /**
   * Callback from when a link is clicked
   * @param {Function} onLinkClick
   */
  onLinkClick: PropTypes.func,
};

NavMenu.defaultProps = {
  active: false,
  onLinkClick: () => { }, // noop
};

export default NavMenu;
