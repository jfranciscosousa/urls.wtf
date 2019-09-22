import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.link}>
          me_url
        </Link>
      </div>
    </header>
  );
}
