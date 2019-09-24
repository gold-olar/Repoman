// classes
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }
}

// html class
class HTML {
  insertBudget(amount) {
    console.log(amount);
    budgetTotal.innerHTML = `${amount}`;
    budgetLeft.innerHTML = `${amount}`;
    expenseTotal.innerHTML = `${amount}`;
  }

  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));

    document
      .querySelector(".primary")
      .insertBefore(messageWrapper, addExpenseForm);

    setTimeout(function() {
      document.querySelector(".primary .alert").remove();
      addExpenseForm.reset();
    }, 3000);
  }

  addExpenseToList(name, priority) {
    const expensesList = document.querySelector("#expenses ul");

    //   create li
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `${name} <span>${priority}</span>`;

    expensesList.appendChild(li);
  }
}

// variables

const addExpenseForm = document.querySelector("#expenseform");
const addBudgetForm = document.querySelector("#budgetform");
let userBudget = document.querySelector("#userbudget").value;
const budgetTotal = document.querySelector("span#budgettotal"),
  budgetLeft = document.querySelector("span#left"),
  expenseTotal = document.querySelector("span#expensetotal");

html = new HTML();

let budget;

// event Listeners
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", function() {});

  //   when user adds budget
  addBudgetForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (userbudget === 0 || userBudget === "" || userBudget === null) {
      //   alert("enter value budget");
    } else {
      // instantiate new budget
      budget = new Budget(userBudget);
      //  instantiate html class
      html.insertBudget(budget.budget);
    }
  });
  //   when user add new expense
  addExpenseForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const expenseName = document.querySelector("#expensename").value;
    const priorities = document.querySelector("#priorities");
    let priority = priorities.options[priorities.selectedIndex].value;
    console.log(expenseName);
    console.log(priority);
    if (expenseName === "") {
      html.printMessage("fill Empty Fields", "alert-danger");
    } else {
      html.addExpenseToList(expenseName, priority);
    }
  });
}
