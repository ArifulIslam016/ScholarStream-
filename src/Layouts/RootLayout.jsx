import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto grow">
        <ScrollRestoration></ScrollRestoration>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
