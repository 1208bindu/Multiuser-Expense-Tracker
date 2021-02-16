import React, { useContext } from "react";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";

const Balance = () => {
  const { transaction } = useContext(GlobalContextExpenses);
  let income = 0;
  let expense = 0;
  let total = 0;

  if (transaction) {
    transaction.map((trans) =>
      trans.amount > 0 ? (income += trans.amount) : (expense += trans.amount)
    );
  }
  total = income - Math.abs(expense);
  // if (total >= 0) {
  //   document.getElementsByClassName("balance").style.color = "green";
  // } else {
  //   document.getElementsByClassName("balance").style.color = "red";
  // }

  return (
    <div className="card center navColor white-text text-darken-2">
      <h4>
        Your Balance - <span> {total}.00 NOK</span>
      </h4>
    </div>
  );
};

export default Balance;
