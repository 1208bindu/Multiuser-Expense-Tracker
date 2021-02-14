import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Login from "../authentication/Login";

const ConfirmEmailId = (props) => {
  const { confirmationEmail } = useContext(GlobalContext);

  useEffect(() => {
    console.log("params" + props.match.params.id);
    confirmationEmail(props.match.params.id);
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
};

export default ConfirmEmailId;
