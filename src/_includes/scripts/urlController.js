const { $, hideElement, showElement, postData } = globals;

// eslint-disable-next-line no-unused-vars
const GlobalUrlController = (() => {
  const input = $("#urlInput");
  const submitButton = $("#urlSubmitButton");
  const apiLoading = $("#apiLoading");
  const apiResultContainer = $("#apiResult");
  const apiErrorContainer = $("#apiError");
  const copyButton = $("#copyButton");

  submitButton.disabled = false;

  async function onFormSubmit(event) {
    event.preventDefault();

    submitButton.disabled = true;
    hideElement(apiResultContainer);
    hideElement(apiErrorContainer);
    hideElement(copyButton);
    showElement(apiLoading);

    try {
      const response = await postData("/.netlify/functions/create_url", {
        url: input.value,
      });

      showElement(apiResultContainer);
      showElement(copyButton);
      apiResultContainer.innerHTML = `${window.location.origin}/u/${response.data.hash}`;
      apiResultContainer.href = `${window.location.origin}/u/${response.data.hash}`;
    } catch (error) {
      showElement(apiErrorContainer);

      if (error.status === 429) {
        apiErrorContainer.innerHTML =
          "you are rate limited! try in an hour or so";
      } else {
        apiErrorContainer.innerHTML =
          (error.data && error.data.error) || "ugh, this shouldn't happen";
      }
    }

    submitButton.disabled = false;
    hideElement(apiLoading);
  }

  async function onCopyClick() {
    const inputElement = document.createElement("input");

    inputElement.setAttribute("type", "text");
    inputElement.style = "position: absolute; left: -1000px; top: -1000px";
    document.body.appendChild(inputElement);
    inputElement.value = apiResultContainer.innerHTML;
    inputElement.select();
    document.execCommand("copy");

    inputElement.remove();
  }

  return { onFormSubmit, onCopyClick };
})();
