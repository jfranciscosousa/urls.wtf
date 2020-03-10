import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import NextLink from "next/link";

const StyledLink = styled.a`
  color: white !important;

  &:visited {
    color: inherit;
  }
`;

function Link({ to, children }) {
  return (
    <NextLink href={to}>
      <StyledLink href={to}>{children}</StyledLink>
    </NextLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
