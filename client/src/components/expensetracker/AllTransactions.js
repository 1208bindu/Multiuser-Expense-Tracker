import React, { useContext, useState, useEffect } from "react";
import { GlobalContextExpenses } from "../../expenseContext/GlobalStateExpenses";
import TransactionDetails from "./TransactionDetails";

import { GlobalContext } from "../../context/GlobalState";

const TransactionList = () => {
  const { transaction, length, getTransaction, fullList } = useContext(
    GlobalContextExpenses
  );
  const { currentUser } = useContext(GlobalContext);
  console.log(length);
  const ExpenseList = fullList.filter((trans) => trans.category === "expenses");
  const IncomeList = fullList.filter((trans) => trans.category === "income");
  const [pNum, setPNum] = useState(1);
  // const [lengthExpense, setLengthExpense] = useState(ExpenseList.length);
  // const [lengthIncome, setLengthIncome] = useState(IncomeList.length);

  var rlength = length - pNum * 5;

  const [option, setOption] = useState(0);
  console.log("opt" + option);

  useEffect(() => {
    getTransaction(currentUser.id, pNum);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  const showMore = () => {
    getTransaction(currentUser.id, pNum + 1);
    setPNum(pNum + 1);
    rlength = length - pNum * 5;
  };

  // const showMoreExpenses = () => {
  //   elength = lengthExpense - pNum * 5;
  // };

  // const showMoreIncome = () => {
  //   ilength = lengthIncome - pNum * 5;
  // };

  return (
    <div>
      <div className="row">
        <div className="col s3 l2 offset-l2 " onClick={() => setOption(0)}>
          <h6 className="navColor view center ">View History</h6>
        </div>
        <div
          className="col s3 m3 l2 offset-l1 offset-s1"
          onClick={() => setOption(1)}
        >
          <h6 className="navColor center view">View Expenses</h6>
        </div>
        <div
          className="col s3 m3 l2 offset-l1 offset-s1 "
          onClick={() => setOption(2)}
        >
          <h6 className="navColor view center ">View Incomes</h6>
        </div>
      </div>
      {option === 0 ? (
        <div>
          <h4 className="card center">History</h4>
          <ul className="list">
            {transaction
              ? transaction.map((trans) => (
                  <TransactionDetails key={trans._id} trans={trans} />
                ))
              : null}
          </ul>
          {rlength > 0 ? (
            <p
              className="center"
              style={{ cursor: "pointer" }}
              onClick={showMore}
            >
              <b>
                View More &nbsp; <i className="fa fa-sort-desc fa-2x"></i>
              </b>
            </p>
          ) : null}
        </div>
      ) : null}
      {option === 1 ? (
        <div>
          <h4 className="card center">Expense Details</h4>
          <ul className="list">
            {ExpenseList
              ? ExpenseList.map((trans) => (
                  <TransactionDetails key={trans._id} trans={trans} />
                ))
              : null}
          </ul>
          {/* {elength > 0 ? (
            <p
              className="center"
              style={{ cursor: "pointer" }}
              onClick={showMoreExpenses}
            >
              <b>
                View More &nbsp; <i className="fa fa-sort-desc fa-2x"></i>
              </b>
            </p>
          ) : null} */}
        </div>
      ) : null}
      {option === 2 ? (
        <div>
          <h4 className="card center">Income Details</h4>
          <ul className="list">
            {IncomeList
              ? IncomeList.map((trans) => (
                  <TransactionDetails key={trans._id} trans={trans} />
                ))
              : null}
          </ul>
          {/* {ilength > 0 ? (
            <p
              className="center"
              style={{ cursor: "pointer" }}
              onClick={showMoreIncome}
            >
              <b>
                View More &nbsp; <i className="fa fa-sort-desc fa-2x"></i>
              </b>
            </p>
          ) : null} */}
        </div>
      ) : null}
    </div>
  );
};
export default TransactionList;
