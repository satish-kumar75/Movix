/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const listCount = useSelector((state) => state.list.items.length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${encodeURIComponent(query)}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <Link className="logo" to="/" onClick={() => setMobileMenu(false)}>
          <img src={logo} alt="Movix" />
        </Link>
        <ul className="menuItems">
          <li className="menuItem">
            <Link to="/explore/movie" onClick={() => setMobileMenu(false)}>
              Movies
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/explore/tv" onClick={() => setMobileMenu(false)}>
              TV Shows
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/my-list" onClick={() => setMobileMenu(false)}>
              My List
              {listCount > 0 && <span className="count">{listCount}</span>}
            </Link>
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <HiOutlineSearch />
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                aria-label="Search movies and TV shows"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
