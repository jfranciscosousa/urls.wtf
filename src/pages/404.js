import React from "react";

import Layout from "root/components/Layout";
import Link from "root/components/Link";

export default function NotFound() {
  return (
    <Layout
      title="urls.wtf | 404"
      description="minimalistic url shortener"
      keywords="url shortener open-source"
    >
      <p>
        Hey, no lollygaging, go back to where you should be,{" "}
        <Link to="/">here</Link>
      </p>
    </Layout>
  );
}
