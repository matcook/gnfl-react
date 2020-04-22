import React from "react";
import Slideshow from "../components/Slideshow/Slideshow";
import MatchCentre from "../components/MatchCentre/MatchCentre";
import News from "./News";
const Home = () => {
  return (
    <>
      <Slideshow />
      <MatchCentre />
      <News />
    </>
  );
};

export default Home;
