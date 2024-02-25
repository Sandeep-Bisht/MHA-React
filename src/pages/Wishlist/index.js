import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GetHeaders, apiBaseUrl, groupId, appUrl, baseImageUrl } from "../../utils";
import { useEffect } from "react";
import Loader from "../../Components/loader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ACTIONS from "../../utils/CommonWishlistService/action";
import "../../css/wishlist.css";
import Empty from "../../images/wishlist-empty-icon.png";
import { RiCloseCircleLine } from "react-icons/ri";
import Footer from "../../Components/Footer/Footer";

const Wishlist = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [wishlistItem, setWishlistItem] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const [wishlistProductPayload] = useState({
    userId: "",
    groupId: groupId,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.WishlistReducer);

  useEffect(() => {
    if (JSON.parse(JSON.stringify(localStorage.getItem("userInfo")))) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =================Get User Wishlist API Call ===================

  useEffect(() => {
    if (userInfo != null) {
      wishlistProductPayload["userId"] = userInfo.userId;
      dispatch(ACTIONS.getUserWishList(wishlistProductPayload));
    } else {
      setIsLoading(false);
    }
  }, [userInfo]);

  // =================Success Response of Get Wishlist ===================

  useEffect(() => {
    if (state && state.getWishlistSuccess) {
      setIsLoading(false);
      let res = state.getWishlistSuccess.wishlist_data[0].products;
      if (res && res.length > 0) {
        getProductPriceByProductId(res);
      } else {
        setWishlistItem([]);
      }
    }
  }, [state.getWishlistSuccess]);

  // ================ Get Product Price by Product Id ==============================
  let getProductPriceByProductId = async (products) => {
    setIsLoading(true);
    let globalArr = [];
    let productWishlistResponse;
    for (let i = 0; i < products.length; i++) {
      let url = `${apiBaseUrl}products/${products[i].productId}?nestedFields=categories`;
      productWishlistResponse = await axios.get(url, GetHeaders());
      productWishlistResponse.data["whisListItemId"] = products[i].wishListItemId;
      globalArr.push(productWishlistResponse.data);
      if (i === products.length - 1) {
        setIsLoading(false);
      }
    }
    setWishlistItem(globalArr);
  };

  // ==============Remove from Wishlist API ==================================
  const removeWishlistItem = (whisListItemId) => {
    setIsLoading(true);
    dispatch(ACTIONS.removeUserWishListItem(whisListItemId));
  };

  // ============uccess of Remove Item from Wiashlist ===========================
  useEffect(() => {
    if (state.removeWishlistItemSuccess) {
      dispatch(ACTIONS.getUserWishList(wishlistProductPayload));
      dispatch(ACTIONS.resetToInitialState());
    }
  }, [state.removeWishlistItemSuccess]);

  // ========================Redirect to Single product page ===========================
  let redirectToProductDiscriptionPage = (slug, productId) => {
    navigate(`/product/${slug}`, { state: productId });
  };

  console.log("wishlistItem wishlistItem",wishlistItem)
  return (
    <>
      <Loader loading={isLoading} />
      {!isLoading && (
        <section className="wishlist-wrapper">
          <div className="container">
            {userInfo ? (
              <>
                <div className="row">
                  {wishlistItem && wishlistItem.length > 0 ? (
                    wishlistItem.map((item, index) => {
                      return (
                        <>
                          <div key={index} className="col-md-3 col-6 col-lg-3"
                            >
                            <div className="product-image">
                              <div className="wishlist-wrap-box">
                                <Link to={`/product/${item.categories[1].name.replace(/ /g, '-')}/${item.slug}`} 
                           style={{ textDecoration: 'none' }} >
                                <img
                                  // onClick={() =>
                                  //   redirectToProductDiscriptionPage(
                                  //     item.slug,
                                  //     item.productId
                                  //   )
                                  // }
                                  src={item.urlImage.replace(
                                    `${baseImageUrl}`,
                                    `${appUrl}`
                                  )}
                                  alt=""
                                  className="img-fluid"
                                />
                                </Link>
                                <div className="wishlist-trash-icon">
                                  <RiCloseCircleLine
                                   onClick={(e) => {
                                    e.stopPropagation(); // Stop event propagation
                                    removeWishlistItem(item.whisListItemId);
                                  }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="product-name justify-content-center">
                              <p className="common-product-repeated-heading">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <div className="col-md-4 col-lg-5 mx-auto">
                        <div className="wishlist-card">
                          <p className="wishlist-card-text">
                            <span>YOUR WISHLIST IS EMPTY</span>
                          </p>
                          <div>
                            <p className="m-0 wishlist-para">
                              Add items that you like to your wishlist. Review
                              them anytime and easily move them to the bag.
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
                    </>
                  )}
                </div>   
                {wishlistItem && wishlistItem.length > 0 && 
                <div className="row">
                  <div className="col-md-12 continue-shopping-btn">
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
                }        
              </>
            ) : (
              <div className="col-md-12">
                <div className="row ">
                  <div className="col-md-4 col-lg-5 mx-auto">
                    <div className="wishlist-card">
                      <p className="wishlist-card-text">
                        <span>Please Login to see your wishlist</span>
                      </p>
                      <div>
                        <p className="m-0 wishlist-para">
                          Add items that you like to your wishlist. Review them
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
                            navigate("/login");
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Wishlist;
