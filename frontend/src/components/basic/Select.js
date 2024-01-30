import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Structure from './layout/Structure';
import Element from './SelectBase';
import Color from '../utils/Color';

const Wrapper = styled(Structure)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding-bottom: ${({ theme }) => theme.layout.sizes.xsmall};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.xsmall};
  font-family: ${({ theme }) => theme.typography.primary};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  transition: color 100ms ease-in;
  order: 1; /* focus sibling ~ hack */

  /* Arrow */
  ${({ variant }) => {
    if (variant === 'dark') {
      return css`
        color: white;
      `;
    }
    return css`
      color: black;
    `;
  }}

  &[disabled],
  &[readonly] {
    pointer-events: none;
    color: ${({ theme }) => theme.colors.grey300};
  }

  &[required]:after {
    content: '*';
  }

  ${({ error }) => error && css`
    color: ${({ theme }) => theme.colors.error};
  `}
`;

const Message = styled.span`
  margin-top: ${({ theme }) => theme.layout.sizes.xsmall};
  font-size: ${({ theme }) => theme.typography.sizes.xsmall};
  font-family: ${({ theme }) => theme.typography.primary};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  color: ${({ theme }) => theme.colors.charcoal};
  transition: color 100ms ease-in;
  order: 3; /* focus sibling ~ hack */

  &[disabled],
  &[readonly] {
    pointer-events: none;
    color: ${({ theme }) => theme.colors.grey300};
  }

  ${({ error }) => error && css`
    color: ${({ theme }) => theme.colors.error};
  `}
`;

const SelectElement = styled(Element)`
  position: relative;
  height: ${({ theme }) => theme.forms.select.height};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-family: ${({ theme }) => theme.typography.primary};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 0.3125rem;
  transition-property: color, border-color, background-color, background-image, box-shadow;
  transition-duration: 100ms;
  transition-timing-function: ease-in;
  order: 2; /* focus sibling ~ hack */

  /* the right value is bigger to leave room for the ellipsis */
  padding: ${({ theme }) => `${theme.layout.sizes.xxsmall} ${theme.layout.sizes.xlarge} ${theme.layout.sizes.xxsmall} ${theme.layout.sizes.small}`};

  /* Reset the style */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Arrow */
  ${({ variant }) => {
    if (variant === 'dark') {
      return css`
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6JiN4MkY7JiN4MkY7d3d3LnczLm9yZyYjeDJGOzIwMDAmI3gyRjtzdmciPjxwYXRoIGQ9Ik0xMTkuNSAzMjYuOUwzLjUgMjA5LjFjLTQuNy00LjctNC43LTEyLjMgMC0xN2w3LjEtNy4xYzQuNy00LjcgMTIuMy00LjcgMTcgMEwxMjggMjg3LjNsMTAwLjQtMTAyLjJjNC43LTQuNyAxMi4zLTQuNyAxNyAwbDcuMSA3LjFjNC43IDQuNyA0LjcgMTIuMyAwIDE3TDEzNi41IDMyN2MtNC43IDQuNi0xMi4zIDQuNi0xNy0uMXoiIGZpbGw9IiNFMEUwRTAiPjwvcGF0aD48L3N2Zz4=);
      `;
    }
    return css`
      background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6JiN4MkY7JiN4MkY7d3d3LnczLm9yZyYjeDJGOzIwMDAmI3gyRjtzdmciPjxwYXRoIGQ9Ik0xMTkuNSAzMjYuOUwzLjUgMjA5LjFjLTQuNy00LjctNC43LTEyLjMgMC0xN2w3LjEtNy4xYzQuNy00LjcgMTIuMy00LjcgMTcgMEwxMjggMjg3LjNsMTAwLjQtMTAyLjJjNC43LTQuNyAxMi4zLTQuNyAxNyAwbDcuMSA3LjFjNC43IDQuNyA0LjcgMTIuMyAwIDE3TDEzNi41IDMyN2MtNC43IDQuNi0xMi4zIDQuNi0xNy0uMXoiIGZpbGw9IiMzMzMzMzMiPjwvcGF0aD48L3N2Zz4=);
    `;
  }}
  background-position: 1rem;
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;

  /*
    Avoid "stuck" hover effects on touch devices
    https://twitter.com/NickColley/status/1093207071917518848
  */
  /* @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.grey800};
      background-color: ${({ theme }) => Color(theme.colors.primary)
    .lightness(35).hex};
    }
  } */

  &:active,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: 0;
    color: ${({ theme }) => theme.colors.grey800};
  }

  /* Using flexbox to re-order the elements so this selector works */
  &:focus ~ label {
    color: ${({ theme }) => theme.colors.primary};
  }

  &[disabled],
  &[readonly] {
    pointer-events: none;
    color: ${({ theme }) => theme.colors.grey400};
    border-color: ${({ theme }) => theme.colors.grey300};
    background-color: ${({ theme }) => theme.colors.grey200};

    /* Change arrow color when it's disabled */
    background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDUxMiIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCIgeG1sbnM9Imh0dHA6JiN4MkY7JiN4MkY7d3d3LnczLm9yZyYjeDJGOzIwMDAmI3gyRjtzdmciPjxwYXRoIGQ9Ik0xMTkuNSAzMjYuOUwzLjUgMjA5LjFjLTQuNy00LjctNC43LTEyLjMgMC0xN2w3LjEtNy4xYzQuNy00LjcgMTIuMy00LjcgMTcgMEwxMjggMjg3LjNsMTAwLjQtMTAyLjJjNC43LTQuNyAxMi4zLTQuNyAxNyAwbDcuMSA3LjFjNC43IDQuNyA0LjcgMTIuMyAwIDE3TDEzNi41IDMyN2MtNC43IDQuNi0xMi4zIDQuNi0xNy0uMXoiIGZpbGw9IiNFMEUwRTAiPjwvcGF0aD48L3N2Zz4=);
  }

  /* Kill the arrow on IE */
  ::-ms-expand {
    display: none;
  }

  /* Show ellipsis on a really long option */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  /* Fake placeholder */
  ${({ theme, placeholder }) => placeholder && css`
    /* Use a grey color for the option placeholder in Firefox */
    & option[value=""] {
      color: ${theme.colors.grey400};
    }
  `}

  /* Remove firefox dotted line */
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  ${({ error }) => error && css`
    border-color: ${({ theme }) => theme.colors.error};
  `}

  ${({ theme, variant }) => {
    if (variant === 'light') {
      return css`
        background-color: ${theme.forms.select.color};
        color: ${theme.colors.charcoal};
      `;
    }

    if (variant === 'dark') {
      return css`
        height: 3.255rem;
        font-weight: 600;
        font-size: 1rem;
        background-color: #1A1A1A;
        color: ${theme.colors.white};
        border-radius: 0rem;
      `;
    }

    if (variant === 'line') {
      return css`
        height: ${({ theme }) => theme.forms.select.height};
        font-weight: 300;
        font-size: ${theme.typography.sizes.small};
        background-color: transparent;
        color: black;
        border-bottom: 1px solid ${theme.colors.grey300};
        border-radius: 0rem;
        padding: ${({ theme }) => `${theme.layout.sizes.xxsmall} ${theme.layout.sizes.large} ${theme.layout.sizes.xxsmall} 0`};
        background-position: 100% 50%;
      `;
    }

    return '';
  }}

`;

const Select = ({
  children,
  disabled,
  readOnly,
  label,
  message,
  id,
  name,
  required,
  autoFocus,
  error,
  variant,
  placeholder,
  defaultValue,
  value,
  height,
  tabIndex,
  onChange,
  'data-type': dataType,
  'data-empty': dataEmpty,
  ...rest
}) => {
  // Ensure that labels focus their associated inputs when interacted with (clicked/touched)
  // However id's aren't required so we need to use something to identify the input
  // `name` becomes a great fallback if an `id` isn't provided
  const identifier = (id || name);

  return (
    <Wrapper {...rest}>
      <SelectElement
        id={identifier}
        name={name}
        variant={variant}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        height={height}
        data-type={dataType}
        data-empty={dataEmpty}
        onChange={onChange}
        tabIndex={readOnly ? -1 : tabIndex}
      >
        {placeholder && (
          <option
            disabled={required}
            value=""
          >
            {placeholder}
          </option>
        )}

        {children}
      </SelectElement>

      {label && (
        <Label
          htmlFor={identifier}
          variant={variant}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        >
          {label}
        </Label>
      )}

      {/* Assistive text: input validation requirements, error message, etc */}
      {message && (
        <Message
          error={error}
          disabled={disabled}
        >
          {message}
        </Message>
      )}
    </Wrapper>
  );
};

Select.propTypes = {
  /**
  * The name of the component field
  * Critical for forms
  * @param {String} name
  */
  name: PropTypes.string,

  /**
   * The id of the component
   * @param {String} id
   */
  id: (props, propName, componentName) => {
    if ((props?.id === undefined || props?.id === null) && (props?.name === undefined || props?.name === null)) {
      return new Error(
        `Missing required prop either \`id\` or \`name\` supplied to \`${componentName}\`. Validation failed.`
      );
    }
  },

  /**
   * Children are options in this case
   * @param {Array|Element} children
   */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,

  /**
   * Is the component disabled?
   * @param {Boolean} disabled
   */
  disabled: PropTypes.bool,

  /**
   * Is the input read only?
   * @param {Boolean} readOnly
   */
  readOnly: PropTypes.bool,

  /**
   * Is the component required?
   * @param {Boolean} required
   */
  required: PropTypes.bool,

  /**
   * Should we automatically focus on the component?
   * @param {Boolean} autoFocus
   */
  autoFocus: PropTypes.bool,

  /**
   * Is the field in an error state?
   * Required an external state
   * @param {Boolean} error
   */
  error: PropTypes.bool,

  /**
   * A label above the component
   * @param {String} label
   */
  label: PropTypes.string,

  /**
   * An assistive message below the component
   * @param {String} message
   */
  message: PropTypes.string,

  /**
   * Should there be a placeholder option?
   * @param {String} placeholder
   */
  placeholder: PropTypes.string,

  /**
   * React-based prop to set a defaultValue
   * @param {String|Number} defaultValue
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Control prop to manage the select's value
   * @param {String|Number} value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Height of the select
   * @param {String} height
   */
  height: PropTypes.string,

  /**
   * Which style variant should it be?
   * @param {String} variant
   */
  variant: PropTypes.oneOf(['light', 'dark', 'line']),

  /**
   * Tab index of the element
   * @param {String} tabIndex
   */
  tabIndex: PropTypes.number,

  /**
   * Set a type of value it should be coerced to, if it's needed
   * This is used by `getFormValues`
   * @param {String} data-type
   */
  'data-type': PropTypes.string,

  /**
   * Set a base value when the input's value is empty
   * This is used by `getFormValues`
   * @param {String} data-empty
   */
  'data-empty': PropTypes.string,

  /**
   * onChange callback
   * @param {Function} onChange
   */
  onChange: PropTypes.func,
};

Select.defaultProps = {
  id: '',
  disabled: false,
  readOnly: false,
  required: false,
  autoFocus: false,
  error: false,
  label: '',
  message: '',
  placeholder: '',
  defaultValue: undefined,
  value: undefined,
  height: '2.25rem',
  variant: 'light',
  tabIndex: 0, // default
  'data-type': null,
  'data-empty': null,
  onChange: () => { }, // noop
};

export default Select;
