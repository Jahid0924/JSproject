
const Url = `https://v6.exchangerate-api.com/v6/496485f6d5a3d847414a5dca/latest/USD`;

let dropdownSelect = document.querySelectorAll("select");
let dropoptions = document.querySelector(".usersel option");
let flags = document.querySelectorAll("img");
let btn = document.querySelector("button");
let fromDropdown = document.querySelector("#fromSelect");
let toDropdown = document.querySelector("#toSelect");
let result = document.querySelector(".output");

for (let select of dropdownSelect) {
  for (currencycode in countryList) {
    let options = `<option value="${currencycode}">${currencycode}</option>`;
    dropdownSelect[0].firstElementChild.insertAdjacentHTML("afterend", options);
    dropdownSelect[1].firstElementChild.insertAdjacentHTML("afterend", options);
    console.log(dropdownSelect[0].value);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateFlag = (element) => {
  let currencycode = element.value;
  let countryCode = countryList[currencycode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

dropdownSelect[0].value = "USD";
dropdownSelect[1].value = "INR";

function CurrencyConverter() {
  let Amount = document.querySelector(".Amount").value;
  let fromCurr = fromDropdown.value;
  let toCurr = toDropdown.value;

  if (Amount.length != 0) {
    console.log("ok.");
    fetch(Url)
      .then((responce) => responce.json())
      .then((data) => {
        let fromExchange = data.conversion_rates[fromCurr];
        let toExchange = data.conversion_rates[toCurr];
        const convertAmount = (Amount / fromExchange) * toExchange;
        result.innerHTML = `${Amount} ${fromCurr} = ${convertAmount.toFixed(
          2
        )} ${toCurr}`;
      });
  } else {
    alert("Please Enter Amount");
  }
  console.log(Amount);
}

btn.addEventListener("click", CurrencyConverter);
