import React from "react";
import { Link } from "gatsby";

import Layout from "root/components/Layout";

const NotFoundPage = () => (
  <Layout
    title="urls.wtf | 404"
    description="minimalistic url shortener"
    keywords="url shortener open-source"
  >
    <p>
      Hey, no lollygaging, go back to where you should be,{" "}
      <Link to="/">home</Link>
    </p>
  </Layout>
);

export default NotFoundPage;
