import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/singleBlog.css";
import { AiFillInstagram } from "react-icons/ai";
import Footer from "../../Components/Footer/Footer";
import { GetHeaders, appUrl, sites } from '../../utils/index'
import axios from "axios";
import Loader from "../../Components/loader";
import { ReactHTMLConverter } from "react-html-converter/browser";

function SingleBlog() {
  const param = useParams()
  let [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  const converter = new ReactHTMLConverter();


  useEffect(() => {
    if(param){ 
      getSingleBlogDataByFriendlyUrl(param.id)      
    }
    
  },[]);

  const getSingleBlogDataByFriendlyUrl = async(friendlyUrlPath) => {
    let url = `${appUrl}o/mha-headless/commerce/blogs/blogurl/${sites}/${friendlyUrlPath}`;      
      try {
        let response = await axios.get(url, GetHeaders())
        if(response){
          setBlog(response.data.Product_Data.products[0])
          setLoading(false)
        }
      } catch (error) {
        console.log(error, "in blog page")
      }
      
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let returnDateFromString = (val) => {
    let res = val.split("T");
    return res[0];
  };

  return (
    <>
     <Loader loading={loading} />
     { blog && (
      <>
     <div className="cat-wrapper py-lg-4 py-md-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <span>
                <Link to="/" className="bred-crumb-one">
                  Home
                </Link>
              </span>
              <span className="separator">/</span>
              <span>
                <Link to="/blogs" className="bred-crumb-one">
                Blogs
                </Link>
                </span>
              <span className="separator">/</span>
              <span className="bred-crumb-two">{blog && blog.headline}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="single-blog-page">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="single-blog-image">
                <img
                  src={blog && `${appUrl + blog.image.contentUrl}`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="related-blogs pt-2 ">
                <div className="single-blog-text">
                  <div className="single-blog-header">
                    <h1 className="common-heading blog-heading-page text-start pt-0">
                      {blog && blog.headline}
                    </h1>
                  </div>
                  <div className="single-blog-share d-flex justify-content-between">
                    <div className="single-blog-date">
                      <p className="common-para fw-bold">
                        {blog && returnDateFromString(blog.datePublished)}
                      </p>
                    </div>
                    <div className="single-blog-share-icons d-flex align-items-center">                     
                      <a
                        // href="https://www.instagram.com/modernhouseofantiques/"
                        href={blog && blog.customFields && blog.customFields[0].customValue.data}
                        target="_blank"
                        className="fw-bold ps-2 fs-3"
                      >
                        <AiFillInstagram />
                      </a>
                    </div>
                  </div>
                  <div className="single-blog-para">
                    <p className="common-para text-justify">
                      {blog && blog.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row custom-gutter mt-lg-5 mt-md-4">
                  <div className="col-md-12">
                    <div className="tabs-section">
                      <ul
                        className="nav nav-pills "
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                           <h2 className="blog-body-heading">Blog Description</h2>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active tab-1 para-styling blog-article-wrapper"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="">
                            {converter.convert(blog.articleBody)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
      </section>
      </>
     ) }
      <Footer />
    </>
  );
}

export default SingleBlog;
