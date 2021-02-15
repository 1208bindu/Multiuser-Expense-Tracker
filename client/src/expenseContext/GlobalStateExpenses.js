import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducerExpenses";
import axios from "axios";

const initialState = {
  transaction: [],
  error: null,
  isLoading: true,
};

export const GlobalContextExpenses = createContext(initialState);

export const GlobalProviderExpenses = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransaction(id) {
    console.log("id" + id);
    try {
      const config = {
        headers: {
          accept: "application/json",
        },
        data: {},
      };
      const id1 = { userId: id };
      const res = await axios.post(
        "/api/v1/transaction/getDetails",
        id1,
        config
      );
      console.log("res" + res);
      dispatch({
        type: "GET_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      console.log("Err" + err.response);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transaction/${id}`);
      dispatch({
        type: "DELETE_RECORD",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    console.log(transaction);
    const config = {
      //     headers:{
      //         'content/type':'application/json'
      //     }
      // }
      headers: {
        accept: "application/json",
      },
      data: {},
    };

    const res = await axios.post("/api/v1/transaction", transaction, config);
    console.log(res);
    try {
      dispatch({
        type: "ADD_RECORD",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  return (
    <GlobalContextExpenses.Provider
      value={{
        transaction: state.transaction,
        error: state.error,
        isLoading: state.isLoading,
        getTransaction,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContextExpenses.Provider>
  );
};
