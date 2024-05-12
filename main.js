const mainForm = document.forms[0];

const number1 = mainForm.elements["number1"];
const number2 = mainForm.elements["number2"];

const result = document.querySelector(".result");
const fetchBtn = document.querySelector(".fetch-btn");

if (window.Worker) {
  const mainWorker = new Worker("worker.js");
  const fetchWorker = new Worker("fetch-worker.js");

  [number1, number2].forEach((input) => {
    input.onchange = function () {
      mainWorker.postMessage([number1.value, number2.value]);
      console.log("Message posted to main worker");
    };
  });

  mainWorker.onmessage = function (e) {
    result.textContent = e.data;
    console.log("Message received from main worker");
  };

  fetchBtn.addEventListener(
    "click",
    (e) => {
      fetchWorker.postMessage("Start fetching....");
      e.target.disabled = true;
    },
    { once: true }
  );

  fetchWorker.onmessage = function (e) {
    if (!Array.isArray(e.data)) {
      return;
    }

    const ulElement = document.createElement("ul");

    e.data.forEach((item) => {
      const liElement = document.createElement("li");
      liElement.innerText = item.title;
      ulElement.append(liElement);
    });

    document.body.append(ulElement);
    console.log("Message received from fetch worker", e.data);
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
