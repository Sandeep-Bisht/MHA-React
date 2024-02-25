import React, { useEffect, useState } from "react";
import "./blogHeader.css";
import { AiFillInstagram } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { appUrl } from "../../utils";

const BlogHeader = (props) => {
  let [blogHeaderData, setBlogHeaderData] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (props && props.blog) {
      setBlogHeaderData(props.blog);
    }
  }, [props.blog]);

  let redirectToSingleBlogPage = (item) => {
    navigate(`/blogs/${item.friendlyUrlPath}`);
  };

  let returnDateFromString = (val) => {
    let res = val.split("T");
    return res[0];
  };

  console.log(".customFields[0].customValue.data ", )

  return (
    <section className="">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="blog-header">
              <div className="blog-head-image">
                <img
                  src={
                    blogHeaderData &&
                    `${appUrl + blogHeaderData.image.contentUrl}`
                  }
                  alt=""
                  className="img-fluid"
                />
                <div className="blog-head-text-wrapper">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="blog-head-text">
                        <h1 className="common-heading pb-3">
                          {blogHeaderData && blogHeaderData.headline}
                        </h1>
                        <p className="common-para text-justify brdr-top pt-3">
                          {blogHeaderData && blogHeaderData.alternativeHeadline}{" "}
                          ...
                        </p>
                        <div className="blog-head-social">
                          <div className="blog-head-social-text">
                            <p className="fw-bold common-para mb-0">
                              {blogHeaderData && returnDateFromString(blogHeaderData.dateCreated)}
                            </p>
                          </div>
                          <div className="blog-head-social-image d-flex">
                            
                            <a
                              // href="https://www.instagram.com/modernhouseofantiques/"
                              // href={item.customFields && item.customFields[0].customValue.data}
                               href={blogHeaderData && blogHeaderData.customFields && blogHeaderData.customFields[0] &&  blogHeaderData.customFields[0].customValue.data}
                              target="_blank"
                              className="fw-bold ps-2 fs-3"
                            >
                              <AiFillInstagram />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="blog-head-btn">
                        <button
                          className="common-btn-2 bg-white w-auto fw-bold"
                          onClick={() =>
                            redirectToSingleBlogPage(blogHeaderData)
                          }
                        >
                          Continue Reading
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;
