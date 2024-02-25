import React, { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import CarrerImg from "../../images/carrer.png";
import "../../css/carrer.css";
import "../../css/Common.css";

let Carrer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="carrer-page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div>
                <h2 class="footer-inner-page-subheading">Career</h2>
                <p className="common-para">
                  At Modern house of antiques, we pride ourselves on being one
                  of the fastest growing fine art and antique businesses in
                  India. Our passion for the industry has driven us to
                  constantly seek out the best pieces and provide unparalleled
                  service to our customers. If you share our love for vintage &
                  antiques and want to join a team that is committed to
                  excellence, we want to hear from you.
                </p>
                <p className="common-para py-2">
                  To be considered for a position, you should have the following
                  qualifications:
                </p>
                <p className="common-para">
                  A passion for antiques and a deep knowledge of creative design
                  & history Excellent communication skills and a friendly
                  demeanor Understanding of Digital & Social media
                </p>
                <h2 className="footer-inner-page-subheading py-2">
                  How to Apply
                </h2>
                <p className="common-para">
                  To apply for any of these positions, please send your resume
                  and a cover letter to modernhouseofantiques@gmail.com In your
                  cover letter, please explain why you are interested in working
                  for Modern house of antiques and what unique skills and
                  experience you can bring to the team.
                </p>
                <p className="common-para py-2">
                  We are an equal opportunity employer and welcome applicants
                  from all backgrounds and are committed to providing a safe and
                  supportive work environment for everyone.
                </p>
                <p className="common-para">
                  If you share our values and are passionate about antiques, we
                  encourage you to apply today!
                </p>

                <div className="carrer-btn pt-4">
                  <button
                    onClick={() =>
                      (window.location =
                        "mailto:info@modernhouseofantiques.com")
                    }
                    className="login-btn"
                  >
                    Join us
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="carrer-banner-image">
                <img src={CarrerImg} alt="" className="img-fluid"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Carrer;
