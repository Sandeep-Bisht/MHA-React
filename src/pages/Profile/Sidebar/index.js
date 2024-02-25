import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../css/sidebar.css";

const Sidebar = (props) => {
  const {selectedMenu} = props
  const [isActive, setIsActive] = useState(true)
  const location = useLocation();


  return (
    <section className="profile-wrapper">
      <div className="row profile-sidebar pt-4">
          <div className="sidebox">
            <ul className="ps-0 user-multiple-tabs">
              
              <li className={`${selectedMenu && (selectedMenu.includes("profile")) &&  "siteactive"}`}>
              <Link to="/user/profile" >Profile</Link>
            </li>
              
              
              <li className={`${selectedMenu && selectedMenu.includes("orders") &&  "siteactive"}`}>
                <Link to="/user/orders" onClick={()=>setIsActive(false)}>My Orders</Link>
              </li>
              {/* <li>
                <Link to="/user/return">Return</Link>
              </li> */}
              <li className={`${selectedMenu && selectedMenu.includes("address") &&  "siteactive"}`}>
                <Link to="/user/address" onClick={()=>setIsActive(false)}>Address</Link>
              </li>
              {/* <li className={`${selectedMenu && selectedMenu.includes("term&policy") &&  "siteactive"}`}>
                <Link to="/user/term&policy" onClick={()=>setIsActive(false)}>Terms &#38; Conditions</Link>
              </li> */}
              {/* <li>
                <Link to="/" onClick={() => logOutUser()}>
                  Logout
                </Link>
              </li> */}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
