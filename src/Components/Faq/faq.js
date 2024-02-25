import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import "../Faq/faq.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="single-faq">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4 pb-2 footer-inner-page-subheading">FAQs</h2>
              <p className="common-para-3">
                Welcome to our vintage items website! Here are some frequently
                asked questions and their answers to help you with your shopping
                experience:
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-10 mx-auto">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      id="accordionOne"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <span className="one">What are vintage items?</span>
                      <span className="two">
                        <AiOutlineMinus className="icon1" />
                        <AiOutlinePlus className="icon2" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="common-para-3">
                        Vintage items are products that are at least 20 years
                        old and have been previously owned. These items often
                        have a unique aesthetic and quality that is not commonly
                        found in modern products.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      id="accordionTwo"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <span className="one">
                        How do I know if an item is authentic?
                      </span>
                      <span className="two">
                        <AiOutlineMinus className="icon1" />
                        <AiOutlinePlus className="icon2" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="common-para-3">
                        We take great care to ensure that all of our vintage
                        items are authentic. Our team of experts carefully
                        evaluates each item and provides detailed descriptions
                        and photos.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      id="accordionThree"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <span className="one">
                        What condition are the items in?
                      </span>
                      <span className="two">
                        <AiOutlineMinus className="icon1" />
                        <AiOutlinePlus className="icon2" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="common-para-3">
                        Vintage items may show some signs of wear and tear due
                        to their age and previous use. However, we only sell
                        items that are in good condition and free of any
                        significant damage. We provide detailed information
                        about the condition of each item in its description.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      id="accordionFour"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <span className="one">How do I make a purchase?</span>
                      <span className="two">
                        <AiOutlineMinus className="icon1" />
                        <AiOutlinePlus className="icon2" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="common-para-3">
                        To make a purchase, simply browse our selection of
                        vintage items and add the items you wish to purchase to
                        your cart. You can then proceed to the checkout page and
                        complete your payment.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      id="accordionFive"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      <span className="one">
                        Do you offer international shipping?
                      </span>
                      <span className="two">
                        <AiOutlineMinus className="icon1" />
                        <AiOutlinePlus className="icon2" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="common-para-3">
                        Yes, we offer international shipping to most countries.
                        Shipping fees and delivery times may vary depending on
                        the destination. Please reach out to us for more
                        details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      id="accordionSix"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      <span className="one">
                        How do I contact customer service?
                      </span>
                      <span className="two">
                        <AiOutlineMinus className="icon1" />
                        <AiOutlinePlus className="icon2" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="common-para-3">
                        If you have any questions or concerns, please feel free
                        to contact our customer service team. You can reach us
                        by email or through our contact form on the website. We
                        will respond to your inquiry as soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Faq;
