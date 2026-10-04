import { Link } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../hooks/useFetch";
import useSeo from "../../hooks/useSeo";

const PageNotFound = () => {
  const { data, loading } = useFetch("/trending/all/week");

  useSeo({ title: "Page not found | Movix", noindex: true });

  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <div className="hero">
          <div className="code" aria-hidden="true">
            <span className="digit">4</span>
            <svg className="reel" viewBox="0 0 100 100" focusable="false">
              <defs>
                <linearGradient id="reelGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f89e00" />
                  <stop offset="100%" stopColor="#da2f68" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="url(#reelGradient)" />
              <g fill="#04152d">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <circle
                    key={angle}
                    cx="50"
                    cy="25"
                    r="9"
                    transform={`rotate(${angle} 50 50)`}
                  />
                ))}
                <circle cx="50" cy="50" r="7" />
              </g>
            </svg>
            <span className="digit">4</span>
          </div>
          <p className="eyebrow">Error 404</p>
          <h1 className="title">This scene didn&apos;t make the final cut</h1>
          <p className="text">
            The page you&apos;re looking for doesn&apos;t exist. The link might
            be old, or the title may have been removed from TMDB. Head back, dig
            into the catalogue, or pick up with something that&apos;s trending.
          </p>
          <div className="actions">
            <Link className="primary" to="/">
              Back to home
            </Link>
            <Link className="secondary" to="/explore/movie">
              Browse movies
            </Link>
            <Link className="secondary" to="/explore/tv">
              Browse TV shows
            </Link>
          </div>
        </div>
      </ContentWrapper>
      <Carousel
        title="Trending this week"
        data={data?.results}
        loading={loading}
      />
    </div>
  );
};

export default PageNotFound;
