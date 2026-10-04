import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useSeo from "../../hooks/useSeo";

const About = () => {
  useSeo({
    title: "About Movix - A Simple Way to Find What to Watch",
    description:
      "Movix is a personal project for browsing movies and TV shows: trending lists, cast and crew, trailers and recommendations, powered by TMDB.",
  });

  return (
    <div className="textPage">
      <ContentWrapper>
        <article className="article">
          <h1 className="title">About Movix</h1>
          <p className="lead">
            Movix started with one question: what should I watch tonight? I
            wanted something quick to browse, easy on the eyes and free of
            sign-up walls, so I built it.
          </p>

          <section>
            <h2>What you can do here</h2>
            <ul>
              <li>
                See what&apos;s trending today or this week, along with popular
                and top-rated picks for both movies and TV.
              </li>
              <li>
                Open any title to read the overview, check the runtime and
                crew, and watch its trailers.
              </li>
              <li>
                Meet the cast. Tap a name to read their biography and see the
                films they&apos;re known for.
              </li>
              <li>
                Explore the whole catalogue by genre and sort order, or search
                for something specific.
              </li>
            </ul>
          </section>

          <section>
            <h2>Where the data comes from</h2>
            <p>
              Everything you see about a title, from posters and cast photos to
              overviews and ratings, comes from{" "}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDB
              </a>
              , a community-built movie and TV database. The circle on each
              poster is TMDB&apos;s user score out of 10: red below 5, orange
              from 5 up to 7, and green from 7 up.
            </p>
            <p>
              This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
          </section>

          <section>
            <h2>About the video</h2>
            <p>
              Movix doesn&apos;t host, upload or store any video. Trailers and
              clips play from YouTube. The full-length player is embedded from
              a third-party service that Movix doesn&apos;t operate or
              control, so what it shows and when it&apos;s available is up to
              that provider.
            </p>
          </section>

          <section>
            <h2>How it&apos;s built</h2>
            <p>
              Movix uses React, Redux Toolkit, Vite and SASS. Requests to TMDB
              go through a small server-side proxy, which keeps the API key out
              of your browser and lets the site work on networks that block
              TMDB directly. The code is open on{" "}
              <a
                href="https://github.com/satish-kumar75/Movix"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Say hello</h2>
            <p>
              Found a bug, spotted something that looks off, or have an idea?
              Open an issue or send a pull request on GitHub. Feedback from
              people who actually use the site is the best way for it to get
              better.
            </p>
            <p className="signature">Satish Kumar</p>
          </section>
        </article>
      </ContentWrapper>
    </div>
  );
};

export default About;
