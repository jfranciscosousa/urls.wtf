import React, { useState } from "react";
import axios from "axios";

import Layout from "root/components/Layout";
import useForm from "root/shared/useForm";
import apiUrl from "root/shared/apiUrl";

import styles from "./index.module.css";

const { location } = global;

function useNewUrlRequest() {
  const [state, setState] = useState({ loading: false });

  async function makeRequest(url) {
    try {
      setState({ loading: true });

      const response = await axios.post(`${apiUrl}/new_url`, {
        url,
      });

      setTimeout(
        () => setState({ hash: `/u/${response.data.hash}`, loading: false }),
        500,
      );
    } catch (error) {
      setTimeout(
        () => setState({ error: error.response.data, loading: false }),
        500,
      );
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
      <div className={styles.root}>
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
          <a href={apiUrl + hash}>
            {`${location.protocol}//${location.host}${hash}`}
          </a>
        ) : null}

        {error}
      </div>
    </Layout>
  );
}

export default HomePage;
