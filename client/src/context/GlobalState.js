import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  userDetails: [],
  error: "",
  isLoading: true,
  isauthenticated: false,
  Token: "",
  currentUser: [],
  registrationSuccess: false,
  emailConfirmed: false,
  findEmail: false,
  changeSuccess: false,
};

//const [userData,setUserData]=useState({})

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getUserDetails() {
    try {
      const res = await axios.get("/api/v1/user");

      dispatch({
        type: "GET_USER",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err.response.data.error,
        auth: false,
      });
    }
  }

  async function addUserDetails(user) {
    const config = {
      headers: {
        accept: "application/json",
      },
      data: {},
    };

    try {
      const res = await axios.post("/register", user, config);
      dispatch({
        type: "ADD_USER",
        payload: res.data.data,
        auth: true,
      });
    } catch (err) {
      dispatch({
        type: "ADD_USER_ERROR",
        payload: err.response.data.msg,
        auth: false,
      });
    }
  }

  async function changePwd(newPwd) {
    const config = {
      headers: {
        accept: "application/json",
      },
      data: {},
    };
    try {
      const res = await axios.post("/changePwd", newPwd, config);
      dispatch({
        type: "CHANGE_PWD",
        payload: res.data.data,
        auth: true,
      });
    } catch (err) {
      dispatch({
        type: "CHANGE_PWD_ERROR",
        payload: err.response.data.msg,
        auth: false,
      });
    }
  }

  async function forgotPwd(email) {
    try {
      console.log(email);
      const res = await axios.post(`/fp/${email}`);
      console.log(res);
      dispatch({
        type: "FORGOT_PWD",
        payload: res.data.data,
        auth: true,
      });
    } catch (err) {
      dispatch({
        type: "FORGOT_PWD_ERROR",
        payload: err.response.data.msg,
        auth: false,
      });
    }
  }

  async function confirmationEmail(id) {
    try {
      console.log("tddd" + id);
      const res = await axios.get(`/confirm/${id}`);

      dispatch({
        type: "CONFIRM_EMAIL",
        payload: res.data.data,
        auth: true,
      });
    } catch (err) {
      dispatch({
        type: "CONFIRM_EMAIL_ERROR",
        payload: err.response.data.msg,
        auth: false,
      });
    }
  }

  async function isTokenValid(token) {
    try {
      const tokenRes = await axios.post("/valid", null, {
        headers: { "x-auth-token": token },
      });
      dispatch({
        type: "VALID_TOKEN",
        payload: tokenRes.data.user,
      });
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err.response.data.msg,
        auth: false,
      });
    }
  }
  async function userLogin(loginDetails) {
    try {
      const loginRes = await axios.post("/login", loginDetails);

      localStorage.setItem("auth-token", loginRes.data.token);

      dispatch({
        type: "USER_LOGIN",
        payload: loginRes.data.user,
        tokenload: loginRes.data.token,
        auth: true,
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "USER_ERROR",
        payload: err.response.data.msg,
        auth: false,
      });
    }
  }

  function logout() {
    localStorage.setItem("auth-token", "");
    dispatch({
      type: "USER_LOGOUT",
      auth: false,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        userDetails: state.userDetails,
        error: state.error,
        isLoading: state.isLoading,
        isauthenticated: state.isauthenticated,
        Token: state.Token,
        currentUser: state.currentUser,
        registrationSuccess: state.registrationSuccess,
        emailConfirmed: state.emailConfirmed,
        findEmail: state.findEmail,
        changeSuccess: state.changeSuccess,
        userLogin,
        logout,
        isTokenValid,
        getUserDetails,
        addUserDetails,
        confirmationEmail,
        forgotPwd,
        changePwd,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
