import React, { useEffect, useState } from "react";
import "../../css/contactus.css";
import Footer from "../../Components/Footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { GetHeaders, appUrl } from "../../utils";

const Contact = () => {
  const [msg, setMsg] = useState(undefined);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async () => {
    const { name, emailAddress, phoneNumber, message, country } = getValues();
    const formattedData = {
      country: country,
      emailAddress: emailAddress,
      message: message,
      name: name,
      phoneNumber: Number(phoneNumber),
    };
    let url = `${appUrl}o/c/contactuses/`;
    let response = await axios.post(url, formattedData, GetHeaders());
    if (response) {
      reset();
      setMsg("Your details has been submitted successfully");
      setTimeout(()=> {
        setMsg("")
      }, 3000)
    }
  };

  return (
    <>
      <section className="contact-us-page">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="left-side-texts">
                <div className="discover-wrapper">
                  <p className="contact-heading">Discover Us</p>
                  <p>
                    Discover the timeless elegance and joy of antique and vintage decorative arts with a visit to our studio in Noida.
                  </p>
                </div>
                <div className="visit-us-wrapper">
                  <p className="contact-heading">Visit Us</p>
                  <p>
                    MHA Studio,
                    <br />
                    Urbtech Trade Centre,
                    <br />
                    Sector 132 Noida, Uttar Pradesh 201303.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="email-wrapper">
                      <p className="contact-heading">Email Us</p>
                      <p>For customer service, product or order related inquiries, and suggestions,
                         please contact us by completing the form below or via email at: <a href="mailto:info@modernhouseofantiques.com">info@modernhouseofantiques.com </a></p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="callus-wrapper">
                      <p className="contact-heading">Call Us</p>
                      <p className="">You can also call us at: +919582081905</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="col-md-12 removed">
                <div className="form-wrap-left px-5">
                  <p className="contact-heading">Get in touch with us</p>
                  <p>
                    Thank you for getting in touch! <br /> Kindly fill the form,
                    have a great day!
                  </p>
                </div>
              </div>
              <div className="col-md-12 removed">
                <div className="form-wrap-right removed px-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className=""
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 col-6">
                        <input
                          type="email"
                          placeholder="Your Email"
                          className=""
                          {...register("emailAddress", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          })}
                        />
                        {errors.emailAddress && (
                          <span className="error-message">
                            Please enter a valid email address
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row py-4 removed-1">
                      <div className="col-md-6 col-6">
                        <input
                          type="number"
                          placeholder="Phone Number"
                          className=""
                          {...register("phoneNumber", { required: true })}
                        />
                        {errors.phoneNumber && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 col-6">
                        <input
                          type="text"
                          placeholder="Country"
                          {...register("country", { required: true })}
                        />
                        {errors.country && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="Message"
                          {...register("message", { required: true })}
                        />
                        {errors.message && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-4">
                        <button type="submit" className="login-btn full-address-btn">
                          Submit
                        </button>
                      </div>
                    </div>
                    {msg && <span className="text-success">{msg}</span>}
                  </form>
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

export default Contact;
