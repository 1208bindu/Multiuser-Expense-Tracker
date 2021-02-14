import React, { useContext, useEffect } from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { GlobalContext } from "../../context/GlobalState";

function Navbar() {
  const { isTokenValid } = useContext(GlobalContext);

  let token = localStorage.getItem("auth-token");
  console.log(token);
  useEffect(() => {
    isTokenValid(token);
  }, []);

  return <div>{token ? <SignedInLinks /> : <SignedOutLinks />}</div>;
}
export default Navbar;
