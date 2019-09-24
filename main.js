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


const renderExpenses = (array) => {
  for (expense in array){
    const tr = document.createElement("tr");
    // console.log(array[expense]);
    tr.innerHTML = `
    <td> ${array[expense].expenseName}  </td>
    <td> ${array[expense].priority}  </td>
    <td> ${array[expense].fundAllocated}  </td>
    `
    console.log(tr);

    table.append(tr);
    console.log(array[expense]);
  }



}



// variables
const table = document.getElementById('table');
const addExpenseForm = document.querySelector("#expenseform");
const addBudgetForm = document.querySelector("#budgetform");
let userBudget = document.querySelector("#userbudget").value;
const budgetTotal = document.querySelector("span#budgettotal"),
  budgetLeft = document.querySelector("span#left"),
  expenseTotal = document.querySelector("span#expensetotal");
let totalBudget = 0;

html = new HTML();
let budget;

const expenseArray = [];
const calculateBtn = document.getElementById('calculate');



// event Listeners
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", function() {});



  //   when user adds budget
  addBudgetForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (userbudget.value === 0 || userBudget.value === "" || userBudget.value === null) {
      //   alert("enter value budget");
    } else {
      // console.log(userbudget.value)

      // instantiate new budget
      const budgetValue = parseInt(userbudget.value);
      budget = new Budget(budgetValue);
      totalBudget = budgetValue;

      //  instantiate html class
      // html.insertBudget(budget.budget);
      // console.log(budget);

    }
  });


  // TO calculate Budget;
const calculateBudget = async () => {
    let totalPriority = 0;
    let totalInversePriority = 0;

    await expenseArray.map((expense) => {
      totalPriority = eval(parseInt(totalPriority) + parseInt(expense.priority));
    });

    await expenseArray.map((expense) => {
      expense.inversePriority = eval(parseInt(totalPriority) - expense.priority);
    });

    await expenseArray.map((expense) => {
      totalInversePriority = eval(parseInt(totalInversePriority) +  parseInt(expense.inversePriority));
    })
    console.log(totalInversePriority);
    await expenseArray.map((expense) => {
      const {inversePriority} = expense;
      // console.log(inversePriority, totalPriority);
      expense.fundAllocated = Math.floor(eval((parseInt(inversePriority) / parseInt(totalInversePriority) ) * parseInt(totalBudget)));
    })
    // console.log(expenseArray);

     renderExpenses(expenseArray);
  return expenseArray;
}





calculateBtn.addEventListener('click', calculateBudget);

  //   when user add new expense
  addExpenseForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const expenseName = document.querySelector("#expensename").value;
    const priorities = document.querySelector("#priorities");
    let priority = priorities.options[priorities.selectedIndex].value;
    // console.log(expenseName);
    // console.log(priority);

    const newExpense = {expenseName, priority }
    expenseArray.push(newExpense);


    if (expenseName === "") {
      html.printMessage("fill Empty Fields", "alert-danger");
    } else {
      //Do nothing yet
      console.log(`Added ${expenseName} to expenses`);
      // html.addExpenseToList(expenseName, priority);
    }
  });
}


console.log('O ti live')
