import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { desktopOnly, tabletOnly, mobileOnly } from "root/styles/breakpoints";
import resetStyles from "root/shared/resetStyles";

const globalStyles = css`
  html {
    background-color: #2f353b;
    color: white;
  }

  html,
  * {
    font-family: Source Code Pro, monospace;
  }
`;

const Root = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  padding-top: 10rem;

  ${desktopOnly} {
    max-width: 45rem;
    margin: 0 auto;
  }

  ${tabletOnly} {
    max-width: 60vw;
    margin: 0 auto;
  }

  ${mobileOnly} {
    max-width: 80vw;
    padding-top: 5rem;
    margin: 0 auto;
  }
`;

function Layout({ title, description, keywords, children }) {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="logo.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Global styles={css(resetStyles)} />
      <Global styles={globalStyles} />

      <Root>{children}</Root>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
