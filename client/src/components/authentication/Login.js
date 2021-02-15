import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from "react-router-dom";
import loginImage from "../../images/login.jpg";
import loginMobile from "../../images/login-mobile.jpg";
import loginText from "../../images/logintext.jpg";

const Login = () => {
  const { userLogin, error, isauthenticated } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(error);

  const history = useHistory();
  console.log(isauthenticated);

  useEffect(() => {
    if (isauthenticated) {
      history.push("/");
    }

    if (error === "resend") {
      document.getElementById("form1").style.display = "none";
      document.getElementById("reconfirm").style.display = "block";
    }

    if (error) {
      console.log(error);
      setErr(error);
    }

    // eslint-disable-next-line
  }, [error, isauthenticated, history]);

  function clearError(e) {
    document.getElementById("error").style.display = "none";
    setEmail("");
    setPwd("");
    setErr("");
  }
  const newLogin = {
    email: email.toLowerCase(),
    password: pwd,
  };

  function onsub(e) {
    e.preventDefault();
    userLogin(newLogin);
  }

  return (
    <div className="container loginPage">
      <div
        id="reconfirm"
        className="col l8 offset-l2 center "
        style={{ display: "none" }}
      >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <h5>
              <i>
                Email-id already registered but not confirmed, Kindly confirm
                your email-id.
                <br />
                <br />
                Confirmation email resent.
              </i>
            </h5>
          </div>
        </div>
      </div>
      <div className="row " id="form1">
        <div className="card center col l5 m5 hide-on-small-only">
          <img src={loginImage} alt="LoginPage" />
        </div>

        <div className="col s10 offset-s1 l5 m5 offset-m2 offset-l1">
          <img
            src={loginMobile}
            alt="LoginPage"
            className="card hide-on-med-and-up responsive-img"
          />
          <div>
            <form onSubmit={onsub} className="white">
              <img
                src={loginText}
                alt="LoginPage"
                className="card hide-on-small-only responsive-img"
              />
              <div className="card margins">
                <div>
                  {err ? (
                    <div id="error" className="alert-p">
                      <span>{err}</span>
                      <button onClick={clearError}>X</button>
                    </div>
                  ) : null}
                </div>
                <div className="input-field">
                  <label htmlFor="emailCurrent">E-Mail</label>
                  <input
                    type="email"
                    id="mail-alert"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p id="demo" className="alert-p"></p>
                </div>
                <div className="input-field">
                  <label htmlFor="pwdCurrent">Password</label>
                  <input
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  <p id="demo1" className="alert-p"></p>
                </div>

                <div className="input-field center">
                  <button className="btn btnLogin navColor z-depth-0">
                    Login
                  </button>
                </div>
                <span className="center">
                  <p>
                    <Link className="textColor" to="/forgotpwd">
                      Forgot Password?
                    </Link>
                  </p>
                </span>
              </div>
            </form>
          </div>
          <div className="card ">
            <br />
            <span className="center">
              <h6 className="black-text">
                Don't Have an account...{" "}
                <Link to="/register">
                  <b className="textColor"> Register </b>
                </Link>
              </h6>
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
