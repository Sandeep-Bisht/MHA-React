import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogHeader from "../../pages/blogHeader";
import Blog from "../blog/Blog";
import * as ACTIONS from "../../pages/home/action";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";

const BlogPage = () => {
  let [blogs, setBlogs] = useState([]);
  let dispatch = useDispatch();
  let state = useSelector((state) => state.ProductListReducer);
  useEffect(() => {
    dispatch(ACTIONS.getBlogs());
  }, []);

  useEffect(() => {
    if (state.getBlogsSuccess && state.getBlogsSuccess !== blogs) {
      setBlogs(state.getBlogsSuccess.items);
    }
  }, [state.getBlogsSuccess]);

  return (
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
              <span className="bred-crumb-two">Blogs</span>
            </div>
          </div>
        </div>
      </div>
      <BlogHeader  blog={blogs[0]} />
      <Blog blogs={blogs} />
      <Footer />
    </>
  );
};

export default BlogPage;
