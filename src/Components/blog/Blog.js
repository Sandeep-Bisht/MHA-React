import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { appUrl } from '../../utils/index'

function Blog(props) {
  let blogs = props.blogs;
  let navigate = useNavigate();
  let redirectToSingleBlogPage = (item) => {
    navigate(`/blogs/${item.friendlyUrlPath}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let returnDateFromString = (val) => {
    let res = val.split("T");
    return res[0];
  };
  return (
    <>
      <section className="blog-section">
        <div className="container">
          <div className="row pb-4">
            <h3 className="common-heading letter-space-one">From The Blog</h3>
            {blogs &&
              blogs.length > 0 &&
              blogs.map((item, i) => {
                return (
                     <div key={i} className="col-md-4 col-lg-4 col-6"
                            to={`/blogs/${item.friendlyUrlPath}`}
                            style={{ textDecoration: 'none' }}
                            >
                    <div className="blog-image">
                    <Link
                            to={`/blogs/${item.friendlyUrlPath}`}
                            style={{ textDecoration: 'none' }}
                            >
                      <img
                        src={`${appUrl + item.image.contentUrl}`}
                        alt=""
                        className="img-fluid"
                      ></img>
                      <h4  className="single-blog-title"
                      >
                        {item.headline}
                      </h4>
                      </Link>
                      <div className="may-box d-flex justify-content-between align-items-center py-1">
                        <p className="m-0 blog-color-changed-1">
                          {returnDateFromString(item.datePublished)}
                        </p>

                        <p className="m-0 blog-color-changed-2 d-flex align-items-center">                      

                          <a
                            // href="https://www.instagram.com/modernhouseofantiques/"
                            href={item.customFields && item.customFields[0].customValue.data}
                            target="_blank"
                            className="fw-bold ps-2 fs-3"
                          >
                            <AiFillInstagram />
                          </a>
                        </p>
                      </div>
                      <div className="blog-text">
                        <p>{item.alternativeHeadline}</p>
                        <span 
                        className="blog-read-more"
                        onClick={() => redirectToSingleBlogPage(item)}>
                          Read more
                        </span>
                      </div>
                    </div>
                    </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
