import React, { useState } from "react";
import axios from "axios";

import Layout from "root/components/Layout";
import useForm from "root/shared/useForm";

const { location } = global;

function useNewUrlRequest() {
  const [state, setState] = useState({ loading: false });

  async function makeRequest(url) {
    try {
      setState({ loading: true });

      const response = await axios.post("/.netlify/functions/create_url", {
        url,
      });

      setState({ hash: `/u/${response.data.hash}`, loading: false });
    } catch (error) {
      setState({ error: error.response.data.error, loading: false });
    }
  }

  return { state, makeRequest };
}

function HomePage() {
  const {
    state: { loading, error, hash },
    makeRequest,
  } = useNewUrlRequest();
  const { values, handleChange } = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    await makeRequest(values.url);
  }

  return (
    <Layout
      title="urls.wtf"
      description="minimalistic url shortener"
      keywords="url shortener open-source"
    >
      <h1>urls.wtf</h1>

      <p>minimalistic url shortener.</p>
      <p>no tracking.</p>
      <p>no ads.</p>

      <form onSubmit={handleSubmit}>
        <input name="url" value={values.url || ""} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          Go
        </button>
      </form>

      {loading ? "shortening your url" : null}

      {hash && !loading ? (
        <a href={hash}>{`${location.protocol}//${location.host}${hash}`}</a>
      ) : null}

      {error}
    </Layout>
  );
}

export default HomePage;
