import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <div style={{ height: 1500 }}></div>
    </div>
  );
};

export default Home;
