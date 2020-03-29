// eslint-disable-next-line no-unused-vars
const globals = {
  $: document.querySelector.bind(document),

  postData: async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      let errorData;

      try {
        errorData = await response.json();
      } catch (error) {
        // let errorData be undefined
      }

      throw {
        status: response.status,
        data: errorData,
      };
    }

    return {
      status: response.status,
      data: await response.json(),
    };
  },

  hideElement: (element) => {
    if (element) element.style = "display: none;";
  },

  showElement: (element) => {
    if (element) element.style = "display: block;";
  },
};
