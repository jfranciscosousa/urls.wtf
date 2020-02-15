import React from "react";
import styled from "@emotion/styled";

import Layout from "root/components/Layout";
import useForm from "root/shared/useForm";
import useCreateUrl from "root/shared/useCreateUrl";

const { location } = global;

const Header = styled.h1`
  margin-bottom: 4rem;

  font-size: 3rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  height: 100%;
  padding: 0.6rem;
  margin-left: 1rem;

  border-radius: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 2rem 0;

  border-radius: 4px;
`;

const Link = styled.a`
  color: white;
`;

function HomePage() {
  const {
    state: { loading, error, hash },
    makeRequest,
  } = useCreateUrl();
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
      <Header>urls.wtf</Header>

      <Paragraph>minimalistic url shortener.</Paragraph>
      <Paragraph>no tracking.</Paragraph>
      <Paragraph>no ads.</Paragraph>

      <Form onSubmit={handleSubmit}>
        <Input name="url" value={values.url || ""} onChange={handleChange} />

        <Button type="button" disabled={loading}>
          Go
        </Button>
      </Form>

      {loading ? "shortening your url" : null}

      {hash && !loading ? (
        <Link href={hash}>
          {`${location.protocol}//${location.host}${hash}`}
        </Link>
      ) : null}

      {error}
    </Layout>
  );
}

export default HomePage;
