import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  z-index: 1;

  width: 100vw;
  height: 100vh;

  background-color: #2f353b;
`;

const Centered = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;

  max-width: 600px;
  padding: 2rem;

  transform: translate(50%, -50%);
`;

const Paragraph = styled.p`
  margin-bottom: 2rem;
`;

const Link = styled.a`
  color: white;
`;

export default function Noscript() {
  return (
    <Root>
      <Centered>
        <Paragraph>
          Sorry about that, this website only work with Javascript enabled.
        </Paragraph>

        <Paragraph>
          If you are picky about it, check the source code at{" "}
          <Link href="https://github.com/jfranciscosousa/urls.wtf">
            https://github.com/jfranciscosousa/urls.wtf
          </Link>{" "}
          it&apos;s safe to run it.
        </Paragraph>
      </Centered>
    </Root>
  );
}
