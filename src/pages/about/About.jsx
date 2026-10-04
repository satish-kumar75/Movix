import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import CircleRating from "../../components/circleRating/CircleRating";
import useFetch from "../../hooks/useFetch";
import useSeo from "../../hooks/useSeo";
import tmdbLogo from "../../assets/tmdb-logo.png";

const features = [
  {
    name: "Trending, popular and top rated",
    text: "See what people are watching today or this week, for both movies and TV.",
  },
  {
    name: "Everything about a title",
    text: "Overview, runtime, crew, trailers and similar picks, all on one page.",
  },
  {
    name: "The people behind it",
    text: "Tap a cast member to read their biography and see the films they're known for.",
  },
  {
    name: "Explore and search",
    text: "Browse the whole catalogue by genre and sort order, or look up something specific.",
  },
];

const legend = [
  { rating: "4.2", label: "Under 5" },
  { rating: "6.1", label: "5 to 7" },
  { rating: "8.3", label: "7 and up" },
];

const stack = ["React", "Redux Toolkit", "Vite", "SASS", "TMDB API", "Vercel"];

const About = () => {
  const { url } = useSelector((state) => state.home);
  const { data } = useFetch("/trending/all/week");

  useSeo({
    title: "About Movix - A Simple Way to Find What to Watch",
    description:
      "Movix is a personal project for browsing movies and TV shows: trending lists, cast and crew, trailers and recommendations, powered by TMDB.",
  });

  const posters = url.poster
    ? data?.results?.filter((item) => item.poster_path).slice(0, 3)
    : undefined;

  return (
    <div className="textPage">
      <header className="pageHero">
        <ContentWrapper>
          <div className="heroGrid">
            <div className="heroCopy">
              <h1 className="title">A simpler way to pick what to watch</h1>
              <p className="lead">
                Movix started with one question: what should I watch tonight? I
                wanted something quick to browse, easy on the eyes and free of
                sign-up walls, so I built it.
              </p>
              <div className="actions">
                <Link className="primary" to="/explore/movie">
                  Start exploring
                </Link>
                <a
                  className="secondary"
                  href="https://github.com/satish-kumar75/Movix"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> View the code
                </a>
              </div>
            </div>
            <div className="posterFan" aria-hidden={!posters?.length}>
              {(posters?.length ? posters : [0, 1, 2]).map((item, index) => (
                <div
                  className={`poster ${posters?.length ? "" : "skeleton"}`}
                  key={item.id || item}
                  style={{ "--i": index }}
                >
                  {posters?.length > 0 && (
                    <img
                      src={url.poster + item.poster_path}
                      alt={`${item.title || item.name} poster`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ContentWrapper>
      </header>

      <ContentWrapper>
        <div className="sections">
          <section className="block">
            <h2>What you can do here</h2>
            <ul className="rows">
              {features.map((feature) => (
                <li key={feature.name}>
                  <strong>{feature.name}</strong>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="block">
            <h2>Reading the rating ring</h2>
            <div className="body">
              <p>
                The circle on each poster is TMDB&apos;s user score out of 10.
                The color tells you at a glance how it was received.
              </p>
              <div className="legend">
                {legend.map((item) => (
                  <div className="legendItem" key={item.label}>
                    <CircleRating rating={item.rating} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="block">
            <h2>Where the data comes from</h2>
            <div className="body">
              <a
                className="source"
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={tmdbLogo} alt="TMDB" />
                <span>
                  Posters, cast photos, overviews and ratings all come from
                  TMDB, a community-built movie and TV database.
                </span>
              </a>
              <p>
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </p>
            </div>
          </section>

          <section className="block">
            <h2>About the video</h2>
            <div className="body">
              <p className="note">
                Movix doesn&apos;t host, upload or store any video. Trailers and
                clips play from YouTube. The full-length player is embedded
                from a third-party service that Movix doesn&apos;t operate or
                control, so what it shows and when it&apos;s available is up to
                that provider.
              </p>
            </div>
          </section>

          <section className="block">
            <h2>How it&apos;s built</h2>
            <div className="body">
              <p>
                Requests to TMDB go through a small server-side proxy, which
                keeps the API key out of your browser and lets the site work on
                networks that block TMDB directly.
              </p>
              <ul className="chips">
                {stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="block closing">
            <h2>Say hello</h2>
            <div className="body">
              <p>
                Found a bug, spotted something that looks off, or have an idea?
                Open an issue or send a pull request. Feedback from people who
                actually use the site is the best way for it to get better.
              </p>
              <p className="signature">Satish Kumar</p>
              <a
                className="primary"
                href="https://github.com/satish-kumar75/Movix"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the repository
              </a>
            </div>
          </section>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default About;
