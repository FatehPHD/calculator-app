// --- State ---------------------------------------------------------------
const display = document.getElementById("display");

let current = "0";      // the number being typed
let previous = null;    // the number stored before an operator was pressed
let operator = null;    // "+", "-", "*" or "/"
let startNewNumber = false;

// --- Helpers -------------------------------------------------------------
function updateDisplay() {
  display.textContent = current;
}

function calculate(a, op, b) {
  const x = parseFloat(a);
  const y = parseFloat(b);

  if (op === "+") return x + y;
  if (op === "-") return x - y;
  if (op === "*") return x * y;
  if (op === "/") return y === 0 ? "Error" : x / y;
  return y;
}

function formatResult(value) {
  if (value === "Error") return value;
  // avoid long floating point tails like 0.30000000000000004
  return String(parseFloat(value.toFixed(10)));
}

// --- Actions -------------------------------------------------------------
function inputDigit(digit) {
  if (current === "Error" || startNewNumber) {
    current = digit;
    startNewNumber = false;
  } else {
    current = current === "0" ? digit : current + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (current === "Error" || startNewNumber) {
    current = "0.";
    startNewNumber = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (current === "Error") return;

  // chain calculations: 2 + 3 + 4
  if (operator && !startNewNumber) {
    const result = calculate(previous, operator, current);
    current = formatResult(result);
    updateDisplay();
    if (current === "Error") {
      previous = null;
      operator = null;
      return;
    }
  }

  previous = current;
  operator = op;
  startNewNumber = true;
}

function equals() {
  if (!operator || previous === null || current === "Error") return;

  const result = calculate(previous, operator, current);
  current = formatResult(result);
  previous = null;
  operator = null;
  startNewNumber = true;
  updateDisplay();
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  startNewNumber = false;
  updateDisplay();
}

function backspace() {
  if (current === "Error" || startNewNumber) return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
  updateDisplay();
}

// --- Mouse / touch input -------------------------------------------------
document.querySelector(".buttons").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === "digit") inputDigit(value);
  else if (action === "decimal") inputDecimal();
  else if (action === "operator") chooseOperator(value);
  else if (action === "equals") equals();
  else if (action === "clear") clearAll();
  else if (action === "backspace") backspace();
});

// --- Keyboard input ------------------------------------------------------
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") inputDigit(key);
  else if (key === ".") inputDecimal();
  else if (["+", "-", "*", "/"].includes(key)) chooseOperator(key);
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    equals();
  } else if (key === "Backspace") backspace();
  else if (key === "Escape" || key.toLowerCase() === "c") clearAll();
});

updateDisplay();
