import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AppLoader from "./Components/AppLoader/AppLoader.js";
import "./App.css";
import Header from "./Components/Header";
import "./css/Header.css";
import "./css/Footer.css";
import "./css/Common.css";
import ApplicationRoutes from "./routes";
import axios from "axios";
import { baseUrl, client_id, secret} from './utils/index.js'


const qs = require("qs");

function App() {
  let location = useLocation();
  let [loadApp, setLoadApp] = useState(false);
  let state = useSelector((state) => state.ProductListReducer);
  let loginState = useSelector((state) => state.LoginReducer);
  let [itemCount, setItemCount] = useState();

  const requestClientCredentialsAccessToken = () => {
    axios({
      method: "post",
      url: baseUrl,
      data: qs.stringify({
        client_id: client_id,
        client_secret: secret,
        grant_type: "client_credentials",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      localStorage.setItem("token", res.data.access_token);
      setLoadApp(true);
    });
  };

  useEffect(() => {
    requestClientCredentialsAccessToken();
  }, []);

  useEffect(() => {
    if(state.cartItems) {
      setItemCount(state.cartItems)
    }
  }, [state.cartItems, loginState.userLoginSuccess])

  return (
    <>
      {loadApp ? (
        <>
          {location.pathname === "/register" || location.pathname === "/reset-password" ? (
            ""
          ) : (
             <Header cartItems={itemCount}></Header>
          )}
          <ApplicationRoutes />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppLoader
            height="100vh"
            left="300"
            width="80"
            radius="9"
            color="#b86097"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}
    </>
  )
}

export default App;