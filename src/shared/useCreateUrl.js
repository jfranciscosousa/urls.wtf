import { useState } from "react";
import axios from "axios";

export default function useCreateUrl() {
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
