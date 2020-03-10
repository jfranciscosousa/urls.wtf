import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);

    return { ...page, ...styles };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }} // eslint-disable-next-line react/no-danger
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
