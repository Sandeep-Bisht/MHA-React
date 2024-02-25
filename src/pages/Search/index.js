import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { GetHeaders, apiBaseUrl, channelId, appUrl, baseImageUrl } from "../../utils";
import { useNavigate, useLocation, json } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { Pagination } from "../../Components/pagination/pagination";
import "../../css/searchPage.css";

const Search = () => {
  let [searchProduct, setSearchProduct] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState();
  let [products, setAllProducts] = useState([]);
  let [searchResult, setSearchReasult] = useState([]);
  let [productList, setProductList] = useState()
  let [pageSize] = useState(20);
  let [pageNumber] = useState(1);
  let [searchCounter, setSearchCounter] = useState();
  let [searcgPayload, setSearcgPayload] = useState()
  

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   getProduct(pageNumber);
  // }, []);

 

  let getProductPriceByProductId = async (product) => {
    
    for (let i = 0; i < product.length; i++) {
      let url = `${apiBaseUrl}products/${product[i].productId}/skus`;
      let productPriceResponse = await axios.get(url, GetHeaders());
      product[i]["price"] = productPriceResponse.data.items[0].price.price;
      product[i]["skuId"] = productPriceResponse.data.items[0].id;
    }
    // setLoading(false);    
    setAllProducts(product);
    
  };

  useEffect(() => {
    if (location.state) {
      setSearchProduct(location.state);
      let searchPayload = `'${location.state}'`;
      setSearcgPayload(searchPayload)      
      getSearchProduct(searchPayload);
    }
  }, [location.state]);

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setPageCount(Math.ceil(totalCount / pageSize));
    }
  }, [searchResult]);

  let getSearchProduct = async (searchPayload) => {
    let url = `${appUrl}o/headless-commerce-delivery-catalog/v1.0/channels/${channelId}/products?nestedFields=categories&filter=contains(name,${searchPayload})`;

    let searchProductResult = await axios.get(url, GetHeaders());    
    if (searchProductResult.data.items.length > 0) {
      setTotalCount(searchProductResult.data.totalCount)
      setSearchCounter(searchProductResult.data.items.length);
      setSearchReasult(searchProductResult.data.items);
      setProductList(searchProductResult.data.items)
      getProductPriceByProductId(searchProductResult.data.items);
    } else {
      setSearchCounter(null);
      setSearchReasult([]);
    }    
  };

  let redirectToProductDiscriptionPage = (slug, productId) => {
    navigate(`/product/${slug}`, { state: productId });
  };

  let onChangeSearchHandler = (e) => {
    if(e.target.value.length > 0){
      setSearchProduct(e.target.value);
    }else{
      setSearchProduct("")
      setSearchReasult([])
    }
    
  };

  let handleKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      e.preventDefault();
      onClickSearchHandler();
    }
  };

  let onClickSearchHandler = () => {
    if (searchProduct && searchProduct.length > 0) {
      let searchPayload = `'${searchProduct}'`;
      getSearchProduct(searchPayload);
    }
  };

  let getProductsOfSelectedPage = (pageCount) => {
    if(searchProduct){
    getProduct(pageCount, searchProduct);   
    }
  };

  let getProduct = async (selectedPagepageNumber, searchProduct) => {
    let searchPayload = `'${searchProduct}'`;
    let url = `${appUrl}o/headless-commerce-delivery-catalog/v1.0/channels/${channelId}/products?nestedFields=categories&filter=contains(name,${searchPayload})&page=${selectedPagepageNumber}&pageSize=${pageSize}`;
    // let url = `${appUrl}o/headless-commerce-delivery-catalog/v1.0/channels/${channelId}/products?filter=contains(name,${searchPayload})`;
    try {
      let response = await axios.get(url, GetHeaders());
      // if (pageCount !== response.data.totalCount) {
      //   // setPageCount(response.data.pageSize);
      // }
      if(response.data.items && response.data.items.length > 0){
      getProductPriceByProductId(response.data.items);
      setSearchReasult(response.data.items);
      window.scrollTo(0, 0);
      // setProductList(response.data.items)
      }
    } catch (error) {
      console.log(error)
    }
  };

  let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  return (
    <>    
      <section className="search-page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="search-header">
                <h1 className="common-heading text-uppercase letter-space-one mb-0 pb-1">Search Results</h1>
                <p>
                  {searchCounter && searchResult.length > 0
                    ? `${totalCount} Products found for "${capitalizeFirstLetter(
                        searchProduct
                      )}"`
                    : "No Products found"}
                </p>
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="search-input-wrapper">
                <div className="search-input">
                  <button
                    type="button"
                    className="search-input-btn"
                    onClick={(e) => onClickSearchHandler(e)}
                  >
                    <IoSearchOutline />
                  </button>
                  <input
                    type="text"
                    placeholder="Search.."
                    value={searchProduct ? searchProduct : ""}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onChange={(e) => onChangeSearchHandler(e)}
                    className="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cat-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="row pt-4">
                <div className="row">
                  {searchResult &&
                    searchResult.length > 0  &&
                    searchResult.map((item,index) => {
                      return (
                        <Link
                          key={index}
                          className="col-md-3 col-6 col-lg-3"
                          to={ item && item.categories.length > 0 && `/product/${item.categories[1].name.replace(/ /g, '-')}/${item.slug}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="wishlist-icon"
                          // onClick={() =>
                          //   redirectToProductDiscriptionPage(
                          //     item.slug,
                          //     item.productId
                          //   )
                          // }
                          >
                            <div className="product-image ">
                              <img                                
                                src={item.urlImage.replace(
                                  `${baseImageUrl}`,
                                  `${appUrl}`
                                )}
                                className="img-fluid"
                                alt=""
                              />
                            </div>

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
        </div>
        {searchResult && searchResult.length > 0 && (
          <Pagination
          products={productList && productList}
            totalCount={pageCount}
            getProductsOfSelectedPage={getProductsOfSelectedPage}
          />
        )}
      </section>
      <Footer />
    </>
  );
};

export default Search;
