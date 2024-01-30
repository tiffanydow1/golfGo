import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styles adapted from
// https://github.com/necolas/normalize.css/blob/master/normalize.css

// These styled componets are generated outside of the Heading component below
// If we generated the `styled[h-]` on the fly it would be a performance problem
// So it's cheaper just to list empty
const H1 = styled.h1`
  /* Override: we don't want any margin */
  margin: 0;

  box-sizing: border-box;
`;

const H2 = styled.h2`
  /* Override: we don't want any margin */
  margin: 0;

  box-sizing: border-box;
`;

const H3 = styled.h3`
  /* Override: we don't want any margin */
  margin: 0;

  box-sizing: border-box;
`;

const H4 = styled.h4`
  /* Override: we don't want any margin */
  margin: 0;

  box-sizing: border-box;
`;

const H5 = styled.h5`
  /* Override: we don't want any margin */
  margin: 0;

  box-sizing: border-box;
`;

const elements = {
  H1,
  xlarge: H1,
  H2,
  large: H2,
  H3,
  medium: H3,
  H4,
  small: H4,
  H5,
  xsmall: H5,
};

const HeadingBase = ({ size, ...rest }) => {
  const handledSize = typeof size === 'number'
    ? `H${size}`
    : size;

  const Element = elements[handledSize];

  return Element
    ? <Element {...rest} />
    : null;
};

HeadingBase.propTypes = {
  /**
   * The size of which heading size to use
   * @param {Number|String} size
   */
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 'xlarge', 'large', 'medium', 'small', 'xsmall']),
};

HeadingBase.defaultProps = {
  size: 'large',
};

export default HeadingBase;
