// eslint-disable-next-line no-unused-vars
const GlobalSubmitUrl = (() => {
  const $ = document.querySelector.bind(document);
  const input = $("#urlInput");
  const submitButton = $("#urlSubmitButton");
  const apiLoading = $("#apiLoading");
  const apiResultContainer = $("#apiResult");
  const apiErrorContainer = $("#apiError");

  submitButton.disabled = false;

  async function postData(url, data) {
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
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    submitButton.disabled = true;
    apiResultContainer.style = "display: none;";
    apiErrorContainer.style = "display: none;";
    apiLoading.style = "display: block";

    try {
      const response = await postData("/.netlify/functions/create_url", {
        url: input.value,
      });

      apiResultContainer.style = "display: block;";
      apiResultContainer.innerHTML = `${window.location.origin}/u/${response.data.hash}`;
      apiResultContainer.href = `${window.location.origin}/u/${response.data.hash}`;
    } catch (error) {
      apiErrorContainer.style = "display: block;";
      apiErrorContainer.innerHTML =
        (error.data && error.data.error) || "ugh, this shouldn't happen";
    }

    submitButton.disabled = false;
    apiLoading.style = "display: none";
  }

  return { onsubmit: onFormSubmit };
})();
