import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Loading from "./components/LoadingAnimation";
import { useSelector } from "react-redux";

const HomePage = () => {
  const loadingState = useSelector((state) => state.loadingState.value);
  const [isNotify, setIsNotifyVisible] = useState(false);

  return (
    <div className="relative flex flex-col justify-between items-center min-h-screen">
      <NavBar />
      <div className={`flex justify-between items-center w-full h-full`}>
        <SideBar />
        <Hero />
      </div>
      {loadingState && <Loading />}
      <Footer />
    </div>
  );
};

export default HomePage;
