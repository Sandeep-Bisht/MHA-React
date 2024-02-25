import React, { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import * as GET_CART_ACTIONS from "../../pages/home/action";
import * as CART_ITEM_ACTIONS from "../../pages/cart/action"
import "../../css/success.css";
import { useDispatch, useSelector } from "react-redux";

function Success() {

  let dispatch = useDispatch()
  let getUserCartState = useSelector((state) => state.ProductListReducer);
  let cartDetailsSuccess = useSelector((state) => state.CartDetailsReducer)
  useEffect(() => {
    if (localStorage.getItem("cartId") && localStorage.getItem("cartItems")) {
      localStorage.removeItem("cartId");
      localStorage.removeItem("cartItems");
      if (localStorage.getItem("userInfo")) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
         userInfo.openOrderId = "0";
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      window.location.reload();
    }
  }, []);

  

  

  return (
    <>
      <div className="order-success-page">
        <div className="container m-auto">
          <div className="row mt-0">
            <div className="col-8 mx-auto">
              <div className="order-success-card">
                <div className="success-heading">
                  <h1>Your order has been placed successfully</h1>
                </div>
                <div className="success-svg">
                  <TiTick />
                </div>
                <div className="success-thank-you">
                  <h2>Thank you for your purchase !</h2>
                </div>
                <div className="success-email-confirm-msg">
                  <p>
                    You will receive an order confirmation email with details of
                    your order.
                  </p>
                </div>
                <button className="success-home-btn" type="button">
                  <Link to="/">Continue Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
