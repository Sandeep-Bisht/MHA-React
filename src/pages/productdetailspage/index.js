import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ReactHTMLConverter } from "react-html-converter/browser";
import * as WISHLIST_ACTION from "../../utils/CommonWishlistService/action";
import * as ADD_TO_CART_ACTION from "../cart/action";
import { apiBaseUrl, appUrl, GetHeaders,channelId, baseImageUrl } from "../../utils";
import * as ACTIONS from "./action";
import * as WISHLIST_ACTIONS from "../../utils/CommonWishlistService/action";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import Loader from "../../Components/loader";
import { errorCheckHandler, groupId } from "../../utils";
import { AiFillHeart } from "react-icons/ai";
import Footer from "../../Components/Footer/Footer";
import LoginPage from "../login";
import "../../css/product-details.css";
import "../../css/cart.css";
import { RiCloseCircleLine } from "react-icons/ri";
import "animate.css";
let allSimilarItems = [];

let ProductDetails = () => {
  let { addToast } = useToasts();
  let navigate = useNavigate();
  let state = useSelector((state) => state.ProductDetailsReducer);
  let wishlistState = useSelector((state) => state.WishlistReducer);
  let loginState = useSelector((state) => state.LoginReducer);
  let getCartState = useSelector((state) => state.CartDetailsReducer);
  // let [showModal, setShowModal] = useState(false);
  let [showLoginModal, setShowLoginModal] = useState(false);

  const converter = new ReactHTMLConverter();
  let [productQuantity] = useState(1);
  let [productDetails, setProductDetails] = useState();
  let [multipleImage, setMultipleImage] = useState([]);
  let [similarProductList, setSimilarProductList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  let [userInfo, setUserInfo] = useState();
  let [userWishlist, setUserWishlist] = useState([]);
  let [loginWishlistSuccess, setLoginWishlistSuccess] = useState(false);
  let [productId, setProductId] = useState(null);
  let [skuId] = useState(null);
  let [markWishlisted, setMarkWishlisted] = useState(false);
  let [wishlistProductPayload, setWishlistProductPayload] = useState({
    accountId: "",
    productId: "",
    userId: "",
    skuId: "",
    groupId: groupId,
  });
  let [indexing, setIndexing] = useState("0");

  let [isWishlisted, setIsWishlisted] = useState(false);
  const param = useParams()

  const [cartItemPayload] = useState({
    accountId: "-1",
    cartItems: [{ productId: "", quantity: "", skuId: "" }],
    currencyCode: "INR",
  });
  const [showMagnifireOnModal, setMagnifireOnModal] = useState(false);
  const [productImageUrl, setProductImageUrl] = useState("");
  let [showCartModal, setShowCartModal] = useState(false);
  let [cartItems, setCartItems] = useState(null);

  let dispatch = useDispatch();
  let location = useLocation();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  //desktop-zoom-inmodal-images//

  const modalResponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // =====================GET USER Wishlist Api ========================================

  useEffect(() => {
    if (userInfo) {
      wishlistProductPayload["userId"] = userInfo.userId;
      dispatch(WISHLIST_ACTION.getUserWishList(wishlistProductPayload));
      
    }
  }, [userInfo, wishlistState.addWishlistSuccess]);

  useEffect(() => {
    if (
      wishlistState.getWishlistSuccess &&
      wishlistState.getWishlistSuccess.wishlist_data &&
      wishlistState.getWishlistSuccess.wishlist_data[0].products
    ) {
      let res = wishlistState.getWishlistSuccess.wishlist_data[0].products;
      setUserWishlist(res);
      for (let items of res) {
        if (productDetails && productDetails.productId > 0) {
          if (items.productId != productDetails.productId) {
            let wishlisted_item = document.getElementById("wishlisted");
            if (wishlisted_item) {
              // check if the element exists
              wishlisted_item.classList.remove("newWishlistedBtn");
            }
          } else {
            setMarkWishlisted(true);
            setIsWishlisted(true)
          }
        }
      }
    }
  }, [wishlistState.getWishlistSuccess, productDetails]);

  let closeModal = () => {
    // setShowModal(false);
    setShowLoginModal(false);
    setLoading(false);
    let body = document.getElementById("body");
    body.classList.remove("position-relative");
    body.classList.remove("random");
  };

  let openLoginModal = () => {
    setShowLoginModal(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loginState.userLoginSuccess) {
      // setShowModal(false);
      setShowLoginModal(false);
      if (
        loginState.userLoginSuccess.login_data &&
        loginState.userLoginSuccess.login_data[0].wishListMessage
      ) {
        setLoginWishlistSuccess(true);
      }
    }
  }, [loginState.userLoginSuccess]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo);
    }
  }, [loginState.userLoginSuccess]);

  useEffect(() => {
    let productId = param.id === null ? localStorage.getItem("similarProductId") : param.id;
    setLoading(true)
    dispatch(ACTIONS.getProductDetails(productId));    
  }, [location]);

  useEffect(() => {
    if (state.getProductMultipleImageSuccess) {
      setMultipleImage(state.getProductMultipleImageSuccess.items);
    }
  }, [state.getProductMultipleImageSuccess]);

  let getProductPriceByProductId = async (productDetilsObj) => {
    let url = `${apiBaseUrl}products/${productDetilsObj.productId}/skus`;
    let productPriceResponse = await axios.get(url, GetHeaders());
    productDetilsObj["stockQuantity"] =
      productPriceResponse.data.items[0].availability.stockQuantity;
    productDetilsObj["allowBackOrder"] =
      productDetilsObj.productConfiguration.allowBackOrder;
    productDetilsObj["purchasable"] =
      productPriceResponse.data.items[0].purchasable;
    productDetilsObj["skuId"] = productPriceResponse.data.items[0].id;
    productDetilsObj["depth"] = productPriceResponse.data.items[0].depth;
    productDetilsObj["weight"] = productPriceResponse.data.items[0].weight;
    productDetilsObj["height"] = productPriceResponse.data.items[0].height;
    productDetilsObj["width"] = productPriceResponse.data.items[0].width;
    productDetilsObj["price"] = productPriceResponse.data.items[0].price
      .promoPrice
      ? productPriceResponse.data.items[0].price.promoPrice
      : productPriceResponse.data.items[0].price.price;
    setProductDetails(productDetilsObj);
    setProductId(productDetilsObj.productId);
  };

  useEffect(() => {
    if (state.productDetailsSuccess && state.productDetailsSuccess.Product_Data && state.productDetailsSuccess.Product_Data.products[0]) {
      setLoading(false)
     dispatch(ACTIONS.getProductMultipleImages(state.productDetailsSuccess.Product_Data.products[0].productId));
    dispatch(ACTIONS.getSimilarProductsList(state.productDetailsSuccess.Product_Data.products[0].productId));
      getProductPriceByProductId(state.productDetailsSuccess.Product_Data.products[0]);
      dispatch(ACTIONS.resetToInitialState());
    }
  }, [state.productDetailsSuccess]);

  useEffect(() => {
    if (state.getSimilarProductsListSuccess) {
      if (
        state.getSimilarProductsListSuccess &&
        state.getSimilarProductsListSuccess.items.length > 0
      ) {
        getSimilarProductsListBYId(state.getSimilarProductsListSuccess.items);
      }
    }
  }, [state.getSimilarProductsListSuccess]);

  let getSimilarProductsListBYId = async (relatedProductList) => {
    for (let i = 0; i < relatedProductList.length; i++) {
      let url = `${apiBaseUrl}products/${relatedProductList[i].productId}`;
      let url1 = `${apiBaseUrl}products/${relatedProductList[i].productId}/skus`;
      let similarProductPriceResponse = await axios.get(url1, GetHeaders());
      const response = await axios.get(url, GetHeaders());
      try {
        response.data["price"] =
          similarProductPriceResponse.data.items[0].price.price;
        response.data["skuId"] = similarProductPriceResponse.data.items[0].id;
        response.data["depth"] =
          similarProductPriceResponse.data.items[0].depth;
        response.data["weight"] =
          similarProductPriceResponse.data.items[0].weight;
        response.data["height"] =
          similarProductPriceResponse.data.items[0].height;
        response.data["width"] =
          similarProductPriceResponse.data.items[0].width;
        allSimilarItems.push(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setSimilarProductList(allSimilarItems);
  };

  let removeCartToast = () => {
    setTimeout(() => {
      setShowCartModal(false);
    }, 3000);
  };

  useEffect(() => {
    if (state.addProductToCartSuccess) {
      if (
        state.addProductToCartSuccess.cartItems &&
        state.addProductToCartSuccess.cartItems.length
      ) {
        if (parseInt(localStorage.getItem("cartItems")) >= 0) {
          localStorage.setItem(
            "cartItems",
            state.addProductToCartSuccess.cartItems.length
          );
          localStorage.setItem("cartId", state.addProductToCartSuccess.id);
        } else {
          localStorage.setItem(
            "cartItems",
            state.addProductToCartSuccess.cartItems.length
          );
          localStorage.setItem("cartId", state.addProductToCartSuccess.id);
        }
      }
      let body = document.getElementById("body");
      body.classList.remove("position-relative");
      body.classList.remove("random");
      setShowCartModal(true);
      removeCartToast();
      setLoading(false);
      dispatch(ACTIONS.resetToInitialState());
    }
  }, [state.addProductToCartSuccess]);

  useEffect(() => {
    if (state.addProductToCartFailure) {
      setLoading(false);
      addToast("error!", {
        appearance: "error",
        content: errorCheckHandler(state.addProductToCartFailure),
      });
    }
  }, [state.addProductToCartFailure]);

  let imageOnClickHandler = (imageUrl, index) => {
    setImageUrl(imageUrl);
    setIndexing(index)
  };

  // =========================Wishlist API request===========================================================
  
  const removeWishlistItem = async(productId, userWishlist) => {
    const result = await userWishlist.find(item => item.productId == productId);    
      let whisListItemId = result.wishListItemId
      dispatch(WISHLIST_ACTIONS.removeUserWishListItem(whisListItemId));
    
  
  };

  const addToWishlist = (productId, skuId) => {
    wishlistProductPayload.userId = userInfo.userId;
    wishlistProductPayload.accountId = userInfo.accountId;
    wishlistProductPayload.productId = productId;
    wishlistProductPayload.skuId = skuId;
    setWishlistProductPayload(wishlistProductPayload);
    setMarkWishlisted(true);
    dispatch(WISHLIST_ACTION.addUserWishlist(wishlistProductPayload));
  };

  const onClickWishListHandler = (productId, skuId) => {
    if (userInfo) {
      if (isWishlisted) {
        removeWishlistItem(productId, userWishlist);
      } else {
        addToWishlist(productId, skuId);
      }
    } else {
      openLoginModal();
    }
  };
    // ============success of Remove Item from Wiashlist ===========================
    useEffect(() => {
      if (wishlistState.removeWishlistItemSuccess) {
        setIsWishlisted(false);
        addToast("Success!", {
          appearance: "success",
          content: `Product removed from wishlist`,
        });
        let wishlistIcon = document.getElementById("wishlisted")
        if(wishlistIcon){
          wishlistIcon.classList.remove("wishlisted-btn")
        }
       
        dispatch(WISHLIST_ACTION.getUserWishList(wishlistProductPayload));
        dispatch(WISHLIST_ACTION.resetToInitialState());
      }
    }, [wishlistState.removeWishlistItemSuccess]);

  // ====================Wishlist Successs Toast=========================

  useEffect(() => {
    if (wishlistState.addWishlistSuccess) {    
      setIsWishlisted(true)  
      if (
        wishlistState.addWishlistSuccess &&
        wishlistState.addWishlistSuccess.wishlist_data[0].statusCode == 200
      ) {
        let wishlistIcon = document.getElementById("wishlisted")
        if(wishlistIcon){
          wishlistIcon.classList.add("wishlisted-btn")
        }
        addToast("Success!", {
          appearance: "success",
          content: `Product added to wishlist`,
        });
      }
      dispatch(WISHLIST_ACTION.resetToInitialState());
    }
  }, [wishlistState.addWishlistSuccess]);

  useEffect(() => {
    if (loginWishlistSuccess) {
      addToast("Success!", {
        appearance: "success",
        content: `Product added to wishlist`,
      });
      setLoginWishlistSuccess(false);
    }
  }, [loginWishlistSuccess]);

  // ==========================Success of Add Product to cart================================
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartId"))) {
      let count = 0;
      if (count === 0) {
        let cartId = JSON.parse(localStorage.getItem("cartId"));
        dispatch(ADD_TO_CART_ACTION.getCartDetails(cartId));
        count++;
      }
    }
  }, [state.addProductToCartSuccess]);

  //===================== Success of get cartItem handling dupicate cart=====================

  useEffect(() => {
    if (
      getCartState.cartDetailsSuccess &&
      getCartState.cartDetailsSuccess.items.length > 0
    ) {
      setCartItems(getCartState.cartDetailsSuccess.items);
    }
  }, [getCartState.cartDetailsSuccess, state.addProductToCartSuccess]);

  let addProductToCart = async(productId) => {
    setLoading(true);
    let count = 0;
    if (cartItems && cartItems.length > 0) {
      for (let item of cartItems) {
        if (item.productId == productId) {
          count++;
        }
      }
    }
    if (count > 0) {
      setLoading(false);
      addToast("Success!", {
        appearance: "success",
        content: "Item already in your cart",
      });
    } else {
      const cartItemPayloadCopy = { ...cartItemPayload };
      cartItemPayloadCopy.cartItems[0].productId = productDetails.productId;
      cartItemPayloadCopy.cartItems[0].skuId = productDetails.skuId;
      cartItemPayloadCopy.cartItems[0].quantity = productQuantity;
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        cartItemPayloadCopy.accountId = parseInt(userInfo.accountId);
        let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/channels/${channelId}/account/${cartItemPayloadCopy.accountId}/carts`;
        let response = await axios.get(url, GetHeaders())
        if(response && response.data.items.length >0){
          let cartId = response.data.items[0].id
          dispatch(ACTIONS.addProductToCart(cartItemPayloadCopy, cartId));
        } else{
          dispatch(ACTIONS.addProductToCart(cartItemPayloadCopy));
        }       
      } else {
        dispatch(ACTIONS.addProductToCart(cartItemPayloadCopy));
      }
    }
  };

  let showImageOnModal = (val, index) => {

    let root = document.getElementById("root");
    root.classList.add("disableScroll");

    if (val) {
      setProductImageUrl(val);
    } else {
      setProductImageUrl(productDetails.urlImage);
    }
    setMagnifireOnModal(true);
  };

  useEffect(() => {
    if (showMagnifireOnModal) {
      let imageUrl = productImageUrl.replace(
        `${baseImageUrl}`,
        `${appUrl}`
      );
      let body = document.getElementById("body");
      body.classList.add("position-relative");
      body.classList.add("random");
      setImageUrl(imageUrl);
    }
  }, [showMagnifireOnModal]);

  let closeModalImage = () => {
    setMagnifireOnModal(false);
    let body = document.getElementById("body");
    body.classList.remove("position-relative");
    body.classList.remove("random");
    let root = document.getElementById("root");
    root.classList.remove("disableScroll");
  };

  let rediretToSubCategories = (subCategoryId, subCategoriesName, catName) => {
    // var subCategories = subCategoriesName.replace(/\s/g, "");
    navigate(`/${catName.replace(/ /g, '-')}/${subCategoriesName.replace(/ /g, '-')}`, { state: subCategoryId,subCategoriesName });
    // navigate(`/${catName}/${subCategoriesName.replace(/ /g, '-')}`, { state: subCategoryId });
  };



  return (
    <>
      <Loader loading={loading} />
      {productDetails && (
        <>
          <div className="cat-wrapper py-lg-4 py-md-3 py-3">
            <div className="container">
              <div className="row">
                
                {productDetails.categories &&
                  productDetails.categories.length > 0 && productDetails.categories.map((item, ind) =>{
                    if(param.subcategory.replace(/-/g, ' ') == item.name){
                     return (
                      <>                    
                      <div className="col-sm-12 col-md-12 col-lg-12">
                      <span>
                        <Link to="/" className="bred-crumb-one">
                          Home
                        </Link>
                      </span>
                      <span className="separator">/</span>
                      <span
                        className="bred-crumb-one"
                        onClick={() =>
                          rediretToSubCategories(
                            item.id,
                            item.name,
                            productDetails.categories[0].name
                          )
                        }
                      >
                        {/* {productDetails.categories.length > 0 &&
                          productDetails.categories[0].name} */}
                          {
                            param.subcategory.replace(/-/g, ' ')
                          }
                      </span>
                      <span className="separator">/</span>
                      <span className="bred-crumb-two">
                        {productDetails &&
                          productDetails.name &&
                          productDetails.name}
                      </span>
                    </div>

                  
                    </>
                     )
                        }
                    
                    
                  }) }
              </div>
            </div>
          </div>
          <section className="product-description ">
            <div className="container">
              <div className="row custom-gutter">
                {/* desktop view */}
                <div className="col-md-6 desktop-view-image">
                  <div
                    className="single-image-detail"
                    onClick={() => showImageOnModal(imageUrl,indexing)}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="img-fluid"
                        alt={productDetails.urlImage}
                        
                      />
                    ) : (
                      <>                      
                        <div
                       
                          className="react-magnify"
                                  dangerouslySetInnerHTML={{
                                    __html: productDetails.adaptiveImage.replace(
                                      /\/o/g,
                                      `${appUrl}o`
                                    ),
                                  }} >
                        </div>
                        
                      </>
                    )}
                  </div>
                  <div className="multiple-images">
                    <Carousel
                      swipeable={true}
                      draggable={true}
                      //showDots={true}
                      ssr={true}
                      infinite={true}
                      autoPlay={false}
                      responsive={responsive}
                    >
                      {multipleImage &&
                        multipleImage.length > 0 &&
                        multipleImage.map((item, index) => {
                          let multiimage = item.src.replace(
                            `${baseImageUrl}`,
                            `${appUrl}`
                          );
                          return (
                              <span key={index} className="multiple-image-1">
                                <img
                                  className="img-fluid"
                                  onClick={() =>
                                    imageOnClickHandler(multiimage, index)
                                  }
                                  src={multiimage}
                                  alt=""
                                />                                
                              </span>
                          );
                        })}
                    </Carousel>
                  </div>
                </div>
                {/* desktop view ends */}

                {/* mobile view */}
                <div className="col-md-6 mobile-view-image">
                  <div className="single-image-detail">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        className="img-fluid"
                        alt={productDetails.urlImage}
                      />
                    ) : (
                      <>
                        <div>
                          <img
                            className="react-magnify"
                            alt=""
                            src={productDetails.urlImage.replace(
                              `${baseImageUrl}`,
                              `${appUrl}`
                            )}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="multiple-images">
                    <Carousel
                      swipeable={true}
                      draggable={true}
                      //showDots={true}
                      ssr={true}
                      infinite={true}
                      autoPlay={false}
                      responsive={responsive}
                    >
                      {
                      multipleImage &&
                        multipleImage.length > 0 &&                         
                        multipleImage.map((item, index) => {
                          let multiimage = item.src.replace(
                            `${baseImageUrl}`,
                            `${appUrl}`
                          );                        
                          return (
                              <span key={ index} className="multiple-image-1">
                                <img
                                  className="img-fluid"
                                  onClick={() =>
                                    imageOnClickHandler(multiimage, index)
                                  }
                                  src={multiimage}
                                  alt=""
                                />
                              </span>
                          );
                        })}
                    </Carousel>
                  </div>
                </div>
                {/* mobile view ends */}
                <div className="col-md-6">
                  <div className="product-details">
                    <h2 className="title-wrap common-heading">
                      {productDetails.name}
                      {productDetails.stockQuantity > 0 && (
                        <div
                          className="wishlist-div ps-3"
                          onClick={() =>
                            onClickWishListHandler(
                              productDetails.productId,
                              productDetails.skuId
                            )
                          }
                        >
                          <span
                            className={`wishlist-btn ${
                              userInfo && markWishlisted ? "wishlisted-btn" : ""
                            }`}
                            id="wishlisted"
                          >
                            <AiFillHeart />
                          </span>
                        </div>
                      )}
                    </h2>
                    <div className="product-detail-box-1">
                      <div className="price-wrapper-3 common-para-3">
                        <b>
                          <span className="price-wrap">
                            &#x20b9; {Math.round(productDetails.price)}
                          </span>
                        </b>
                        <p className="para-styling">
                          {converter.convert(productDetails.shortDescription)}
                        </p>
                        <div className="specification">
                          <ul className="specification-of-para">
                            {productDetails.height > 0 && (
                              <li className="common-para-3 mb-0">
                                Height x Width : {productDetails.height}cm x{" "}
                                {productDetails.width}cm
                              </li>
                            )}
                            {productDetails.weight > 0 && (
                              <li className="common-para-3 mb-0">
                                Weight : {productDetails.weight} kg
                              </li>
                            )}
                            {productDetails.depth > 0 && (
                              <li className="common-para-3 mb-0">
                                Depth : {productDetails.depth} cm
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="quantity">
                      <div className="row my-4">
                        <div>
                          <div className="col-md-6">
                            {productDetails.stockQuantity > 0 &&
                            productDetails.purchasable ? (
                              <button
                                className="login-btn w-auto"
                                onClick={() =>
                                  addProductToCart(productDetails.productId)
                                }
                              >
                                <span className="btn-icon">
                                  <AiOutlineShoppingCart />
                                </span>
                                <span className="btn-text ps-2">
                                  Add to Cart
                                </span>
                              </button>
                            ) : productDetails.purchasable &&
                              productDetails.stockQuantity > 0 &&
                              productDetails.allowBackOrder ? (
                              <button
                                className="login-btn w-auto"
                                onClick={() =>
                                  addProductToCart(productDetails.productId)
                                }
                              >
                                <span className="btn-icon">
                                  <AiOutlineShoppingCart />
                                </span>
                                <span className="btn-text ps-2">
                                  Add to Cart
                                </span>
                              </button>
                            ) : (
                              <button className="disabled-btn w-auto" disabled>
                                <span className="btn-text">Out of Stock</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row custom-gutter">
                  <div className="col-md-12">
                    <div className="tabs-section">
                      <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="tab-btn-ui"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            Product Details
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active tab-1 para-styling"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="">
                            {converter.convert(productDetails.description)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {similarProductList && similarProductList.length > 0 && (
                  <>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="Likes-section">
                          <h3 className="common-heading">
                            You Might Also Like
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {similarProductList &&
                        similarProductList.length > 0 &&
                        similarProductList.map((item, i) => {
                          return (
                              <div key={i} className="col-md-3 col-6 col-lg-3">
                                <Link
                                  onClick={() =>
                                    localStorage.setItem(
                                      "similarProductId",
                                      item.productId
                                    )
                                  }
                                  to={`/product/${item.slug}`}
                                  state={{ productId: item.productId }}
                                  target="_blank"
                                >
                                  <div className="might-like-wrapper">
                                    <div className="might-like-image mb-2">
                                      <img
                                        className="img-fluid"
                                        src={item.urlImage.replace(
                                          `${baseImageUrl}`,
                                          `${appUrl}`
                                        )}
                                        alt=""
                                      />
                                    </div>
                                    <div className="might-like-text">
                                      <div>
                                        <p className="texts mb-1 mt-1">
                                          {item.name}
                                        </p>
                                        <p className="common-para-3">
                                          &#x20b9; {item.price}
                                        </p>
                                      </div>
                                      <div className="add-button"></div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <section>
        {showLoginModal &&
        <Modal open={showLoginModal} onClose={() => closeModal()}>
          <LoginPage
            onClose={closeModal}
            // skuId={skuId}
            // productId={productId}
            // whislistHandler={onClickWishListHandler}
          />
        </Modal>
}
      </section>



      {showMagnifireOnModal && (
        <section className="showModal1 container-fluid">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div className="guest-user-modal guest-image-style">
                <Carousel
                  swipeable={false}
                  draggable={false}
                  //showDots={true}
                  ssr={true}
                  infinite={true}
                  autoPlay={false}
                  responsive={modalResponsive}
                >
                  {multipleImage &&
                    multipleImage.length > 0 &&
                    [
                      ...multipleImage.slice(indexing),
                      ...multipleImage.slice(0, indexing),
                    ]
                    .map((item, index) => {
                      let multiimage = item.src.replace(
                        `${baseImageUrl}`,
                        `${appUrl}`
                      );
                      return (
                          <span key={index + indexing} className="multiple-image-1">
                            <img
                              className="img-fluid"
                              onClick={() => imageOnClickHandler(multiimage, index + indexing)}
                              src={multiimage}
                              alt=""
                            />                            
                          </span>
                      );
                    })}
                </Carousel>
                <button
                  className="react-responsive-modal-closeButton modal-close-btn"
                  onClick={() => closeModalImage()}
                >
                  <div className="modal-closed">
                    <RiCloseCircleLine />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {showCartModal && productDetails && (
        <section className="cart-toast d-flex justify-content-end">
          <div className="row">
            <div className="col-md-12">
              <div className="add-to-bag-animated  animate__animated animate__fadeInRightBig">
                <img
                  className="img-fluid"
                  alt=""
                  src={productDetails.urlImage.replace(
                    `${baseImageUrl}`,
                    `${appUrl}`
                  )}
                ></img>
                <p>Added To Cart</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};
export default ProductDetails;
