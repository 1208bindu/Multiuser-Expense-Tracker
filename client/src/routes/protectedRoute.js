/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

function ProtectedRoute(props) {
  const Component = props.component;
  const { isTokenValid } = useContext(GlobalContext);

  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    isTokenValid(token);
  }, [token]);

  return token ? <Component /> : <Redirect to={{ pathname: "/login" }} />;
}

export default ProtectedRoute;
