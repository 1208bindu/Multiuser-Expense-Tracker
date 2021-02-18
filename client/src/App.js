import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChangePassword from "./components/authentication/ChangePassword";
import ForgotPwd from "./components/authentication/ForgotPwd";
import Dashboard from "./components/expensetracker/Dashboard";
import ProtectedRoute from "./routes/protectedRoute";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import TransactionList from "./components/expensetracker/TransactionList";
import ConfirmEmailId from "./components/authentication/ConfirmEmail";
import { GlobalProvider } from "./context/GlobalState";
import { GlobalProviderExpenses } from "./expenseContext/GlobalStateExpenses";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <GlobalProviderExpenses>
        <BrowserRouter>
          <div>
            <Switch>
              <ProtectedRoute
                exact={true}
                path="/"
                component={Dashboard}
              ></ProtectedRoute>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route
                exact
                path="/confirm/:id"
                component={ConfirmEmailId}
              ></Route>
              <Route
                exact
                path="/changePassword/:id"
                component={ChangePassword}
              ></Route>
              <Route exact path="/forgotpwd" component={ForgotPwd}></Route>
              <Route
                exact
                path="/transactionList/:pNum"
                component={TransactionList}
              ></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </GlobalProviderExpenses>
    </GlobalProvider>
  );
}

export default App;
