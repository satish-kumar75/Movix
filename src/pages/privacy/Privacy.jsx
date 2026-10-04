import "../about/style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useSeo from "../../hooks/useSeo";

const topics = [
  { id: "usage", name: "Using the site" },
  { id: "searches", name: "Your searches" },
  { id: "services", name: "Other services" },
  { id: "cookies", name: "Cookies and storage" },
  { id: "changes", name: "Changes and questions" },
];

const services = [
  {
    name: "YouTube",
    text: "Trailers and clips play from YouTube, and the video thumbnails on title pages load directly from YouTube's image servers. Playing a video connects you to YouTube, which may set its own cookies.",
  },
  {
    name: "The embedded player",
    text: "The Watch Movie and Watch TV Show buttons open a player from a third-party service.",
  },
  {
    name: "TMDB",
    text: "Titles, images and ratings come from TMDB, and its policy covers the data it holds.",
  },
  {
    name: "Social links",
    text: "Links on a person's page open that person's profiles on other sites.",
  },
];

const Privacy = () => {
  useSeo({
    title: "Privacy Policy | Movix",
    description:
      "Movix has no accounts and no analytics or ad trackers. Here is what happens to your data when you browse, search and play trailers.",
  });

  return (
    <div className="textPage">
      <header className="pageHero">
        <ContentWrapper>
          <div className="heroGrid">
            <div className="heroCopy">
              <h1 className="title">Privacy Policy</h1>
              <p className="lead">
                Movix has no accounts, doesn&apos;t ask for your name or email,
                and doesn&apos;t run analytics or advertising trackers.
                There&apos;s nothing to sign up for and nothing of yours for
                Movix to keep.
              </p>
              <p className="meta">Last updated 4 October 2026</p>
            </div>
            <ul className="promises">
              <li>No accounts</li>
              <li>No analytics</li>
              <li>No ad trackers</li>
            </ul>
          </div>
        </ContentWrapper>
      </header>

      <ContentWrapper>
        <div className="policy">
          <nav className="toc" aria-label="On this page">
            <ul>
              {topics.map((topic) => (
                <li key={topic.id}>
                  <a href={`#${topic.id}`}>{topic.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sections">
            <section className="block" id="usage">
              <h2>Using the site</h2>
              <div className="body">
                <p>
                  Your browser talks to Movix. When a page needs movie data or
                  images, Movix&apos;s server fetches them from TMDB on your
                  behalf, so TMDB sees our server rather than your device.
                </p>
                <p>
                  Movix is hosted on Vercel, which keeps standard technical
                  logs, such as IP address, browser type and the pages
                  requested, to run and secure the service.
                </p>
              </div>
            </section>

            <section className="block" id="searches">
              <h2>Your searches</h2>
              <div className="body">
                <p>
                  What you type in the search bar is sent to TMDB through Movix
                  to find matches. Movix doesn&apos;t save your searches or link
                  them to you, but search terms appear in the page address and
                  can show up in hosting logs.
                </p>
              </div>
            </section>

            <section className="block" id="services">
              <h2>Other services</h2>
              <div className="body">
                <p>
                  A few features load content from other services. They have
                  their own privacy policies, and Movix has no control over what
                  they collect.
                </p>
                <dl className="defs">
                  {services.map((service) => (
                    <div key={service.name}>
                      <dt>{service.name}</dt>
                      <dd>{service.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>

            <section className="block" id="cookies">
              <h2>Cookies and storage</h2>
              <div className="body">
                <p>
                  Movix itself doesn&apos;t set cookies or use your
                  browser&apos;s storage to track you. YouTube and the embedded
                  player may set their own when you play a video.
                </p>
              </div>
            </section>

            <section className="block" id="changes">
              <h2>Changes and questions</h2>
              <div className="body">
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
              </div>
            </section>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Privacy;
