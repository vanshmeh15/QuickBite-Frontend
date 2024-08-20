import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

export default function LoginPopUp({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const resposnse = await axios.post(newUrl, data);

    if (resposnse.data.success) {
      setToken(resposnse.data.token)
      localStorage.setItem("token",resposnse.data.token)
      setShowLogin(false)
    }
    else{
      alert(resposnse.data.message)
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              required
              id="username"
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
            id="email"
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
            id="password"
          />
        </div>
        <button type="submit">
          {currState === "sigup" ? "Create account" : "login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" required id="" />
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("signup")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrState("login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}
