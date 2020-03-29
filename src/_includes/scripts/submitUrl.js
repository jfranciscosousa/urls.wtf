const { $, hideElement, showElement, postData } = globals;

// eslint-disable-next-line no-unused-vars
const GlobalSubmitUrl = (() => {
  const input = $("#urlInput");
  const submitButton = $("#urlSubmitButton");
  const apiLoading = $("#apiLoading");
  const apiResultContainer = $("#apiResult");
  const apiErrorContainer = $("#apiError");

  submitButton.disabled = false;

  async function onFormSubmit(event) {
    event.preventDefault();

    submitButton.disabled = true;
    hideElement(apiResultContainer);
    hideElement(apiErrorContainer);
    showElement(apiLoading);

    try {
      const response = await postData("/.netlify/functions/create_url", {
        url: input.value,
      });

      showElement(apiResultContainer);
      apiResultContainer.innerHTML = `${window.location.origin}/u/${response.data.hash}`;
      apiResultContainer.href = `${window.location.origin}/u/${response.data.hash}`;
    } catch (error) {
      showElement(apiErrorContainer);
      apiErrorContainer.innerHTML =
        (error.data && error.data.error) || "ugh, this shouldn't happen";
    }

    submitButton.disabled = false;
    hideElement(apiLoading);
  }

  return { onsubmit: onFormSubmit };
})();
