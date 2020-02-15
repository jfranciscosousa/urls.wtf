import React from "react";
import Link from "gatsby-link";
import styled from "@emotion/styled";

const Root = styled.header`
  margin-bottom: 1.45rem;

  h1 {
    margin: 0;
  }
`;

const StyledLink = styled(Link)`
  color: white !important;

  text-decoration: none !important;
`;

export default function Header() {
  return (
    <Root>
      <StyledLink to="/">urls.wtf</StyledLink>
    </Root>
  );
}
