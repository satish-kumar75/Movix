import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">
            <Link to="/explore/movie">Movies</Link>
          </li>
          <li className="menuItem">
            <Link to="/explore/tv">TV Shows</Link>
          </li>
          <li className="menuItem">
            <Link to="/about">About</Link>
          </li>
          <li className="menuItem">
            <Link to="/privacy">Privacy</Link>
          </li>
        </ul>
        <p className="infoText">
          Movix is a personal project for finding what to watch next. Browse
          what&apos;s trending, dig into the cast behind a title, and watch a
          trailer before you decide. No account, no sign-up.
        </p>
        <p className="infoText">
          All movie and TV data, posters and photos come from{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by
          TMDB. Movix does not host or store any video; trailers play from
          YouTube and the full player is embedded from a third-party service.
        </p>
        <div className="socialIcons">
          <a
            className="icon"
            href="https://github.com/satish-kumar75/Movix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Movix on GitHub"
          >
            <FaGithub />
          </a>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Movix. Made by Satish Kumar.
        </p>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
