import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";

const ForgotPwd = (props) => {
  const { forgotPwd, error, findEmail } = useContext(GlobalContext);

  let [email, setEmail] = useState("");
  let [err, setError] = useState(error);

  useEffect(() => {
    console.log("findemail" + findEmail);
    if (findEmail && !err) {
      document.getElementById("form1").style.display = "none";
      document.getElementById("confirm").style.display = "block";
    }

    if (error) {
      setError(error);
    }

    // eslint-disable-next-line
  }, [error, findEmail]);

  function clearError(e) {
    document.getElementById("error").style.display = "none";
    setEmail("");
    setError("");
  }

  function onsub(e) {
    e.preventDefault();
    forgotPwd(email.toLowerCase());
  }

  return (
    <div className="container loginPage">
      <div
        id="confirm"
        className="col l8 offset-l2 center "
        style={{ display: "none" }}
      >
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5>
              <i>
                An e-mail has been sent to your registered email-id.
                <br /> Click the link sent on your email id to change Password.{" "}
              </i>
            </h5>
          </div>
        </div>
      </div>

      <div id="form1">
        <div className="card margins ">
          <form id="form" onSubmit={onsub} className="white">
            <h5 className="grey-text text-darken-3">
              Provide your registered Email-id
              <br />
              <br />
            </h5>
            <div>
              {err ? (
                <div id="error" className="alert-p">
                  <span>{err} </span>
                  <button onClick={clearError}>X</button>
                </div>
              ) : null}
            </div>

            <div className="input-field">
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field center">
              <button className="btn navColor z-depth-0">Confirm E-mail</button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
