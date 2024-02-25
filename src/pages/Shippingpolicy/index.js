import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import "../../css/shipping.css";

function index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="shipping-policy-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="shipping-content">
                <div className="ship-box-1">
                  <h2 className="footer-inner-page-subheading">SHIPPING & DELIVERY</h2>
                  <p className="ship-para">
                    Welcome to our Shipping and Delivery page! Here at Modern
                    House of Antiques, we are committed to delivering your
                    orders to you as quickly and efficiently as possible. We
                    offer shipping services throughout India, so no matter where
                    you are located, you can rest assured that your order will
                    be delivered to your doorstep.
                  </p>

                  <h2 className="footer-inner-page-subheading">1. Shipping Options:</h2>
                  <ul className="ship-para">
                    <li>
                      We offer a variety of shipping options to suit your needs.
                      These include:
                    </li>
                    <li>
                      Standard Shipping: Our standard shipping option usually
                      takes 3-7 business days to deliver your order within
                      India. The delivery time may vary depending on the
                      location of the customer.{" "}
                    </li>
                    <li>
                      Express Shipping: We also offer an express shipping
                      option, which guarantees delivery within 1-3 business days
                      within India. This option is ideal for customers who
                      require their orders to be delivered quickly.{" "}
                    </li>
                  </ul>

                  <h2 className="footer-inner-page-subheading">2. Shipping Costs:</h2>
                  <ul className="ship-para">
                    <li>
                      Shipping costs vary depending on the weight, size, and
                      delivery location of your order. We offer free standard
                      shipping on orders above Rs 5000. For orders below this
                      amount, the standard shipping cost is Rs 1000. You can
                      also opt for our express shipping option for an additional
                      fee.
                    </li>
                  </ul>

                  <h2 className="footer-inner-page-subheading">3. Delivery Process:</h2>
                  <ul className="ship-para">
                    <li>
                      Once your order is placed, you will receive a confirmation
                      email with your order details. We will then process and
                      pack your order, ready for shipment. You will receive a
                      second email once your order has been shipped, along with
                      tracking information so you can keep an eye on the
                      delivery status of your order.
                    </li>
                  </ul>

                  <h2 className="footer-inner-page-subheading">4. Packaging and Handling:</h2>
                  <ul className="ship-para">
                    <li>
                      We understand the importance of properly packaging and
                      handling your packages to ensure that they are delivered
                      in good condition.
                    </li>
                    <li>
                      We provide packaging and handling services to ensure that
                      your packages are packed securely and handled with care.{" "}
                    </li>
                  </ul>

                  <p className="ship-para">
                    Please note that delivery times may vary depending on your
                    location and any unforeseen circumstances, such as weather
                    or other external factors beyond our control. We will do our
                    best to keep you updated on any delays that may occur. If
                    you have any questions or concerns about our shipping and
                    delivery process, please feel free to contact our manager
                    for assistance at <a href="mailto:info@modernhouseofantiques.com">info@modernhouseofantiques.com </a> Thank you
                    for choosing Modern House of Antiques for your online
                    shopping needs. We look forward to delivering your orders to
                    you soon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default index;
