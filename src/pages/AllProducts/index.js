import React, { useEffect, useState } from "react";
import { GetHeaders, channelId, middlewareBaseUrl, appUrl, companyId } from "../../utils";
import axios from "axios";
import { Pagination } from "../../Components/pagination/pagination";
import Loader from "../../Components/loader";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import "../../css/allCategories.css";
export let AllProductPage = () => {
  let navigate = useNavigate();
  let [products, setAllProducts] = useState([]);
  let pageSize = 20;
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  // ====================== All Products Api Request =================================

  useEffect(() => {
    if (products && products.length > 0) {
      setPageCount(Math.ceil(totalCount / pageSize));
    }
  }, [products]);

  let getProduct = async (selectedPagepageNumber) => {
    let url = `${middlewareBaseUrl}commerce/products/${channelId}/${companyId}?page=${selectedPagepageNumber}&pageSize=${pageSize}`;
    try {
      let response = await axios.get(url, GetHeaders());
      if (pageCount !== response.data.Product_Data.totalCount) {
        setLoading(false);
        setTotalCount(response.data.Product_Data.totalCount);
      }
      setAllProducts(response.data.Product_Data.products);
    } catch (error) {}
  };

  let getProductsOfSelectedPage = (pageCount) => {
    setLoading(true);
    getProduct(pageCount);
  };


  return (
    <>
    {loading && 
      <Loader loading={loading}  />
    }
      <section className="cat-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { products && products.length > 0 &&
                <h1 className="common-heading text-uppercase letter-space-one mb-0 pb-1">
                  All Products
                </h1>
              }{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="row pt-4">
                {products &&
                  products.length > 0 &&
                  products.map((item, index) => {
                    const categoryNameWithHyphens = item.categories && item.categories.length && item.categories[1].name.replace(/ /g, '-');
                    return (
                      <Link key={index} className="col-md-3 col-6 col-lg-3"
                      style={{ textDecoration: 'none' }}
                        to={`/product/${categoryNameWithHyphens}/${item.slug}`}
                     
                      >
                        <div
                          className="wishlist-icon"
                        
                        >
                          <div
                            className="product-image "
                            dangerouslySetInnerHTML={{
                              __html: item.adaptiveImage.replace(
                                /\/o/g,
                                `${appUrl}o`
                              ),
                            }}
                          ></div>

                          <div className="product-name">
                            <div>
                              <p className="product-name-size">{item.name}</p>
                              <p className="product-name-sizes">
                                &#8377; {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          products={products && products}
          totalCount={pageCount}
          getProductsOfSelectedPage={getProductsOfSelectedPage}
        />
      </section>
      <Footer />
    </>
  );
};
