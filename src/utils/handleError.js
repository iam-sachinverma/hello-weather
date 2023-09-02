import { endLoadingState } from "./setLoadingState.js";

export const handleError = async (error, event) => {
  const body = document.querySelector("body");

  const alert = document.createElement("div");
  const alertIcon = document.createElement("div");
  const alertMessage = document.createElement("div");
  const alertButton = document.createElement("div");

  alert.classList.add("alert");

  alertIcon.classList.add("alert-icon");

  alertMessage.classList.add("alert-message");
  const messageTextNode = document.createTextNode(error);
  alertMessage.appendChild(messageTextNode);

  alertButton.classList.add("alert-button");
  const buttonTextNode = document.createTextNode(event);
  alertButton.appendChild(buttonTextNode);

  alert.appendChild(alertIcon);
  alert.appendChild(alertMessage);
  alert.appendChild(alertButton);

  body.insertBefore(alert, body.children[1]);

  endLoadingState();

  if (event === "Refresh Page") {
    alertButton.addEventListener("click", () => {
      // location.reload();
      console.log("hi");
    });
  } else {
    alertButton.addEventListener("click", () => {
      const searchBoxInput = document.querySelector(".search-box-input");
      searchBoxInput.value = "";
      searchBoxInput.focus();

      alert.remove();
    });
  }
};
