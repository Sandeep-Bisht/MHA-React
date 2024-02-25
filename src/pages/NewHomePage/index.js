import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineArrowUp } from "react-icons/ai";
import * as ACTIONS from "../allCategories/action";
import "../../css/newhomepage.css";
import { appUrl, baseImageUrl } from "../../utils/index";
import Instagram from "../Insta/instagram";

function NewHomePage(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let backToTop = () => {
    window.scroll(0, 0);
  };
  let [featureProductList, setFeatureProductList] = useState(props.productList);
  let [categoryContent, setCategoryContent] = useState([]);

  let rediretToSubCategories = (category) => {
    navigate(
      category &&
        category.length > 0 &&
        `/${category[0].taxonomyCategoryName.replace(
          / /g,
          "-"
        )}/${category[1].taxonomyCategoryName.replace(/ /g, "-")}`,
      { state: category[1].taxonomyCategoryId }
    );
  };

  useEffect(() => {
    if (
      props.productList &&
      props.productList.length &&
      props.productList.length > 0
    ) {
      setFeatureProductList(props.productList.slice(0, 5));
    }
    dispatch(ACTIONS.resetProductToInitialState());
  }, [props.productList]);

  useEffect(() => {
    if (props.categoryContent !== categoryContent)
      setCategoryContent(props.categoryContent);
  }, [props.categoryContent]);

  let categoryContentForEvenIndexes = (item, category, index) => {
    if (item && item.length > 0) {
      return (
        <div key={index} className="row align-items-center">
          <div className="col-md-6 col-lg-6">
            <div className="summer-table-image">
              {item &&
              item[1].contentFieldValue.image &&
              item[1].contentFieldValue.image.contentUrl ? (
                <img
                  src={`${appUrl}${item[1].contentFieldValue.image.contentUrl}`}
                  alt=""
                  className="img-fluid"
                />
              ) : (
                <iframe
                  src={item[5].contentFieldValue.data}
                  height="460"
                  width="w-100"
                  autoplay
                  controls
                  type="video/mp4"
                ></iframe>
              )}
            </div>
          </div>

          <div className="col-md-6 col-lg-6">
            <div className="summer-table-content">
              <h2 className="common-heading-3 text-start">
                {item[0].contentFieldValue.data}
              </h2>
              <p className="common-para-3 my-excerpt">
                {item[2].contentFieldValue.data}
              </p>
              <span>
                <button
                  type="button"
                  className="common-btn-2"
                  onClick={() => rediretToSubCategories(category)}
                >
                  Shop all &gt;
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  let categoryContentForOddIndexes = (item, category, index) => {
    if (item && item.length > 0) {
      return (
        <div key={index} className="row odd-alignment">
          <div className="col-md-6 col-lg-6 the-sea-image-1">
            <div className="padding-formobile-view">
              {item &&
              item[1].contentFieldValue.image &&
              item[1].contentFieldValue.image.contentUrl ? (
                <img
                  src={`${appUrl}${item[1].contentFieldValue.image.contentUrl}`}
                  alt=""
                  className="img-fluid"
                />
              ) : (
                <iframe
                  src={item[5].contentFieldValue.data}
                  height="460"
                  width="w-100"
                  autoplay
                  controls
                  type="video/mp4"
                ></iframe>
              )}
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="the-sea-content">
              <h2 className="common-heading-3 text-start ">
                {" "}
                {item[0].contentFieldValue.data}
              </h2>
              <p className="common-para-3 my-excerpt">
                {item[2].contentFieldValue.data}
              </p>
              <span>
                <button
                  type="button"
                  className="common-btn-2"
                  onClick={() =>
                    rediretToSubCategories(
                      category,
                      category.taxonomyCategoryId,
                      category.taxonomyCategoryName
                    )
                  }
                >
                  Shop all &gt;
                </button>
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <section className="homepage-content ">
        <div className="container">
          {categoryContent &&
            categoryContent.length > 0 &&
            categoryContent.map((item, index) => {
              if (index % 2 === 0) {
                return categoryContentForEvenIndexes(
                  item.contentFields[0].nestedContentFields,
                  item.taxonomyCategoryBriefs,
                  index
                );
              } else {
                return categoryContentForOddIndexes(
                  item.contentFields[0].nestedContentFields,
                  item.taxonomyCategoryBriefs,
                  index
                );
              }
            })}
        </div>
      </section>

      <section className="homepage-featured-products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="feature-text">
                <h3 className="common-heading">Featured Products</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {featureProductList && featureProductList.length > 0 && (

              <>
                <div className="col-md-3">
                  <div className="feature-product-box-1">
                    <div className="box-1-images row">
                      <Link
                        to={`/product/${
                          featureProductList[0].categories.length > 0 &&
                          featureProductList[0].categories[1].name.replace(
                            / /g,
                            "-"
                          )
                        }/${featureProductList[0].slug}`}
                        className="box-1-image-1 col-md-12 col-6"
                        style={{ textDecoration: "none" }}
                      >
                      
                        <div
                          className="react-magnify"
                          dangerouslySetInnerHTML={{
                            __html:
                              featureProductList &&
                              featureProductList.length > 0 &&
                              featureProductList[0].adaptiveImage.replace(
                                /\/o/g,
                                `${appUrl}o`
                              ),
                          }}
                        ></div>
                        <p className="common-para fw-bolder feature-product-name-price">
                          {featureProductList &&
                            featureProductList.length > 0 &&
                            featureProductList[0].name}
                        </p>
                        <p className="mb-0 feature-product-price">
                          &#x20b9;{" "}
                          {featureProductList &&
                            featureProductList.length > 0 &&
                            Math.round(featureProductList[0].price)}
                        </p>
                      </Link>
                      {featureProductList && featureProductList.length > 1 && (
                        <Link
                          to={`/product/${featureProductList[1].categories[1].name.replace(
                            / /g,
                            "-"
                          )}/${featureProductList[1].slug}`}
                          style={{ textDecoration: "none" }}
                          className="box-1-image-2 col-md-12 col-6"
                         
                        >
                          
                          <div
                            className="react-magnify"
                            dangerouslySetInnerHTML={{
                              __html:
                                featureProductList &&
                                featureProductList.length > 0 &&
                                featureProductList[1].adaptiveImage.replace(
                                  /\/o/g,
                                  `${appUrl}o`
                                ),
                            }}
                          ></div>
                          <p className="common-para fw-bolder feature-product-name-price">
                            {featureProductList &&
                              featureProductList.length > 0 &&
                              featureProductList[1].name}
                          </p>
                          <p className="mb-0 feature-product-price">
                            &#x20b9;{" "}
                            {featureProductList &&
                              featureProductList.length > 0 &&
                              Math.round(featureProductList[1].price)}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {featureProductList && featureProductList.length > 2 && (
              <div className="col-md-6 my-3">
                <Link
                  to={`/product/${featureProductList[2].categories[1].name.replace(
                    / /g,
                    "-"
                  )}/${featureProductList[2].slug}`}
                  className="feature-product-box-2"
                  style={{ textDecoration: "none" }}
                >
                  <div className="box-2-image">
                    <div
                      className="react-magnify"
                      dangerouslySetInnerHTML={{
                        __html:
                          featureProductList &&
                          featureProductList.length > 0 &&
                          featureProductList[2].adaptiveImage.replace(
                            /\/o/g,
                            `${appUrl}o`
                          ),
                      }}
                    ></div>
                    <p className="common-para fw-bolder feature-product-name-price">
                      {featureProductList &&
                        featureProductList.length > 0 &&
                        featureProductList[2].name}
                    </p>
                    <p className="mb-0 feature-product-price">
                      &#x20b9;{" "}
                      {featureProductList &&
                        featureProductList.length > 0 &&
                        Math.round(featureProductList[2].price)}
                    </p>
                  </div>
                </Link>
              </div>
            )}
            {featureProductList && featureProductList.length > 3 && (
              <div className="col-md-3">
                <div className="feature-product-box-3">
                  <div className="box-3-images row">
                    <Link
                      to={`/product/${featureProductList[3].categories[1].name.replace(
                        / /g,
                        "-"
                      )}/${featureProductList[3].slug}`}
                      style={{ textDecoration: "none" }}
                      className="box-3-image-1 col-md-12 col-6"
                    >
                      <div
                        className="react-magnify"
                        dangerouslySetInnerHTML={{
                          __html:
                            featureProductList &&
                            featureProductList.length > 0 &&
                            featureProductList[3].adaptiveImage.replace(
                              /\/o/g,
                              `${appUrl}o`
                            ),
                        }}
                      ></div>
                      <p className="common-para fw-bolder feature-product-name-price">
                        {featureProductList &&
                          featureProductList.length > 0 &&
                          featureProductList[3].name}
                      </p>
                      <p className="mb-0 feature-product-price">
                        &#x20b9;{" "}
                        {featureProductList &&
                          featureProductList.length > 0 &&
                          Math.round(featureProductList[3].price)}
                      </p>
                    </Link>

                    {featureProductList && featureProductList.length > 4 && (
                      <Link
                        to={`/product/${featureProductList[4].categories[1].name.replace(
                          / /g,
                          "-"
                        )}/${featureProductList[4].slug}`}
                        style={{ textDecoration: "none" }}
                        className="box-3-image-2 col-md-12 col-6"
                      >
                        <div
                          className="react-magnify"
                          dangerouslySetInnerHTML={{
                            __html:
                              featureProductList &&
                              featureProductList.length > 0 &&
                              featureProductList[4].adaptiveImage.replace(
                                /\/o/g,
                                `${appUrl}o`
                              ),
                          }}
                        ></div>
                        <p className="common-para fw-bolder feature-product-name-price">
                          {featureProductList &&
                            featureProductList.length > 0 &&
                            featureProductList[4].name}
                        </p>
                        <p className="mb-0 feature-product-price">
                          &#x20b9;{" "}
                          {featureProductList &&
                            featureProductList.length > 0 &&
                            Math.round(featureProductList[4].price)}
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="feature-product-btn">
                <button
                  className="feature-btn"
                  type="button"
                  onClick={() => navigate("/allproducts")}
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      < Instagram />

      

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div
              onClick={() => backToTop()}
              className="back-to-top-icon d-none"
            >
              <AiOutlineArrowUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHomePage;
