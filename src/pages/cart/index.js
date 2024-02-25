import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import AppLoader from "../../Components/AppLoader/AppLoader.js";
import { GetHeaders, errorCheckHandler, appUrl, groupId } from "../../utils";
import * as ACTIONS from "./action";
import * as GET_CART_ACTIONS from "../../pages/home/action";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import LoginPage from "../login";
import "../../css/cart.css";
import Logo from "../../images/logo.jpg";
import { RiCloseCircleLine } from "react-icons/ri";
import Loader from "../../Components/loader";
import { AiFillHeart } from "react-icons/ai";
import * as WISHLIST_ACTION from "../../utils/CommonWishlistService/action";
import Empty from "../../images/wishlist-empty-icon.png";
import Footer from "../../Components/Footer/Footer";
import { channelId } from "../../utils";
import Unavailable from "../../images/unavailable.png"

const Cart = () => {
  let navigate = useNavigate();
  const { addToast } = useToasts();
  let state = useSelector((state) => state.CartDetailsReducer);
  let wishlistState = useSelector((state) => state.WishlistReducer);
  const [cartLoading, setCartLoading] = useState(true);
  let [showLoginModal, setShowLoginModal] = useState(false);
  let [proceedToCheckout, setProceedToCheckout] = useState(false);
  let [showModal, setShowModal] = useState(false);
  const [cartItemToDeleteId, setCartItemToDeleteId] = useState(undefined);
  const [itemDeletingLoading, setItemDeletingLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [userInfo, setUserInfo] = useState();
  let loginState = useSelector((state) => state.LoginReducer);
  let dispatch = useDispatch();
  let [userWishlist, setUserWishlist] = useState([]);
  let [wishlistProductPayload, setWishlistProductPayload] = useState({
    accountId: "",
    productId: "",
    userId: "",
    skuId: "",
    groupId: groupId,
  });
  let [unAvailableItem, setUnAvailableItem] = useState([])
  let [unAvailableItemMsg, setUnAvailableItemMsg] = useState();
  let [checkItem, setCheckItem] = useState(false)
  let [unAvailableItemBeforePlaceOrder, setUnAvailableItemBeforePlaceOrder] = useState([])

  const [classes, setClasses] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ====================Success of Login ===========================
  useEffect(() => {
    if (loginState.userLoginSuccess) {
      setShowLoginModal(false);
      setProceedToCheckout(true);
      navigate("/cart");
    }
  }, [loginState.userLoginSuccess]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));   
      let cartId = JSON.parse(localStorage.getItem("cartId"));
      getCartInfoByUserAccount(cartId);
      setUserInfo(userInfo);
    } else {
      
      getGuestCardInfoByCartId();
    }
  }, [loginState.userLoginSuccess]);



  // =========================Get Cart Details API by cart Id ===================================
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartId"))) {
      let cartId = JSON.parse(localStorage.getItem("cartId"));
      if(cartId){
      dispatch(ACTIONS.getCartDetails(JSON.parse(localStorage.getItem("cartId"))));
      }
    } else {
      setCartItems([]);
      setCartLoading(false);
    }
  }, []);


  //removing cart from localstorage
  // useEffect(async() => {
  //   if (JSON.parse(localStorage.getItem("cartId"))) {
  //     if(JSON.parse(localStorage.getItem("userInfo"))){
  //     let userInfo = JSON.parse(localStorage.getItem("userInfo"))
  //     getUserCartId(userInfo.accountId) 
  //     } else{
  //       dispatch(ACTIONS.getCartDetails(JSON.parse(localStorage.getItem("cartId"))));
  //     }
      
  //   } else {
  //     setCartItems([]);
  //     setCartLoading(false);
  //   }
  // }, []);

  // const getUserCartId = async(accountId) => {    
  //   let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/channels/${channelId}/account/${accountId}/carts`;
  //     let response = await axios.get(url, GetHeaders())
  //     if(response && response.data && response.data.items.length > 0) {        
  //       let cartId = response.data.items[0].id;
  //       if(cartId){
  //         localStorage.setItem("cartId", cartId);
  //       dispatch(ACTIONS.getCartDetails(cartId));
  //       }
  //     }
  // }

  useEffect(() => {
    if (userInfo) {
      setProceedToCheckout(true);
    }
  },[]);

  // ================== Get Guest Cart Info by cart Id ===============================
  let getGuestCardInfoByCartId = async () => {
    if (localStorage.getItem("cartId")) {
      let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/carts/${localStorage.getItem(
        "cartId"
      )}`;
      try {
        let userLogged = localStorage.getItem("userInfo") ? false : true;
        let response = await axios.get(url, GetHeaders(userLogged));
        setItemDeletingLoading(false);
        setTotalPrice(response.data.summary.total);
        localStorage.setItem("cartItems", response.data.summary.itemsQuantity);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      let userInfo = localStorage.getItem("userInfo");
      if(userInfo){
        userInfo = JSON.parse(userInfo);
    dispatch(GET_CART_ACTIONS.getUserCartId(parseInt(userInfo.accountId)));
      }
    } 
  },[])

  // ================== Get User Cart Info by account Id ===============================

  let getCartInfoByUserAccount = async (cartId) => {
    // let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/channels/40984/account/${accountId}/carts`;
    if(JSON.parse(localStorage.getItem("userInfo"))){
      
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
 let cartIdUrl = `https://admin.modernhouseofantiques.com/o/headless-commerce-delivery-cart/v1.0/channels/${channelId}/account/${userInfo.accountId}/carts`;
    

    let response = await axios.get(cartIdUrl, GetHeaders());
    if(response && response.data) {
    

    let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/carts/${response.data.items[0].id}`;
    try {
      let userLogged = localStorage.getItem("userInfo") ? false : true;
      let response = await axios.get(url, GetHeaders(userLogged));
      if (response && response.data && response.data.summary) {
        setItemDeletingLoading(false);
        setTotalPrice(response.data.summary.total);
      }
    } catch (error) {}
  }
  } else{
    getGuestCardInfoByCartId();
  }
  };

  useEffect(() => {
    if (state.cartDetailsSuccess && state.cartDetailsSuccess.items) {
      getCartItemsDescriptions(state.cartDetailsSuccess.items);
      checkItemAvailablity(state.cartDetailsSuccess.items);
    }
  }, [state.cartDetailsSuccess]);

  //=================Check item availablity===========================

  const checkItemAvailablity = async (items) => {
    let unAvailableItem = [];    
    for (let i = 0; i < items.length; i++) {
      let url = `${apiBaseUrl}products/${items[i].productId}/skus`;
      let response = await axios.get(url, GetHeaders());
      if (response) {
       if(response.data.items[0].availability.stockQuantity > 0){
        items[i]["itemQuantity"] = response.data.items[0].availability.stockQuantity 
       }else{
      
        items[i]["itemQuantity"] = response.data.items[0].availability.stockQuantity 
        unAvailableItem.push(items[i]);
       }
        
      }
      
    }

    setUnAvailableItem(unAvailableItem)
  }

  // ======================== Cart Item description ============================
  let getCartItemsDescriptions = async (items) => {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
      let url = `${apiBaseUrl}products/${items[i].productId}?nestedFields=categories`;

      let response = await axios.get(url, GetHeaders());
      if (response) {
        items[i]["shortDescription"] = response.data.shortDescription;
         items[i]["subCategory"] = response.data.categories[1].name
      }
      arr.push(items[i]);
    }
    setCartItems(arr);
    dispatch(ACTIONS.resetCartToInitialState());
    setCartLoading(false);
  };

  useEffect(() => {
    if (cartItemToDeleteId) {
      deleteItem(cartItemToDeleteId);
    }
  }, [cartItemToDeleteId]);

  let deleteItemFromCart = async (cartItemId) => {
    setUnAvailableItemMsg("")
    setItemDeletingLoading(true);
    setCartItemToDeleteId(cartItemId);
  };

  let deleteItem = async (cartItemId) => {
    let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/cart-items/${cartItemId}`;
    try {
      await axios.delete(url, GetHeaders());
      setItemDeletingLoading(false);
      setCartLoading(false);
      if (localStorage.getItem("cartId")) {
        let cartId = localStorage.getItem("cartId");
        getCartInfoByUserAccount(cartId);
      } else {
        getGuestCardInfoByCartId();
      }
      if (JSON.parse(localStorage.getItem("cartItems")) > 0) {
        localStorage.setItem(
          "cartItems",
          JSON.parse(localStorage.getItem("cartItems") - 1)
        );
      }
      if (JSON.parse(localStorage.getItem("cartId"))) {
        dispatch(
          ACTIONS.getCartDetails(JSON.parse(localStorage.getItem("cartId")))
        );
      } else {
        setCartItems([]);
      }
      addToast("Success!", {
        appearance: "success",
        content: "Item deleted successfully from your cart",
      });
    } catch (error) {
      setItemDeletingLoading(false);
      addToast("error!", {
        appearance: "error",
        content: errorCheckHandler(error),
      });
    }
  };

 

  let onClickGuestHandler = () => {
    let body = document.getElementById("body");
    let root = document.getElementById("root");
    body.classList.remove("position-relative");
    body.classList.remove("random");
    root.classList.remove("disableScroll");
    setShowModal(false);
    navigate("/checkout", { state: totalPrice });
  };

  let openLoginModal = () => {
    setShowModal(false);
    setShowLoginModal(true);
  };

  let closeModal = () => {
    setShowModal(false);
    setShowLoginModal(false);
    let body = document.getElementById("body");
    body.classList.remove("position-relative");
    body.classList.remove("random");
  };

  let redirectToProductDiscriptionPage = (productId, name) => {
    navigate(`/product/${name}`, { state: productId });
  };

  // ===============Get User Wishlist Items====================================

  useEffect(() => {
    if (userInfo && userInfo != null) {
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
        for (let el of cartItems) {
          if (el.productId == items.productId) {
            let wishlisted = document.getElementById(el.productId);
            wishlisted.classList.add("wishlisted-btn");
          } 
        }
      }
    }
  }, [wishlistState.getWishlistSuccess, cartItems]);

  // =================Add Items to wishlist====================
  const removeWishlistItem = (whisListItemId, productId) => {
    dispatch(WISHLIST_ACTION.removeUserWishListItem(whisListItemId));
    let wishlistIcon = document.getElementById(productId)
        if(wishlistIcon){
          wishlistIcon.classList.remove("wishlisted-btn")
        }
  };

  const addToWishlist = (productId, skuId) => {
    wishlistProductPayload.userId = userInfo.userId;
    wishlistProductPayload.accountId = userInfo.accountId;
    wishlistProductPayload.productId = productId;
    wishlistProductPayload.skuId = skuId;
    setWishlistProductPayload(wishlistProductPayload);
    dispatch(WISHLIST_ACTION.addUserWishlist(wishlistProductPayload));
  };

  const onClickWishListHandler = (productId, skuId, id) => {
    const res = userWishlist.find(item => item.productId == productId)    
    if(res){    
      let wishlistItem = res.wishListItemId  
      removeWishlistItem(wishlistItem,productId);
    } else {
        addToWishlist(productId, skuId);
      }
  };
    // ============success of Remove Item from Wiashlist ===========================
    useEffect(() => {
      if (wishlistState.removeWishlistItemSuccess) {
        addToast("Success!", {
          appearance: "success",
          content: `Product removed from wishlist`,
        });        
       
        dispatch(WISHLIST_ACTION.getUserWishList(wishlistProductPayload));
        dispatch(WISHLIST_ACTION.resetToInitialState());
      }
    }, [wishlistState.removeWishlistItemSuccess]);


  // ================ Success of Add Item to wishlist=================
  useEffect(() => {
    if (wishlistState.addWishlistSuccess) {
      if (
        wishlistState.addWishlistSuccess &&
        wishlistState.addWishlistSuccess.wishlist_data[0].statusCode == 200
      ) {
        addToast("Success!", {
          appearance: "success",
          content: `Product added to wishlist`,
        });
      } else {
      }
      dispatch(WISHLIST_ACTION.resetToInitialState());
    } else {
    }
  }, [wishlistState.addWishlistSuccess]);

  let changeClass = (className) => {
    setClasses(className);
  };

  const checkItemBeforeCheckout = async()=> {
    let cartId = localStorage.getItem("cartId");
    let url = `${appUrl}o/headless-commerce-delivery-cart/v1.0/carts/${cartId}/items` 
    try {
      let response = await axios.get(url, GetHeaders())
    if(response){
      checkItemAvailablityBeforePlaceOrder(response.data.items)
      getCartItemsDescriptions(response.data.items)

    }
      
    } catch (error) {
      console.log(error, "error")
    }
    
    
  }


  const checkItemAvailablityBeforePlaceOrder = async (items) => {
    let unAvailableItem = [];    
    for (let i = 0; i < items.length; i++) {
      let url = `${apiBaseUrl}products/${items[i].productId}/skus`;
      let response = await axios.get(url, GetHeaders());
      if (response) {
       if(response.data.items[0].availability.stockQuantity > 0){
        items[i]["itemQuantity"] = response.data.items[0].availability.stockQuantity 
       }else{
      
        items[i]["itemQuantity"] = response.data.items[0].availability.stockQuantity 
        unAvailableItem.push(items[i]);
       }
        
      }
      
    }
    if(unAvailableItem.length > 0){
      setUnAvailableItemMsg("Please remove sold items from cart")
      setUnAvailableItemBeforePlaceOrder(unAvailableItem)
    }else{
      onClickPlaceOrder()
    }

   
  }

  let onClickPlaceOrder = () => {
    if(unAvailableItem.length > 0 && unAvailableItemBeforePlaceOrder.length > 0){
      setUnAvailableItemMsg("Please remove sold items from cart")
    }else{
    if (userInfo == undefined) {
      let body = document.getElementById("body");
      let root = document.getElementById("root");
      body.classList.add("position-relative");
      body.classList.add("random");
      root.classList.add("disableScroll");
      setShowModal(true);
    } else {
      navigate("/checkout", { state: totalPrice });
    }
  }
};


  return (
    <>
      <Loader loading={itemDeletingLoading} />
      <section className="cart-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="cart-left-wrapper">
                {cartLoading && cartLoading ? (
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
                ) : cartItems && cartItems.length > 0 ? (
                  cartItems.map((item, i) => {
                    return (
                      <div key={i} className="cart-left-wrap mb-2">
                        <div className="row">
                          <div className="col-md-4 change-in-padding">
                            <Link className="cart-left-image" 
                             to={`/product/${item.subCategory.replace(/ /g, '-')}/${item.productURLs.en_US}`} 
                             style={{ textDecoration: 'none' }}
                             >
                              <img
                                // onClick={() =>
                                //   redirectToProductDiscriptionPage(
                                //     item.productId,
                                //     item.productURLs.en_US
                                //   )
                                // }
                                src={`${appUrl}${item.thumbnail}`}
                                alt=""
                                className="img-fluid"
                              />
                            </Link>
                          </div>
                          <div className="col-md-8 ps-0">
                            <div className="cart-right-image-text">
                              <div className="cart-heading common-product-repeated-heading text-start">{item.name}</div>
                              <p className="cart-para">
                                {item.shortDescription}
                              </p>
                              <p className="cart-price">
                                &#x20b9;{" "}
                                {`${
                                  item && item.price.promoPrice
                                    ? Math.round(item.price.promoPrice)
                                    : Math.round(item.price.price)
                                }`}
                              </p>
                              {item.itemQuantity < 1 ? 
                              <div>
                                <button className=" sold-out">
                                  Sold Out
                                </button>
                              </div> : ""
                  }
                              
                            </div>
                          </div>
                        </div>
                        <div className="wishlist-close-icons-wrapper">
                          <button
                            data-tip
                            data-for="wishlistTip"
                            className="wishlist-div wishlist-btn"
                            onClick={() =>
                              onClickWishListHandler(
                                item.productId,
                                item.skuId,
                                item.id
                              )
                            }
                          >
                            {userInfo ? (
                              <span
                                className="cart-showing-tooltips wish-trash-icon-color"
                                id={item.productId}
                              >
                                <AiFillHeart />
                              </span>
                            ) : (
                              ""
                            )}
                          </button>
                          <button
                            className="customTooltip cart-trash-icon"
                            data-tip
                            data-for="RemoveTip"
                            disabled={
                              cartItemToDeleteId === item.id &&
                              itemDeletingLoading
                            }
                            onClick={() => deleteItemFromCart(item.id)}
                          >
                            <span
                              className="cart-showing-tooltips wish-trash-icon-color"
                              id={item.productId}
                            >
                              <RiCloseCircleLine />
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="wishlist-card">
                        <p className="wishlist-card-text">
                          <span>YOUR CART IS EMPTY</span>
                        </p>
                        <div>
                          <p className="m-0 wishlist-para">
                            Add items that you like to your cart. Review them
                            anytime and easily move them to the bag.
                          </p>
                        </div>
                        <div className="wishlist-empty-icon">
                          <img src={Empty} alt="" className="img-fluid" />
                        </div>
                        <div>
                          <button
                            className="wishlist-button"
                            onClick={() => {
                              navigate("/allproducts");
                            }}
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {cartItems && cartItems.length > 0 && (
              <div className="col-md-4">
                <div className="cart-right-wrapper">
                  <div className="cart-right-wrap">
                    <h3 className="cart-price-detail mb-4">PRICE DETAILS</h3>
                    <p className="cart-total-price mb-2">
                      <span>Total MRP</span>
                      <span>
                        &#x20b9; {`${totalPrice ? Math.round(totalPrice) : 0}`}
                      </span>
                    </p>
                    <p className="cart-delivery-price mb-2">
                      <span>Delivery Fee</span>
                      <span>Free</span>
                    </p>
                    <div className="cart-total-amount">
                      <span>Total Amount </span>
                      <span>
                        &#x20b9; {`${totalPrice ? Math.round(totalPrice) : 0}`}
                      </span>
                    </div>
                    {proceedToCheckout ? (
                     <button
                     type="button"
                     className="cart-order-btn"
                     onClick={() => {
                      //  onClickPlaceOrder();
                       checkItemBeforeCheckout();
                     }}
                   >
                        Proceed To checkout
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="cart-order-btn"
                        onClick={() => {
                          //onClickPlaceOrder();
                           checkItemBeforeCheckout();
                        }}
                      >
                        Place Order
                      </button>
                    )}

                    <button
                      type="button"
                      className="cart-order-btn continue-shop-btn mt-3"
                      onClick={() => navigate("/allproducts")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                  { unAvailableItemMsg && 
                   <div className="mt-2">
                    <p className="text-danger text-center">{unAvailableItemMsg}</p>
                    </div>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showModal && (
        <section className="showModal1 container-fluid">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div className="guest-user-modal">
                <h2 className="common-heading fs-4 pb-1">Welcome</h2>
                <img className="img-fluid" src={Logo} alt="" />
                <p>
                  Howdy, It seems You are not logged in
                  <br />
                  Please select
                </p>
                <div className="modal-btn">
                  <button className="btn" onClick={() => onClickGuestHandler()}>
                    Guest
                  </button>
                  <button className="btn" onClick={() => openLoginModal()}>
                    Login
                  </button>
                </div>
                <span
                  className="close-btn"
                  onClick={() => {
                    let body = document.getElementById("body");
                    body.classList.remove("position-relative");
                    body.classList.remove("random");
                    let root = document.getElementById("root");
                    root.classList.remove("disableScroll");
                    setShowModal(false);
                  }}
                >
                  <RiCloseCircleLine />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <Modal open={showLoginModal} onClose={() => closeModal()}>
          <LoginPage onClose={closeModal} currentModal={changeClass}/>
        </Modal>
      </section>

      <Footer />
    </>
  );
};

export default Cart;