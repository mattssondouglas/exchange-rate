// Getting variables from document
const currencyElementOne = document.getElementById("currency-one");
const amountElementOne = document.getElementById("amount-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates + updates DOM
const calculate = () => {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/77d443bbd8f0aa21d281d1d2/latest/${currencyOne}`
  )
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currencyTwo];
      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
};

// Event listeners
currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

calculate();
