import React from "react";

/**
 * Why does this script have basic `style` prop objects? Simple.
 * With noscript css modules don't seem to work,
 * or basically the html.js from gatsby doesn't have access
 * to the css modules transformation.
 *
 * Nevertheless I don't care what the reason is, and this seems to work.
 *
 * If you are a Javascript hater, go away.
 * You should't even reach this page if you are a regular person.
 */

const rootStyles = {
  position: "absolute",
  right: "0",
  left: "0",
  zIndex: "1",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#2f353b",
};

const centerStyles = {
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translate(50%, -50%)",
};

const pStyles = {
  marginBottom: "2rem",
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
