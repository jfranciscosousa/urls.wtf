import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from "./index.module.css";

function Layout({ title, description, keywords, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="logo.png" />
      </Helmet>

      <div className={styles.root}>{children}</div>
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
