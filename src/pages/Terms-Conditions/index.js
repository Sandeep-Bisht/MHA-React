import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import "../../css/terms.css";

function index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="terms-condition-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="footer-inner-page-subheading">
                TERMS & CONDITIONS
              </h2>

              <p className="term-para">
                Welcome to{" "}
                <a
                  href="https://modernhouseofantiques.com/"
                  target="_blank"
                  className="linking"
                  rel="noopener noreferrer"
                >
                  <b>www.modernhouseofantiques.com</b>
                </a>
                , operated by Modern House of antiques, a company registered
                under the laws of India. By using this website, you agree to be
                bound by the following terms and conditions, which govern your
                access to and use of this website. If you do not agree to these
                terms and conditions, please do not use this website.
              </p>

              <h3  className="footer-inner-page-subheading">
                1. USER RESPONSIBILITIES
              </h3>

              <p className="term-para">
                By using this website, you agree to the following user
                responsibilities:
              </p>
              <ul>
                <li>
                  1.1 You must not use this website for any illegal or
                  unauthorized purpose.
                </li>
                <li>
                  1.2 You must not infringe any intellectual property rights,
                  including copyright, trademark, or patent rights, while using
                  this website.
                </li>
                <li>
                  1.3 You must not use this website in any way that could damage
                  or interfere with the functionality, security, or performance
                  of this website.
                </li>
                <li>
                  1.4 You are responsible for maintaining the confidentiality of
                  your account and password, and for restricting access to your
                  computer or device.
                </li>
                <li>
                  1.5 You must not impersonate any person or entity, or
                  misrepresent your affiliation with any person or entity, while
                  using this website.
                </li>
              </ul>

              <h3  className="footer-inner-page-subheading">
                2. INTELLECTUAL PROPERTY RIGHTS
              </h3>

              <p className="term-para">
                This website and its content, including text, images, graphics,
                videos, and software, are the property of [COMPANY NAME] and are
                protected by Indian and international copyright laws. You may
                not reproduce, distribute, or transmit any part of this website
                or its content without the prior written consent of Modern House
                of antiques.
              </p>

              <h3  className="footer-inner-page-subheading">
                3. DISCLAIMER OF WARRANTIES
              </h3>

              <p className="term-para">
                This website and its content are provided on an "as is" basis
                without warranties of any kind, either express or implied,
                including, without limitation, warranties of merchantability,
                fitness for a particular purpose, and non-infringement of
                intellectual property rights.
              </p>

              <h3  className="footer-inner-page-subheading">
                4. LIMITATION OF LIABILITY
              </h3>

              <p className="term-para">
                Modern House of antiques shall not be liable for any damages,
                including, without limitation, indirect, incidental, special, or
                consequential damages arising out of or in connection with the
                use of this website or its content.
              </p>

              <h3  className="footer-inner-page-subheading">
                  5. LINKS TO THIRD-PARTY WEBSITES
              </h3>

              <p className="term-para">
                This website may contain links to third-party websites. Modern
                House of antiques is not responsible for the content, accuracy,
                or opinions expressed on third-party websites, and does not
                endorse any product or service advertised on such websites.
              </p>

              <h3  className="footer-inner-page-subheading">
                6. MODIFICATIONS TO TERMS AND CONDITIONS
              </h3>

              <p className="term-para">
                Modern House of antiques may modify these terms and conditions
                at any time without prior notice. Your continued use of this
                website after any modification constitutes your acceptance of
                the modified terms and conditions.
              </p>

              <h3 className="footer-inner-page-subheading">
                7. GOVERNING LAW AND JURISDICTION
              </h3>

              <p className="term-para">
              These terms and conditions shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts in Noida, India.
              </p>

              <h3 className="footer-inner-page-subheading">
                8. CONTACT US
              </h3>

              <p className="term-para">
              If you have any questions about these terms and conditions, please contact us at <a href="mailto:info@modernhouseofantiques.com">info@modernhouseofantiques.com </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default index;
