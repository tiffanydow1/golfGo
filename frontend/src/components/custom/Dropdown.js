import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaAngleDown } from "react-icons/fa6";

import Structure from '../basic/layout/Structure';

const Container = styled(Structure)`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
`;

const Input = styled(Structure)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  user-select: none;
`;

const Menu = styled(Structure)`
  z-index: 5;
  position: absolute;
  top: 2.625rem;
  left: 0;
  width: 100%;
  max-height: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
`;

const DropdownItem = styled(Structure)`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9fc3f870;
  }

  ${({ selected }) => selected && `
    background-color: #0d6efd;
    color: #fff;
  `}
`;

const SearchContainer = styled(Structure)`
  padding: 5px;
  background-color: #eee;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus-visible {
    outline: #ccc auto 1px;
  }
`;

const Dropdown = ({
  placeholder,
  options,
  isSearchable,
  onChange
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    }
  });

  useEffect(() => {
    setSearchValue('');

    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const onMenuItemClick = (option) => {
    setSelectedValue(option);
    onChange(option);
  }

  const isSelected = (option) => {
    if (!selectedValue) return false;

    return selectedValue.id === option.id;
  }

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const getSearchOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(option => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };

  return (
    <Container>
      <Input
        ref={inputRef}
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu && (
          <Menu>
            {isSearchable && (
              <SearchContainer>
                <SearchInput
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                />
              </SearchContainer>
            )}

            {getSearchOptions().map(option => (
              <DropdownItem
                onClick={() => onMenuItemClick(option)}
                key={option.id}
                selected={isSelected(option)}
              >
                {option.name}
              </DropdownItem>
            ))}
          </Menu>
        )}

        {selectedValue?.name || placeholder}

        <FaAngleDown />
      </Input>
    </Container>
  );
};

export default Dropdown;
