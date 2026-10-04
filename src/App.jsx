/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import Person from "./pages/person/Person";
import About from "./pages/about/About";
import Privacy from "./pages/privacy/Privacy";
import MyList from "./pages/myList/MyList";

const App = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    fetchApiConfig();
    generesCall();
  }, []);

  const fetchApiConfig = () => {
    dispatch(
      getApiConfiguration({
        backdrop: "/tmdb-img/w1280",
        poster: "/tmdb-img/w500",
        profile: "/tmdb-img/w342",
        still: "/tmdb-img/w300",
        logo: "/tmdb-img/w92",
      })
    );
  };

  const generesCall = async () => {
    let promises = [];
    let endPoints = ["movie", "tv"];
    let allGeners = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGeners[item.id] = item));
    });

    dispatch(getGenres(allGeners));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/tv/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/person/:personId" element={<Person />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
