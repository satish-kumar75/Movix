import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";
import useSeo from "../../hooks/useSeo";

const Home = () => {
  useSeo({
    title: "Movix - Trending, Popular & Top Rated Movies and TV Shows",
  });

  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
