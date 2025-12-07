import React from "react";
import Banner from "../../Components/Banner/Banner";
import TopScholarship from "../../Components/TopScholarship/TopScholarship";
import SuccessStories from "../../Components/SuccesStories/SuccessStories";
import Contactus from "../../Components/ContactUs/Contactus";

const Home = () => {
  return (
    <div>
   <Banner></Banner>
   <TopScholarship></TopScholarship>
   <SuccessStories></SuccessStories>
    <Contactus></Contactus>
    </div>
  );
};

export default Home;
