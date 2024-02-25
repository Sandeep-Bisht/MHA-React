import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import "../../css/privacypolicy.css";

function index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="policy-condition-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="footer-inner-page-subheading">PRIVACY & POLICY</h2>

              <p className="policy-para">
                Thank you for entrusting your personal information with our
                website. We respect your privacy and are committed to
                safeguarding your personal information. And hence we want you to
                fully understand and become aware about our information
                collection process. This policy outlines the types of personal
                information we collect, how we use it, and the measures we take
                to protect your information. It is understood that by using our
                website, you consent to our collection, use, and disclosure of
                your personal information as described in this privacy policy
                below.
              </p>

              <h2 className="footer-inner-page-subheading">
                1. Collection of Personal Information
              </h2>

              <p className="policy-para">
                We collect personal information that you voluntarily provide to
                us when you register on our website, subscribe to our
                newsletter, fill out a contact form, or make a purchase. The
                personal information we collect may include your name, email
                address, phone number, and address. Our primary goal in doing so
                is to provide you a safe, efficient, and smooth experience.
              </p>

              <h2 className="footer-inner-page-subheading">
                2. Use of Personal Information
              </h2>

              <p className="policy-para">
              We use your personal information to provide you with the products and services you request from us,
 to communicate with you, and to improve your experience on our website. We may also use your personal information to send you marketing materials
 or other communications, but only if you have given us the consent to do so.
              </p>

              <h2 className="footer-inner-page-subheading">
                3. Disclosure of Personal Information
              </h2>

              <p className="policy-para">
              We may disclose your personal information to third-party service providers who assist us in providing our products and services to you.
 These third-party service providers may include payment processors, shipping providers, and website hosting providers.
 We may also disclose your personal information if we are required to do so by law, or if we believe that such disclosure is necessary
 to protect our rights or for the safety of others.
              </p>

              <h2 className="footer-inner-page-subheading">
                4. Protection of Personal Information
              </h2>

              <p className="policy-para">
              We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
 We use industry-standard security technologies to protect your personal information, and we restrict access to your personal information
 to those employees and third-party service providers who need to know that information to provide you with our products and services.
              </p>

              <h2 className="footer-inner-page-subheading">5. Cookies</h2>

              <p className="policy-para">
              Our website uses cookies to improve your experience on our site.
 Cookies are small data files that are placed on your device when you visit our website.
 These cookies help us understand how you use our site and allow us to tailor our content and advertisements to better meet your requirements.
              </p>

              <h2 className="footer-inner-page-subheading">
                6. Changes to Privacy Policy
              </h2>

              <p className="policy-para">
              We may update this privacy policy from time to time by posting a new version on our website.
 You should review this privacy policy periodically to ensure that you are aware of any changes.
              </p>

              <h2 className="footer-inner-page-subheading">7. Contact Us</h2>

              <p className="policy-para">
              If there are any questions or concerns about this issue privacy policy, please contact us using the details on Contact Us page.
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
