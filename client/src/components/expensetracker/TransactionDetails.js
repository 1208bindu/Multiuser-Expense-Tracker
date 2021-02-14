import React, { useContext } from "react";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";

const TransactionDetails = ({ trans }) => {
  const { deleteTransaction } = useContext(GlobalContextExpenses);
  const classn =
    trans.amount > 0
      ? "card z-depth-1 li-list-plus"
      : "card z-depth-1 li-list-minus";
  return (
    <li className={classn}>
      <b>
        {trans.details}
        <span className="right">{trans.amount} NOK</span>
      </b>
      <button
        className="delete-btn"
        onClick={() => deleteTransaction(trans._id)}
      >
        X
      </button>
    </li>
  );
};

export default TransactionDetails;
