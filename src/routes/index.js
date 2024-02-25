import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "../pages/home";
import ProductDetails from "../pages/productdetailspage";
import AllCategories from "../pages/allCategories";
import About from "../pages/about";
import Contact from "../pages/ContuctUS";
import Cart from "../pages/cart";
import Profile from "../pages/Profile/UserProfile";
import Wishlist from "../pages/Wishlist";
import CheckOut from "../pages/CheckOut";
import BlogPage from "../Components/BlogPage/index";
import MyOrdersList from "../pages/Profile/MyOrdersList";
import Sidebar from "../pages/Profile/Sidebar";
import Dashboard from "../pages/Profile/Dashboard";
import SingleBlog from "../pages/singleBlogPage";
import Return from "../pages/Profile/Return";
import Address from "../pages/Profile/Address";
import { AllProductPage } from "../pages/AllProducts";
import Carrer from "../pages/Carrer";
import Search from "../pages/Search";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ComingSoon from "../Components/ComingSoon";
import TermsConditions from "../pages/Terms-Conditions";
import ShippingPolicy from "../pages/Shippingpolicy";
import ReturnPolicy from "../pages/returnpolicy";
import Faq from "../Components/Faq/faq";
import NoOrder from "../pages/noOrder";
import PrivacyPolicy from '../pages/privacyPolicy';
import Success from "../Components/Success/Success";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/*" element={<ProductPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/:cat/:id" element={<AllCategories />} />
      <Route path="/:category/:subcategory/:id" element={<ProductDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/career" element={<Carrer />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/blogs/:id" element={<SingleBlog />} />
      <Route path="/contactus" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/user" element={<Dashboard />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/orders" element={<MyOrdersList />} />
        <Route path="/user/return" element={<Return />} />
        <Route path="/user/address" element={<Address />} />
      </Route>
      <Route path="/allproducts" element={<AllProductPage />} />
      <Route path="/product-search" element={<Search />} />x
      <Route path="/reset-password/" element={<ResetPassword />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route path="/terms&conditions" element={<TermsConditions />} />
      <Route path="/shipping&delivery" element={<ShippingPolicy />} />
      <Route path="/returnpolicy" element={<ReturnPolicy />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
      <Route path="/faq" element={<Faq />} />
      <Route path="/noorder" element={<NoOrder />} />
      <Route path="/success" element={< Success/>} />
    </Routes>
  );
};

export default ApplicationRoutes;
