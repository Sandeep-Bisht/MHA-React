import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GetHeaders, apiBaseUrl, groupId } from "../../utils";
import * as ACTIONS from "./action";
import Footer from "../../Components/Footer/Footer";
import "../../css/home.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import NewHomePage from "../NewHomePage";
import { requestClientCredentialsAccessToken } from "../../utils/index.js";

let ProductPage = () => {
  let [productList, setProductList] = useState([]);
  let [newArrivalList, setNewArrivalList] = useState([]);

  let [pageSize] = useState(10);
  let state = useSelector((state) => state.ProductListReducer);
  let dispatch = useDispatch();
  let payload = 43114; //group id for structured
  let [categoryContent, setCategoryContent] = useState();

  useEffect(() => {
    let button = document.querySelector(".back-to-top-icon");
    let body = document.querySelector("body");
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 30) {
        button.classList.remove("d-none");
        body.classList.remove("hidden-scrollbar");
      } else {
        button.classList.add("d-none");
        body.classList.add("hidden-scrollbar");
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ========================Get Structured Content API========================
  useEffect(() => {
    dispatch(ACTIONS.getStructuredContent(payload));
  }, []);

  // ========================Success Response of Get Structured Content API========================
  useEffect(() => {
    if (
      state &&
      state.getStructuredContentSuccess &&
      state.getStructuredContentSuccess.items
    ) {
      setCategoryContent(state.getStructuredContentSuccess.items);
    }
  }, [state.getStructuredContentSuccess]);

  // ========================Failure Response of Get Structured Content API========================
  useEffect(() => {
    if (state && state.getStructuredContentFailure) {
      requestClientCredentialsAccessToken();
    }
  }, [state.getStructuredContentFailure]);

  // =============================Get All Product List =====================================
  useEffect(() => {
    if (sessionStorage.getItem("featureProductList")) {
      setProductList(JSON.parse(sessionStorage.getItem("featureProductList")));
    } else {
      dispatch(ACTIONS.getProductList());
    }
    dispatch(ACTIONS.getNewArrivalsProduct(pageSize));
    if (localStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(ACTIONS.getUserCartId(parseInt(userInfo.accountId)));
    }
  }, []);

  // =============== Success Response of New Arrivall =================================
  useEffect(() => {
    if (
      state.newArrivalsProductSuccess &&
      state.newArrivalsProductSuccess !== newArrivalList
    ) {
      if (
        state.newArrivalsProductSuccess.Product_Data &&
        state.newArrivalsProductSuccess.Product_Data.products.length > 0
      ) {
        getNewArrivalProductPriceByProductId(
          state.newArrivalsProductSuccess.Product_Data.products
        );
      }
    }
  }, [state.newArrivalsProductSuccess]);

  let getNewArrivalProductPriceByProductId = async (product) => {
    for (let i = 0; i < product.length; i++) {
      let url = `${apiBaseUrl}products/${product[i].productId}/skus`;
      let productPriceResponse = await axios.get(url, GetHeaders());
      product[i]["price"] = productPriceResponse.data.items[0].price.promoPrice
        ? productPriceResponse.data.items[0].price.promoPrice
        : productPriceResponse.data.items[0].price.price;
      product[i]["skuId"] = productPriceResponse.data.items[0].id;
    }
    setNewArrivalList(product);
  };

  // =============== Success Response of Prodcut List ===================================
  useEffect(() => {
    if (
      state.productListSuccess &&
      state.productListSuccess.items !== productList
    ) {
      if (state.productListSuccess.items.length > 0) {
        getProductPriceByProductId(state.productListSuccess.items);
      }
    }
  }, [state.productListSuccess]);

  let getProductPriceByProductId = async (product) => {
    for (let i = 0; i < product.length; i++) {
      let url = `${apiBaseUrl}products/${product[i].productId}/skus`;
      let productPriceResponse = await axios.get(url, GetHeaders());
      product[i]["price"] = productPriceResponse.data.items[0].price.price;
      product[i]["skuId"] = productPriceResponse.data.items[0].id;
    }
    setProductList(product);
    sessionStorage.setItem("featureProductList", JSON.stringify(product));
  };

  return (
    <>
      <NewHomePage
        productList={newArrivalList}
        categoryContent={categoryContent}
      />
      <Footer />
    </>
  );
};

export default ProductPage;
