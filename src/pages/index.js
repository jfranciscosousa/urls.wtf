import React from "react";
import Link from "gatsby-link";

import SEO from "root/components/SEO";
import Header from "root/components/Header";
import Layout from "root/components/Layout";

const IndexPage = () => (
  <div>
    <SEO title="Home Page" />
    <Header />
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  </div>
);

export default IndexPage;
