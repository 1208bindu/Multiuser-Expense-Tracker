import React, { useContext, useEffect } from "react";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";
import TransactionDetails from "./TransactionDetails";
import { GlobalContext } from "../../context/GlobalState";

const TransactionList = () => {
  const { transaction, getTransaction } = useContext(GlobalContextExpenses);
  const { currentUser } = useContext(GlobalContext);
  console.log(currentUser);

  useEffect(() => {
    console.log("ffff" + currentUser.id);
    getTransaction(currentUser.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  return (
    <div>
      <h5>History</h5>
      <ul className="list">
        {transaction
          ? transaction.map((trans) => (
              <TransactionDetails key={trans._id} trans={trans} />
            ))
          : null}
      </ul>
    </div>
  );
};
export default TransactionList;
