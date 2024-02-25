import React, { useEffect, useState } from "react";
import "../../css/Common.css"
export let Pagination = (props) => {
  let { totalCount, getProductsOfSelectedPage, products } = props;
  let [pages, setPages] = useState();
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let result = [];
    for (let i = 0; i < totalCount; i++) {
      result.push(i + 1);
    }
    
    setPages(result);
  }, [totalCount]);


  let getSelectedPage = (page) => {
    if (page === "previous") {
      page = currentPage - 1;
    } else if (page === "next") {
      page = currentPage + 1;
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage) {
      getProductsOfSelectedPage(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="container">
      <hr />
     { products && products.length > 0 &&
     <ul className="pagination pagination-lg">
        {currentPage > 1 && (
          <li className="page-item" onClick={() => getSelectedPage("previous")}>
            <button type="button" className="page-link">
              Previous
            </button>
          </li>
        )}
        {pages &&
          pages.map((item, i) => {
            return (
              <li
                key={i}
                className={`${currentPage == i + 1 && "activePage"} page-item `}
                onClick={() => getSelectedPage(item)}
              >
                <button type="button" className="page-link">
                  {item} 
                </button>
              </li>
            );
          })}
        {currentPage !== totalCount && (
          <li className="page-item" onClick={() => getSelectedPage("next")}>
            <button type="button" className="page-link">
              Next
            </button>
          </li>
        )}
      </ul>}
    </div>
  );
};
