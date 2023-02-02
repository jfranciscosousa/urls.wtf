// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export default function copyToClipboard(content: string) {
  const inputElement = document.createElement("input");

  inputElement.setAttribute("type", "text");
  inputElement.style = "position: absolute; left: -1000px; top: -1000px";
  document.body.appendChild(inputElement);
  inputElement.value = content;
  inputElement.select();
  document.execCommand("copy");

  inputElement.remove();
}
