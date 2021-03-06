import React, { useContext, useState, useEffect } from "react";
import TransactionDetails from "./TransactionDetails";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";

import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

const TransactionLists = (props) => {
  const { transaction, length, getTransaction } = useContext(
    GlobalContextExpenses
  );
  const { currentUser } = useContext(GlobalContext);
  console.log(length);

  const [pNum, setPNum] = useState(props.match.params.pNum);

  var rlength = length - pNum * 5;

  useEffect(() => {
    getTransaction(currentUser.id, pNum);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  return (
    <div>
      <ul className="list">
        {transaction
          ? transaction.map((trans) => (
              <TransactionDetails key={trans._id} trans={trans} />
            ))
          : null}
      </ul>
      {rlength > 0 ? (
        <p className="center">
          <Link to={"/transactionList/" + (pNum + 1)}>
            <b>View More</b>
          </Link>
        </p>
      ) : null}
    </div>
  );
};

export default TransactionLists;
