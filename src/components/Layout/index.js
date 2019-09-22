import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.css";

function Layout({ children }) {
  return <div className={styles.root}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Layout;
