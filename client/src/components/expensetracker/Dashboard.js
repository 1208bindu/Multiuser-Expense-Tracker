import React from "react";
import Header from "./Header";
import Balance from "./Balance";
import IncomeExpenses from "./IncomeExpenses";
import NewTransaction from "./NewTransaction";
import TransactionList from "./TransactionList";
import "../../css/ExpensesCss.css";
import Navbar from "../layout/Navbar";

const Dashboard = (props) => {
  //const history = useHistory();
  return (
    <div>
      <Navbar />{" "}
      <div className="container main-div">
        <div className="col s10 m8 l8">
          <Header />
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <NewTransaction />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
