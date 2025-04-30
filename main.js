const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

let current = "";
let previous = "";
let operator = "";
let justCalculated = false;

const updateDisplay = () => (display.textContent = current || "0");

const clearAll = () => {
  current = "";
  previous = "";
  operator = "";
  justCalculated = false;
};

const toggleSign = () => {
  if (!current || current === "0") return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
};

const percent = () => {
  if (current) current = String(parseFloat(current) / 100);
};

const setOperator = (op) => {
  if (current) {
    if (previous && operator && !justCalculated) {
      calculate();
    }
    operator = op;
    previous = current;
    current = "";
    justCalculated = false;
  }
};

const calculate = () => {
  const a = parseFloat(previous);
  const b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) return;

  const result =
    operator === "+"
      ? a + b
      : operator === "-"
      ? a - b
      : operator === "*"
      ? a * b
      : operator === "/"
      ? b === 0
        ? "Error"
        : a / b
      : "";

  current = result.toString();
  previous = current;
  justCalculated = true;
};

const addDot = () => {
  if (!current.includes(".")) current += ".";
};

const backspace = () => {
  current = current.slice(0, -1);
};

const appendNumber = (num) => {
  if (justCalculated) {
    current = num;
    justCalculated = false;
  } else {
    current += num;
  }
};

const actions = {
  AC: clearAll,
  "+/-": toggleSign,
  "%": percent,
  "=": calculate,
  ".": addDot,
};

const handleClick = (val, btn) => {
  if (actions[val]) {
    actions[val]();
  } else if (["+", "-", "*", "/"].includes(val)) {
    setOperator(val);
  } else if (btn.innerHTML.includes("fa-arrow-rotate-left")) {
    backspace();
  } else {
    appendNumber(val);
  }

  updateDisplay();
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent.trim();
    handleClick(val, btn);
  });
});
