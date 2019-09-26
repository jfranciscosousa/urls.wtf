import React from "react";

const rootStyles = {
  position: "absolute",
  right: "0",
  left: "0",
  "z-index": "1",
  width: "100vw",
  height: "100vh",
  "background-color": "#2f353b",
};

const centerStyles = {
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translate(50%, -50%)",
};

const pStyles = {
  "margin-bottom": "2rem",
};

const aStyles = {
  color: "white",
};

export default function Noscript() {
  return (
    <div style={rootStyles}>
      <div style={centerStyles}>
        <p style={pStyles}>
          Sorry about that, this website only work with Javascript enabled.
        </p>

        <p style={pStyles}>
          If you are picky about it, check the source code at{" "}
          <a style={aStyles} href="https://github.com/jfranciscosousa/urls.wtf">
            https://github.com/jfranciscosousa/urls.wtf
          </a>{" "}
          it&apos;s safe to run it.
        </p>
      </div>
    </div>
  );
}
