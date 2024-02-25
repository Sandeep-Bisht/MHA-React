import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import UserProfile from "../UserProfile";
import MyOrdersList from "../MyOrdersList";
import { useLocation } from "react-router-dom";
import Address from "../Address";
import Footer from "../../../Components/Footer/Footer";

const Dashboard = () => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div className="row py-4">
            <div className="col-md-3">
              <Sidebar selectedMenu={location.pathname} />
            </div>
            <div className="col-md-9">
              {location &&
                (location.pathname === "/user" ||
                  location.pathname === "/user/profile") && <UserProfile />}
              {location && location.pathname === "/user/orders" && (
                <MyOrdersList />
              )}
              {location && location.pathname === "/user/address" && <Address />}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
