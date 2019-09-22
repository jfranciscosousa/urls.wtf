import React, { useState } from "react";
import axios from "axios";

import Layout from "root/components/Layout";
import useForm from "root/shared/useForm";
import apiUrl from "root/shared/apiUrl";

import styles from "./index.module.css";

const { location } = global;

const IndexPage = () => {
  const [hash, setHash] = useState();
  const { values, handleChange } = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await axios.post(`${apiUrl}/new_url`, {
      url: values.url,
    });

    setHash(`/u/${response.data.hash}`);
  }

  return (
    <Layout>
      <div className={styles.root}>
        <h1>me_url</h1>

        <p>minimalistic url shortener.</p>
        <p>no tracking.</p>
        <p>no ads.</p>

        <form onSubmit={handleSubmit}>
          <input name="url" value={values.url} onChange={handleChange} />

          <button type="submit">Go</button>
        </form>

        {hash ? (
          <a href={apiUrl + hash}>
            {`${location.protocol}//${location.host}${hash}`}
          </a>
        ) : null}
      </div>
    </Layout>
  );
};

export default IndexPage;
