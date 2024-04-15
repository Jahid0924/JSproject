const Url = `https://v6.exchangerate-api.com/v6/496485f6d5a3d847414a5dca/latest/USD`;

let dropdownSelect = document.querySelectorAll("select");
let dropoptions = document.querySelector(".usersel option");
let flags = document.querySelectorAll("img");
let btn = document.querySelector("#getresult");
let fromDropdown = document.querySelector("#fromSelect");
let toDropdown = document.querySelector("#toSelect");
let result = document.querySelector(".output");
let mode = document.querySelector(".changeMode");
let fromInput = document.querySelector(".From");
let toInput = document.querySelector(".To");
let userBox1 = document.querySelector(".mergesel1");
let userBox2 = document.querySelector(".mergesel2");

for (let select of dropdownSelect) {
  for (currencycode in countryList) {
    let options = `<option value="${currencycode}">${currencycode}</option>`;
    dropdownSelect[0].firstElementChild.insertAdjacentHTML("afterend", options);
    dropdownSelect[1].firstElementChild.insertAdjacentHTML("afterend", options);
    // console.log(dropdownSelect[0].value);
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

mode.addEventListener("click", (e) => {
  console.log(e);
  var changeEvent = e.type;
  console.log(changeEvent)
  // result.innerHTML = "";
  userBox1.classList.add("hide");
  userBox1.classList.remove("mergesel1")
  userBox2.classList.add("hide");
  fromInput.classList.remove("hide");
  toInput.classList.remove("hide");
  console.log(userBox1.className);
});
console.log(userBox1.className);
function CurrencyConverter(event) {
  let Amount = document.querySelector(".Amount").value;
  let fromCurr = fromDropdown.value;
  let toCurr = toDropdown.value;
  let fromInputval = fromInput.value.toUpperCase();
  let toInputval = toInput.value.toUpperCase();

  if (Amount.length != 0 && event.type === "click" && userBox1.className === "mergesel1") {
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
  } else if (fromInputval.length == 3 && toInputval.length == 3 && Amount.length != 0) {
    alert("Input box.");
    fetch(Url)
      .then((res) => res.json())
      .then((data) => {
        let fromInputexchange = data.conversion_rates[fromInputval];
        let toInputexchange = data.conversion_rates[toInputval];
        const convertInputAmount =
          (Amount / fromInputexchange) * toInputexchange;
        console.log(convertInputAmount);
        result.innerHTML = `${Amount} ${fromInputval} = ${convertInputAmount.toFixed(
          2
        )} ${toInputval}`;
      });
  } else {
    alert("Please Enter Amount");
  }
  console.log(fromInputval, toInputval);
    console.log(fromInputval.length);
  console.log(Amount);
  console.log(result.innerHTML);
}

btn.addEventListener("click", CurrencyConverter);
