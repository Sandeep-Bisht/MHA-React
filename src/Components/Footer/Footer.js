import React, { useState, useEffect } from "react";
import Logo1 from "../../images/logo.jpg";
import Discover from "../../images/discover-logo.png";
import MasterCard from "../../images/mastercard-logo.png";
import VisaCard from "../../images/visacard-logo.png";
import AmericanExpress from "../../images/american-express.png"
import GiksLogo from "../../images/New Giks logo.png"
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { GetHeaders, appUrl } from "../../utils";
import "../../css/Common.css";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  let [subEmail, setSubEmail] = useState("");
  let [subLoader, setSubLoader] = useState(false);
  let [subscriptionMessage, setSubscriptaionMessage] = useState();

  let subscriptionEmailOnChangeHandler = (email) => {
    setSubEmail(email);
  };

  let saveSubscriptionEmailAddress = (e) => {
    e.preventDefault();
    setSubLoader(true);
  };

  useEffect(() => {
    if (subLoader) {
      saveSubscription();
    }
  }, [subLoader]);

  let saveSubscription = async () => {
    let obj = {
      status: true,
      emailAddress: subEmail,
    };
    let url = `${appUrl}o/c/subscriptions/`;
    try {
      let response = await axios.post(url, obj, GetHeaders());
      if (response && response.status === 200) {
        setSubscriptaionMessage("Your email has been successfully subscribed");
      }
      setSubEmail("");
      emptySubscriptionMessage();
      setSubLoader(false);
    } catch (error) {
      setSubLoader(false);
    }
  };

  let emptySubscriptionMessage = () => {
    setTimeout(() => {
      setSubscriptaionMessage("");
    }, 2000);
  };

  let location = useLocation();
  let navigate = useNavigate();

  let onClickLogo = () => {
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <footer>
        <section className="footer-page">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="footer-stay-touch">
                  <h5 className="text-end">Stay in Touch</h5>
                </div>
              </div>
              <div className="col-md-6">
                <form
                  className="footer-email"
                  onSubmit={(e) => saveSubscriptionEmailAddress(e)}
                >
                  <input
                    required
                    onChange={(e) =>
                      subscriptionEmailOnChangeHandler(e.target.value)
                    }
                    value={subEmail}
                    placeholder="YOUR E-MAIL ADDRESS"
                    type="email"
                  />
                  <button disabled={subLoader}>
                    {subLoader ? "Subscribing" : "Subscribe"}
                  </button>
                </form>
                <p className="subscribed-email">{subscriptionMessage}</p>
              </div>
              <div className="col-md-3">
                <div className="d-flex blog-display">
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

                  <div className="footer-blog">
                    <Link to="/blogs">
                      <span>Blog</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-border">
              <div className="row">
                <div className="col-md-3 col-lg-3">
                  <div className="footer-mha-logo">
                    <img
                      src={Logo1}
                      alt=""
                      className="img-fluid"
                      onClick={() => onClickLogo()}
                    />
                  </div>
                </div>
                <div className="col-md-2 col-lg-2 col-sm-6 col-6 py-0">
                  <div className="footer-info-links">
                    <p className="footer-heading">Info</p>
                    <Link to="/about">About Us</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/career">Career</Link>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2 col-sm-6 col-6 py-0">
                  <div className="footer-policy-links">
                    <p className="footer-heading">Policies</p>
                    <Link to="/terms&conditions">Terms &#38; Conditions</Link>
                    <Link to="/privacypolicy">Privacy &#38; Policy</Link>
                    <Link to="/shipping&delivery">Shipping &#38; Delivery</Link>
                    <Link to="/returnpolicy">Return &#38; Exchanges</Link>
                    <Link to="/faq">FAQs</Link>
                  </div>
                </div>
                <div className="col-md-5 col-lg-5 col-sm-12">
                  <div className="footer-mha-about">
                    <p className="footer-heading">About</p>
                    <p className="footer-para text-justify">
                      Modern house of Antiques was founded with a passion
                      for vintage & antiques. At MHA, we believe that each
                      artefact is made to perfection. We take pride in our
                      ability to carefully select and curate only the most
                      beautiful objects of the highest standard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>

      <section className="designed-by-section">
        <div className="container">
          <div className="row">
            <div className="designed-wrapper col-lg-12 col-md-12">
              <div className="row align-items-center">
              <div className="col-md-6 col-5 py-0">
                <div className="bank-card-images d-flex">
                  <img src={Discover} alt="" className="img-fluid px-1"></img>
                  <img src={MasterCard} alt="" className="img-fluid"></img>
                  <img src={VisaCard} alt="" className="img-fluid"></img>
                  <img src={AmericanExpress} alt="" className="imgfluid"></img>
                </div>
              </div>
              <div className="col-md-6 col-7 py-0">
                <div className="designed-box ">
                  <p className="row align-items-center">
                   <div className="col-lg-9 col-8 col-md-8 px-0 text-end powered-box">Powered by </div> 
                   <div className="col-lg-3 col-4 col-md-4">

                   <span>
                      <a
                        href="https://giksindia.com/"
                        target="_blank"
                        className="giks-link"
                        rel="noopener noreferrer"
                      >
                         <img src={GiksLogo} alt="" className="img-fluid"></img>
                      </a>
                    </span>
                   </div>
                    
                  </p>
                </div>
              </div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
