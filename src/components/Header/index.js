import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.root}>
      <Link to="/" className={styles.link}>
        urls.wtf
      </Link>
    </header>
  );
}
