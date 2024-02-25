import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactHTMLConverter } from "react-html-converter/browser";
import { useNavigate } from "react-router-dom";
import "../../css/allCategories.css";
import * as ACTIONS from "./action";
import Loader from "../../Components/loader";
import Footer from "../../Components/Footer/Footer";
import ComingSoon from "../../Components/ComingSoon";
import { appUrl, GetHeaders, middlewareBaseUrl, companyId, channelId } from "../../utils/index"
import axios from "axios";
import { Pagination } from "../../Components/pagination/pagination";


const AllCategories = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let param = useParams();
  let location = useLocation();
  const [loading, setLoading] = useState(true);
  let pageSize = 20;
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const converter = new ReactHTMLConverter();
  const  [categorieId, setCategorieId] = useState()

  let [productList, setProductList] = useState([]);
  let state = useSelector((state) => state.ProductListByCategoriesReducer);

  const [categoryName, setCategoryName] = useState();
  const [categoryDesc, setCategoryDesc] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productList]);

  useEffect(() => {
    if (productList && productList.length > 0 && totalCount) {
      setPageCount(Math.ceil(totalCount / pageSize));
    }
  }, [productList]);


  // =====================Getting Product by Categories=========================
  useEffect(() => {
    if(param.id){
      getSubCategoryId(param.id)
      
    }       
  }, [param.id]);

  const getSubCategoryId = async (subCatId) => {
    let url = `${middlewareBaseUrl}commerce/products/subCategory/42326/${param.id.replace(/-/g, '%20')}`
    let response =  await axios.get(url,  GetHeaders());
    if(response && response.data) {
      let categoriesId = response.data.Product_Data.categoryId
      setCategorieId(categoriesId)
      if(!(state && state.productByCategoriesSuccess && state.productByCategoriesSuccess.Product_Data.categoryName == param.id.replace(/-/g, ' '))){
        setLoading(true)
        dispatch(ACTIONS.getProductByCategories(categoriesId));
      }
      
    }

  }

  //===================Get Product by Categories API Response=========================
  useEffect(() => {
    if (state.productByCategoriesSuccess) {
      setLoading(false);
      window.scroll(0, 0)
     
      if (state.productByCategoriesSuccess.Product_Data && state.productByCategoriesSuccess.Product_Data.products.length > 0) {
        setTotalCount(state.productByCategoriesSuccess.Product_Data.totalCount)
        setProductList(state.productByCategoriesSuccess.Product_Data.products);
        setCategoryName(
          state.productByCategoriesSuccess.Product_Data.categoryName
        );
        setCategoryDesc(
          state.productByCategoriesSuccess.Product_Data.categoryDescription
        );
        setCategoryName(state.productByCategoriesSuccess.Product_Data.categoryName)
      } else {
        setProductList(undefined);
      }
    }
  }, [state.productByCategoriesSuccess]);

 

  let getProductsOfSelectedPage = (pageCount) => {
    if(categorieId > 0){
    setLoading(true);
    getProduct(pageCount);
    }
    
  };

  let getProduct = async (selectedPagepageNumber) => {
    if(categorieId > 0){
    let url = `${middlewareBaseUrl}commerce/category/products/${channelId}/${companyId}?page=${selectedPagepageNumber}&pageSize=${pageSize}&categoryId=${categorieId}`
    try {
      let response = await axios.get(url, GetHeaders());
      if (pageCount !== response.data.Product_Data.totalCount) {
        setLoading(false);
        setTotalCount(response.data.Product_Data.totalCount);
      }
      setProductList(response.data.Product_Data.products);
    } catch (error) {}
    }
   
  };
  return (
    <>
      <Loader loading={loading} />
      {!productList ?  <ComingSoon /> :
         
         (
          <section className="cat-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  {productList && productList.length > 0 && (
                    <div className="mt-3">
                      <span>
                        <Link to="/" className="bred-crumb-one">
                          Home
                        </Link>
                      </span>
                      <span className="separator">/</span>
                      <span className="bred-crumb-two">
                        {categoryName}
                      </span>
                    </div>
                  )}
                  <div className="col-lg-10 col-md-11 mx-auto py-3">
                    <h1 className="common-heading text-uppercase letter-space-one mb-0 pb-1">
                      {categoryName}
                    </h1>
                    <p className="common-para text-center">
                    {converter.convert(categoryDesc)}
                    </p>
                  </div>
                  <hr></hr>
                  <div className="row pt-4">
                    <div className="col-lg-12">
                    <div className="row ">
                      {productList &&
                        productList.length > 0 &&
                        productList.map((item, index) => {
                          return (
                            <Link key={index} className="col-md-3 col-6 col-lg-3" 
                            to={`/product/${categoryName.replace(/ /g, '-')}/${item.slug}`}
                            style={{ textDecoration: 'none' }}
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
                                    <p className="product-name-size">
                                      {item.name}
                                    </p>
                                    <p className="product-name-sizes">
                                      &#8377; {Math.round(item.price)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </div></div>
                  </div>
                </div>
              </div>
            </div>
            {totalCount && totalCount > 20 &&
            <Pagination
            products={productList && productList}
            totalCount={pageCount}
            getProductsOfSelectedPage={getProductsOfSelectedPage}
          />
            }
  
          </section>
        )
         }

      <Footer />
    </>
  );
};

export default AllCategories;
