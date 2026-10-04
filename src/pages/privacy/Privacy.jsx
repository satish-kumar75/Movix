import "../about/style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useSeo from "../../hooks/useSeo";

const Privacy = () => {
  useSeo({
    title: "Privacy Policy | Movix",
    description:
      "Movix has no accounts and no analytics or ad trackers. Here is what happens to your data when you browse, search and play trailers.",
  });

  return (
    <div className="textPage">
      <ContentWrapper>
        <article className="article">
          <h1 className="title">Privacy Policy</h1>
          <p className="meta">Last updated: 4 October 2026</p>
          <p className="lead">
            Movix has no accounts, doesn&apos;t ask for your name or email, and
            doesn&apos;t run analytics or advertising trackers. There&apos;s
            nothing to sign up for and nothing of yours for Movix to keep.
          </p>

          <section>
            <h2>What happens when you use the site</h2>
            <p>
              Your browser talks to Movix. When a page needs movie data or
              images, Movix&apos;s server fetches them from TMDB on your
              behalf, so TMDB sees our server rather than your device. Movix is
              hosted on Vercel, which keeps standard technical logs, such as IP
              address, browser type and the pages requested, to run and secure
              the service.
            </p>
          </section>

          <section>
            <h2>Your searches</h2>
            <p>
              What you type in the search bar is sent to TMDB through Movix to
              find matches. Movix doesn&apos;t save your searches or link them
              to you, but search terms appear in the page address and can show
              up in hosting logs.
            </p>
          </section>

          <section>
            <h2>Other services Movix loads</h2>
            <p>
              A few features load content from other services. They have their
              own privacy policies, and Movix has no control over what they
              collect.
            </p>
            <ul>
              <li>
                <strong>YouTube.</strong> Trailers and clips play from
                YouTube, and the video thumbnails on title pages load directly
                from YouTube&apos;s image servers. Playing a video connects you
                to YouTube, which may set its own cookies.
              </li>
              <li>
                <strong>The embedded player.</strong> The Watch Movie and Watch
                TV Show buttons open a player from a third-party service.
              </li>
              <li>
                <strong>TMDB.</strong> Titles, images and ratings come from
                TMDB, and its policy covers the data it holds.
              </li>
              <li>
                <strong>Social links.</strong> Links on a person&apos;s page
                open that person&apos;s profiles on other sites.
              </li>
            </ul>
          </section>

          <section>
            <h2>Cookies and storage</h2>
            <p>
              Movix itself doesn&apos;t set cookies or use your browser&apos;s
              storage to track you. YouTube and the embedded player may set
              their own when you play a video.
            </p>
          </section>

          <section>
            <h2>Changes and questions</h2>
            <p>
              If this policy changes, the date at the top changes with it.
              Questions are welcome on{" "}
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
        </article>
      </ContentWrapper>
    </div>
  );
};

export default Privacy;
