console.log("client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageTwo.textContent = "Loading";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.textContent = data.error;
          console.log(data.error);
        } else {
          messageTwo.textContent = `Summary: ${data.description}, with a temperature of ${data.temperature} degrees, precipitation chances of ${data.precipitation}% in ${data.location} with a wind speed of ${data.wind_speed} km/h.`;
          console.log(data);
        }
      });
    }
  );
});
