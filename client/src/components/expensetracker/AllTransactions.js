import React, { useContext, useState, useEffect } from "react";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";
import TransactionDetails from "./TransactionDetails";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const TransactionList = () => {
  const { transaction, length, getTransaction } = useContext(
    GlobalContextExpenses
  );
  const { currentUser } = useContext(GlobalContext);
  console.log(length);

  const [pNum, setPNum] = useState(1);
  var rlength = length - pNum * 5;

  useEffect(() => {
    getTransaction(currentUser.id, pNum);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  const showMore = () => {
    getTransaction(currentUser.id, pNum + 1);
    setPNum(pNum + 1);
    rlength = length - pNum * 5;
  };

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
      {rlength > 0 ? (
        <p className="center" style={{ cursor: "pointer" }} onClick={showMore}>
          <b>
            View More &nbsp; <i className="fa fa-sort-desc fa-2x"></i>
          </b>
        </p>
      ) : null}
    </div>
  );
};
export default TransactionList;
