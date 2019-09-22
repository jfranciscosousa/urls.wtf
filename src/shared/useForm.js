import { useState } from "react";

export default function useForm() {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
  };

  const handleChange = event => {
    event.persist();

    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
}
