import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as ACTIONS from "./action";
import * as CART_ACTIONS from "../../pages/cart/action";
import * as CHECKOUT_ACTIONS from "../../pages/CheckOut/action";
import { useToasts } from "react-toast-notifications";
import { FaBars } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgShoppingCart } from "react-icons/cg";
import LoginPage from "../../pages/login";
import { GetHeaders, appUrl } from "../../utils";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import "../../css/Header.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import IdleTimer from "./IdleTimer";
import Logo from "../../images/logo.jpg";
import * as CART_ITEM_ACTIONS from "../../pages/cart/action";
import * as GET_CART_ACTIONS from "../../pages/home/action";

function Header(props) {
  let location = useLocation();
  let dispatch = useDispatch();
  let { addToast } = useToasts();
  let [searchProduct, setSearchProduct] = useState("");
  let [cartItems, setCartItems] = useState();
  let navigate = useNavigate();
  let [showModal, setShowModal] = useState(false);
  let [userInfo, setUserInfo] = useState(null);
  let [categories, setCategories] = useState([]);

  let state = useSelector((state) => state.GetAllCategoriesNameReducer);
  let loginState = useSelector((state) => state.LoginReducer);
  const cartItemState = useSelector((state) => state.CartDetailsReducer);
  const checkoutState = useSelector((state) => state.ProceedCheckoutReducer);
  let getUserCartState = useSelector((state) => state.ProductListReducer);

  const [isTimeout, setIsTimeout] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const timer = new IdleTimer({
        timeout: 1800, //expire after 30 min
        onTimeout: () => {
          logOutUser();
          setShowTimeoutModal(true);
          setIsTimeout(true);
        },
        onExpired: () => {
          //do something if expired on load
          setIsTimeout(true);
        },
      });

      return () => {
        timer.cleanUp();
      };
    }
  }, [userInfo]);

  useEffect(() => {
    if (loginState.userLoginSuccess) {
      if (loginState.userLoginSuccess.login_data[0].statusCode === 200) {
        let body = document.getElementById("body");
        let root = document.getElementById("root");
        body.classList.remove("position-relative");
        body.classList.remove("random");
        root.classList.remove("disableScroll");
        setShowModal(false);
      } else if (loginState.userLoginSuccess.login_data[0].statusCode === 404) {
        setShowModal(true);
      }
    }
  }, [loginState.userLoginSuccess]);

  useEffect(() => {
    if (loginState.userLoginFailure) {
      setShowModal(true);
    }
  }, [loginState.userLoginFailure]);

  let openModal = () => {
    setShowModal(true);
  };

  let closeModal = () => {
    setShowModal(false);
  };

  // ===========================All Categories API Call==========================
  useEffect(() => {
    if (sessionStorage.getItem("navigationData")) {
      setCategories(JSON.parse(sessionStorage.getItem("navigationData")));
    } else {
      dispatch(ACTIONS.getAllCategoriesName());
    }
  }, []);

  // ===========================All Categories API Response==========================
  useEffect(() => {
    if (
      state.getAllCategoriesSuccess &&
      state.getAllCategoriesSuccess.items.length > 0
    ) {
      combineCategoryWithSubCategory(state.getAllCategoriesSuccess.items);
    }
  }, [state.getAllCategoriesSuccess]);

  let combineCategoryWithSubCategory = async (categories) => {
    let arr = [];
    for (let i = 0; i < categories.length; i++) {
      let url = `${appUrl}o/headless-admin-taxonomy/v1.0/taxonomy-categories/${categories[i].id}/taxonomy-categories`;
      let subCategoryResponse = await axios.get(url, GetHeaders());
      if (
        subCategoryResponse &&
        subCategoryResponse.data &&
        subCategoryResponse.data.items &&
        subCategoryResponse.data.items.length > 0
      ) {
        let subCategoryArr = [];
        for (let subCategory of subCategoryResponse.data.items) {
          var subCategoryObj = {
            subCategoryId: subCategory.id,
            subCategoryName: subCategory.name,
          };
          subCategoryArr.push(subCategoryObj);
        }
        let categoryObj = {
          categoryName: categories[i].name,
          categoryId: categories[i].id,
          subCategoriesItems: subCategoryArr,
        };
        arr.push(categoryObj);
      } else {
        let categoryObj = {
          categoryName: categories[i].name,
          categoryId: categories[i].id,
        };
        arr.push(categoryObj);
      }
    }
    sessionStorage.setItem("navigationData", JSON.stringify(arr));
    setCategories(arr);
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        dispatch(GET_CART_ACTIONS.getUserCartId(parseInt(userInfo.accountId)));
      }
    }
  }, []);

  useEffect(() => {
    if (props && props.cartItems) {
      setCartItems(props.cartItems);
    } else {
      setCartItems(0);
    }
  }, [props.cartItems]);

  useEffect(() => {
    if (
      localStorage.getItem("cartItems") ||
      checkoutState.proceedToCheckoutSuccess
    ) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }
  }, [
    localStorage.getItem("cartItems"),
    checkoutState.proceedToCheckoutSuccess,
  ]);

  useEffect(() => {
    if (JSON.parse(JSON.stringify(localStorage.getItem("userInfo")))) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, [
    JSON.parse(JSON.stringify(localStorage.getItem("userInfo"))),
    loginState.userLoginSuccess,
  ]);

  useEffect(() => {
    if (loginState.userLoginSuccess && loginState.userLoginSuccess.login_data) {
      setUserInfo(loginState.userLoginSuccess.login_data[0]);
      if (loginState.userLoginSuccess.login_data[0].openOrderId > 0) {
        let cartId = loginState.userLoginSuccess.login_data[0].openOrderId;
        dispatch(CART_ACTIONS.getCartDetails(cartId));
        localStorage.removeItem("cartId");
        localStorage.removeItem("cartItems");
        if (loginState.userLoginSuccess.login_data[0].openOrderId > 0) {
          localStorage.setItem(
            "cartId",
            loginState.userLoginSuccess.login_data[0].openOrderId
          );
        }
      }
    }
  }, [loginState.userLoginSuccess]);

  // ==================================Get Cart Details Success ===================================
  useEffect(() => {
    if (
      cartItemState.cartDetailsSuccess &&
      cartItemState.cartDetailsSuccess.items
    ) {
      setCartItems(cartItemState.cartDetailsSuccess.items.length);
      localStorage.setItem(
        "cartItems",
        cartItemState.cartDetailsSuccess.items.length
      );
    }
  }, [cartItemState.cartDetailsSuccess]);

  // ==============================Reset to initial state ===========================================

  const resetToInitialState = () => {
    dispatch(CART_ACTIONS.resetCartToInitialState());
    dispatch(CHECKOUT_ACTIONS.resetAddressToInitialState());
  };

  let logOutUser = () => {
    setUserInfo(null);
    resetToInitialState();
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartId");
    localStorage.removeItem("userInfo");
    addToast("Success!", {
      appearance: "success",
      content: `You have been logged out successfully`,
    });
    setUserInfo(null);
    setCartItems(0);
    navigate("/");
  };

  let onChangeSearchHandler = (e) => {
    setSearchProduct(e.target.value);
  };

  let onClickSearchBarHandler = (e) => {
    if (searchProduct && searchProduct.length > 0) {
      closeMegaMenu();
      e.preventDefault();
      setSearchProduct("");
      navigate(`/product-search`, { state: searchProduct });
    }
  };

  let handleKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      closeMegaMenu();
      e.preventDefault();
      setSearchProduct("");
      e.target.blur();
      navigate(`/product-search`, { state: searchProduct });
    }
  };

  let closeMegaMenu = (subCatId, subCatName) => {
    closeNav();
  };


  let openNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
    let body = document.getElementById("body");
    body.classList.add("position-relative");
    body.classList.add("random");
    let root = document.getElementById("root");
    root.classList.add("disableScroll");
  };

  let closeNav = () => {
    let breadcrum = document.getElementById("root");
    breadcrum.classList.remove("overflow-hidden");
    document.getElementById("mySidenav").style.width = "0";
    let body = document.getElementById("body");
    body.classList.remove("position-relative");
    body.classList.remove("random");
    breadcrum.classList.remove("disableScroll");
  };

  let handleBreadcrum = () => {
    let breadcrum = document.getElementById("root");
    breadcrum.classList.add("overflow-hidden");
  };

  const [classes, setClasses] = useState();

  let changeClass = (className) => {
    setClasses(className);
  };

  useEffect(() => {
    if (showTimeoutModal && isTimeout) {
      let body = document.getElementById("body");
      let root = document.getElementById("root");
      body.classList.add("position-relative");
      body.classList.add("random");
      root.classList.add("disableScroll");
    }
  }, [showTimeoutModal, isTimeout]);

  const CloseModal = () => {
    let body = document.getElementById("body");
    let root = document.getElementById("root");
    body.classList.remove("position-relative");
    body.classList.remove("random");
    root.classList.remove("disableScroll");
    setShowTimeoutModal(false);
  };

  const handleReloadAndNavigate = async () => {
    if (localStorage.getItem("userInfo")) {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        dispatch(GET_CART_ACTIONS.getUserCartId(parseInt(userInfo.accountId)));
        navigate("/");
        window.location.reload();
      }
    } else {
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (
      getUserCartState.cartIdSuccess &&
      getUserCartState.cartIdSuccess.items &&
      getUserCartState.cartIdSuccess.items.length > 0
    ) {
      let cartId = getUserCartState.cartIdSuccess.items[0].id;
      if (cartId) {
        localStorage.setItem(
          "cartId",
          getUserCartState.cartIdSuccess.items[0].id
        );
        dispatch(CART_ITEM_ACTIONS.getCartDetails(cartId));
      }
    } else {
      if (localStorage.getItem("userInfo")) {
        localStorage.removeItem("cartId");
        localStorage.removeItem("cartItems");
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.openOrderId = "0";
        setCartItems();
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    }
  }, [getUserCartState.cartIdSuccess]);

  return (
    <>
      <header>
        <section className="navigation-bar-1">
          <div className="container">
            <div className="brdrs">
              <div className="row py-3 align-items-center custom-gutter">
                <div className="col-md-3 col-2 col-lg-3">
                  <nav className="navbar navbar-expand-lg  p-0 accordion-display-wrapper">
                    <div className="accordion-section-menu">
                      <button
                        className="accordion-box-open"
                        type="button"
                        onClick={openNav}
                      >
                        <span className="navbar-toggler-icon">
                          <FaBars onClick={() => handleBreadcrum()} />
                        </span>
                      </button>
                    </div>
                  </nav>
                  <div className="d-flex">
                    <div className="header-blog">
                      <Link to="/">
                        <FaInstagram
                          onClick={() =>
                            window.open(
                              "https://www.instagram.com/modernhouseofantiques/"
                            )
                          }
                        />
                      </Link>
                    </div>

                    <div className="header-blog">
                      <Link to="/blogs">
                        <span>Blog</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-7 col-lg-6 padding-removed">
                  <div className="header-brand-name d-flex">
                    <span
                      onClick={() => handleReloadAndNavigate()}
                      style={{ cursor: "pointer" }}
                    >
                      <h1>Modern House of Antiques</h1>
                    </span>
                  </div>
                </div>
                <div className="col-md-3 col-3 col-lg-3">
                  <div className="header-login-bar-wrapper">
                    <div className="header-login-bar">
                      {userInfo && userInfo.userId ? (
                        <>
                          <div className="dropdown">
                            <a
                              className="icon m-0 dropdown-toggle"
                              role="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              aria-current="page"
                            >
                              <FiUserCheck />
                              <IoIosArrowDown className="mobile-user-view-icon" />
                            </a>
                            <ul
                              className="dropdown-menu br-dr after-login-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li>
                                <Link
                                  className="dropdown-item-1"
                                  to="/user/profile"
                                >
                                  My Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item-2"
                                  to="/wishlist"
                                >
                                  Wishlist
                                </Link>
                              </li>
                              <li>
                                <span
                                  className="dropdown-item-1"
                                  onClick={() => logOutUser()}
                                >
                                  Logout
                                </span>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <a
                            className="mobile-view-user"
                            onClick={() => openModal()}
                          >
                            <BiUser />
                          </a>
                          <a
                            className="header-login-text"
                            onClick={() => openModal()}
                          >
                            Login
                          </a>
                        </>
                      )}

                      <Link className="header-cart-icon" to="/cart">
                        <div className="cart-counter">
                          <CgShoppingCart />
                          {cartItems && cartItems > 0 ? (
                            <p className="cart-number">{cartItems}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </Link>

                      <div className="header-search-icon">
                        <div id="search-icon">
                          <span
                            id="search-bar"
                            onClick={(e) => onClickSearchBarHandler(e)}
                          >
                            <IoSearchOutline />
                          </span>
                          <input
                            onKeyDown={(e) => handleKeyPress(e)}
                            onChange={(e) => onChangeSearchHandler(e)}
                            type="text"
                            value={searchProduct && searchProduct}
                            placeholder="Search.."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="navbar navbar-expand-lg text-dark accordion-display-closed">
              <div className="container px-0">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main_nav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main_nav">
                  <ul className="navbar-nav">
                    {categories &&
                      categories.length > 0 &&
                      categories.map((item, index) => {
                        let isUrlPresent = item.subCategoriesItems.some(
                          (item) =>
                            location.pathname.includes(
                              encodeURI(item.subCategoryName.replace(/ /g, "-"))
                            )
                        );
                        return (
                          <li
                            key={index}
                            className="nav-item dropdown"
                            id="myDropdown"
                          >
                            <Link
                              id={
                                isUrlPresent
                                  ? "categoriesActive"
                                  : `category${index + 1}`
                              }
                              className={`nav-link`}
                              to="#"
                              data-bs-toggle="dropdown"
                            >
                              {item.categoryName} <MdKeyboardArrowDown />
                            </Link>

                            <ul className="dropdown-menu">
                              {item.subCategoriesItems &&
                                item.subCategoriesItems.length > 0 &&
                                item.subCategoriesItems.map((el) => {
                                  const categoryNameWithHyphens =
                                    item.categoryName.replace(/ /g, "-");
                                  const subCategoryNameWithHyphens =
                                    el.subCategoryName.replace(/ /g, "-");
                                  const toURL = `${categoryNameWithHyphens}/${subCategoryNameWithHyphens}`;
                                  return (
                                    <Link
                                      key={el.subCategoryId}
                                      to={toURL}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <div className="dropdown-item">
                                        {el.subCategoryName}
                                      </div>
                                    </Link>
                                  );
                                })}
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </section>

        <section className="showModal">
          {showModal && (
            <Modal
              open={showModal}
              onClose={() => closeModal()}
              classNames={classes}
            >
              <LoginPage onClose={closeModal} currentModal={changeClass} />
            </Modal>
          )}
        </section>
      </header>
      {showTimeoutModal && isTimeout ? (
        <>
          <section className="showModal1 container-fluid " id="myModal">
            <div className="row">
              <div className="col-md-5 mx-auto">
                <div className="guest-user-modal">
                  <div className="pic-close-btn-wrapper">
                    <div>
                      <img className="img-fluid" src={Logo} alt="" />
                    </div>
                  </div>

                  <p className="py-3">
                    Your session has expired, please login to continue.
                    <br />
                    <button
                      className="login-btn w-auto px-5 mt-3"
                      onClick={CloseModal}
                    >
                      Ok
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="accordion-box" id="mySidenav">
            <div className="header-serach-close-wrapper">
              <div className="closebtn" onClick={() => closeNav()}>
                <RiCloseCircleLine />
              </div>
              {/* Mobile search */}
              <form>
                <div className="mobile-search">
                  <span
                    className="mobile-search-icon"
                    onClick={(e) => onClickSearchBarHandler(e)}
                  >
                    <BiSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search.."
                    onKeyDown={(e) => handleKeyPress(e)}
                    onChange={(e) => onChangeSearchHandler(e)}
                    value={searchProduct && searchProduct}
                  ></input>
                </div>
              </form>
            </div>

            <Accordion allowZeroExpanded>
              {categories &&
                categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <AccordionItem key={item.categoryId}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <div className="row">
                            <a>{item.categoryName}</a>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>

                      <AccordionItemPanel>
                        {item.subCategoriesItems &&
                          item.subCategoriesItems.length > 0 &&
                          item.subCategoriesItems.map((el) => {
                            const categoryNameWithHyphens =
                              item.categoryName.replace(/ /g, "-");
                            const subCategoryNameWithHyphens =
                              el.subCategoryName.replace(/ /g, "-");
                            const toURL = `${categoryNameWithHyphens}/${subCategoryNameWithHyphens}`;

                            return (
                              <div className="row" key={el.subCategoryId}>
                                <div className="mega_menu_item">
                                  <div className="col-md-12">
                                    <Link
                                      to={toURL}
                                      state={el.subCategoryId}
                                      onClick={() =>
                                        closeMegaMenu(
                                          el.subCategoryId,
                                          el.subCategoryName
                                        )
                                      }
                                    >
                                      {el.subCategoryName}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
