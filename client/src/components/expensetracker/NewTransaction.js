/* eslint-disable no-redeclare */
import React, { useState, useContext, useEffect } from "react";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";
import { GlobalContext } from "../../context/GlobalState";
import "../../css/ExpensesCss.css";

const NewTransaction = () => {
  const { addTransaction, getTransaction } = useContext(GlobalContextExpenses);
  const { currentUser } = useContext(GlobalContext);

  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("income");
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    if (addSuccess) getTransaction(currentUser.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id, addSuccess]);

  const onSub = (e) => {
    e.preventDefault();
    if (category === "expenses") {
      var newDetails = {
        details: details,
        amount: amount * -1,
        userId: currentUser.id,
        category: category,
      };
    } else {
      var newDetails = {
        details: details,
        amount: amount,
        userId: currentUser.id,
        category: category,
      };
    }

    addTransaction(newDetails);
    setAddSuccess(true);
    setAmount("");
    setDetails("");
  };

  return (
    <div>
      <h5>Add Transaction</h5>
      <form onSubmit={onSub}>
        <div className="input-field">
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <label htmlFor="details" className="grey-text text-darken-2">
            Add details
          </label>
        </div>
        <div onChange={(e) => setCategory(e.target.value)}>
          <label>
            <input
              name="group1"
              className="with-gap radio-teal"
              type="radio"
              value="income"
            />
            <span>Income</span>
          </label>

          <label className="marginLeft">
            <input
              name="group1"
              className="with-gap radio-teal"
              type="radio"
              value="expenses"
            />
            <span>Expenses</span>
          </label>
        </div>
        <br />
        <div className="input-field">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="amount" className="grey-text text-darken-2">
            Add Amount (Expenses in - and Income in +)
          </label>
        </div>
        <div className="center">
          <button className="btn navColor white-text text-darken-2">
            <b>Add Transaction</b>
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewTransaction;
