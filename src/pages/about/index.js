import React, { useEffect } from "react";
import "../../css/about.css";
import axios from "axios";
import { Carousel } from "primereact/carousel";
import "../../css/home.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Footer from "../../Components/Footer/Footer";
import { GetHeaders, appUrl } from "../../utils";
import { useState } from "react";

const About = () => {
  let [aboutPageData, setAboutPageDate] = useState();
  let [aboutPageBodyData, setAboutPageBodyDate] = useState(undefined);
  let [sectionOne, setSectionOne] = useState();
  let [sectionTwo, setSectionTwo] = useState();
  let [sectionThree, setSectionThree] = useState();
  var arr = [];
  var bodyArray = [];
  const responsiveOptions = [
    {
      breakpoint: "1399px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    if (aboutPageBodyData && aboutPageBodyData.length > 0) {
      setSectionOne(aboutPageBodyData[0]);
      setSectionTwo(aboutPageBodyData[1]);
      setSectionThree(aboutPageBodyData[2]);
    }
  }, [aboutPageBodyData]);

  const getAboutpageContent = async () => {
    const res = await axios.get(
      `${appUrl}o/headless-delivery/v1.0/content-structures/67040/structured-contents?nestedFields=categories`,
      GetHeaders()
    );
    if (res) {
      let response = res.data.items[0].contentFields;
      let bodyContent = res.data.items[1].contentFields;
      if (bodyContent) {
        bodyContent.map((item, ind) => {
          let obj = {};
          item.nestedContentFields.map((el) => {
            if (el.name === "card_image") {
              obj.card_image = el.contentFieldValue.image.contentUrl;
            } else if (el.name === "card_description") {
              obj.card_description = el.contentFieldValue.data;
            } else if (el.name === "card_name") {
              obj.card_name = el.contentFieldValue.data;
            }
          });
          bodyArray.push(obj);
          setAboutPageBodyDate(bodyArray);
        });
      }
      if (response) {
        response.map((item, ind) => {
          let obj = {};
          item.nestedContentFields.map((el) => {
            if (el.name === "card_image") {
              obj.card_image = el.contentFieldValue.image.contentUrl;
            } else if (el.name === "card_description") {
              obj.card_description = el.contentFieldValue.data;
            } else if (el.name === "card_name") {
              obj.card_name = el.contentFieldValue.data;
            }
          });
          arr.push(obj);
          setAboutPageDate(arr);
        });
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAboutpageContent();
  }, []);

  const productTemplate = (aboutPageData) => {
    return (
      <div className="product-item-1 text-center">
        <div className="product-item-content-1">
          <img
            src={`${appUrl}${aboutPageData.card_image}`}
            alt=""
            className="product-image-1 mt-3"
          />
          <p className="common-para colour-change">
            {aboutPageData.card_description}
          </p>
          <p className="common-para colour-change-1">
            {aboutPageData.card_name}
          </p>
          <div></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {sectionOne &&
            <section className="about-page">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="about-left-image">
                      <img
                        src={`${appUrl}${sectionOne.card_image}`}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-right-text">
                      <h1 className="common-heading-2">{sectionOne.card_name}</h1>
                      <p className="common-para text-justify">
                        {sectionOne.card_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

      {sectionTwo &&
            <section className="about-section-2 ">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="about-section-2-header">
                      <h2 className="common-heading">{sectionTwo.card_name}</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mx-auto">
                    <div className="about-section-2-para">
                      <p className="common-para text-center pb-5">
                        {sectionTwo.card_description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="about-section-2-image">
                      <img
                        src={`https://admin.modernhouseofantiques.com/${sectionTwo.card_image}`}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

      {sectionThree &&
            <section className="about-section-4">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-5 mx-auto">
                    <div className="our-vision-right-text">
                      <h4 className="common-heading-2">{sectionThree.card_name}</h4>
                      <p className="common-para text-justify">
                        {sectionThree.card_description}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="our-vision-left-image">
                      <img
                        src={`https://admin.modernhouseofantiques.com/${sectionThree.card_image}`}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-4 pt-3 text-center">
                    <span className="fw-bold">
                      " Thank you for considering Modern house of Antiques. We
                      look forward to sharing our love for vintage & antiques
                      with you! "
                    </span>
                  </div>
                </div>
              </div>
            </section>
          }

      <section className="about-section-6">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-page-carousel">
                <h6 className="common-heading">What is Everyone saying?</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="about-main-carousel"></div>
          </div>
          {aboutPageData && aboutPageData.length > 0 && (
            <div className="carousel-demo">
              <div className="card">
                {/* <Carousel
                numaVisible={1}
                value={aboutPageData && aboutPageData}
                numVisible={4}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                className="custom-carousel"
                circular
                // autoplayInterval={5000}
                itemTemplate={productTemplate}
              /> */}
                <Carousel
                  value={aboutPageData}
                  numScroll={1}
                  numVisible={3}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={productTemplate}
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
