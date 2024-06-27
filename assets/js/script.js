const userCash = document.getElementById("cash"); 
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const outputDiv = document.getElementById("output-div");

let currentInput = '';
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];


const updateOutputDiv = (content, bgColor = "black", textColor = "white") => {
  outputDiv.innerHTML = content;
  outputDiv.style.backgroundColor = bgColor;
  outputDiv.style.color = textColor;


const handleBtnClick = (btnVal) => {
  if (btnVal === '.') {
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
  } else if (btnVal === '✘') {
    currentInput = '';
  } else if (btnVal === '✔') {
    price = parseFloat(currentInput);
    updateOutputDiv(`<p>Total Price: $${price.toFixed(2)}</p>`);
    currentInput = '';
  } else {
    currentInput += btnVal;
  }

   if (btnVal !== '✔') {
    if (currentInput === '') {
      updateOutputDiv(`<p>0.00</p>`);
    } else if (currentInput === '.') {
      updateOutputDiv(`<p>0.${currentInput}</p>`);
    } else {
      updateOutputDiv(`<p>${parseFloat(currentInput).toFixed(2)}</p>`);
    }
  }
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    handleBtnClick(e.target.textContent);
  });
});


const checkPrice = () => {
  const cashVal = Number(userCash.value);

  if (isNaN(cashVal) || cashVal <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  if (cashVal <= price) {
    alert("Customer does not have enough money to purchase the item");
  } 
  else if (cashVal === price) {
    updateOutputDiv("No change due - customer paid with exact cash");
  } else {
    const change = cashVal - price;
    updateOutputDiv(`Change due: $${change.toFixed(2)}`);
  }
};


purchaseBtn.addEventListener('click', checkPrice);