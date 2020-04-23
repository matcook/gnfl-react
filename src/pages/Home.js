import React from "react";
import Slideshow from "../components/Slideshow/Slideshow";
import MatchCentre from "../components/MatchCentre/MatchCentre";
import News from "./News";
import ClubLinks from "../components/ClubLinks/ClubLinks";
const Home = () => {
  return (
    <>
      <Slideshow />
      <ClubLinks />
      <MatchCentre />
      <News />
    </>
  );
};

export default Home;
