import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/moiveCard/moiveCard";
import useSeo from "../../hooks/useSeo";
import { clearList } from "../../store/listSlice";

const MyList = () => {
  const items = useSelector((state) => state.list.items);
  const dispatch = useDispatch();

  useSeo({ title: "My List | Movix", noindex: true });

  return (
    <div className="myListPage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageIntro">
            <h1 className="pageTitle">My List</h1>
            <p className="pageText">
              {items.length > 0
                ? `${items.length} saved ${
                    items.length === 1 ? "title" : "titles"
                  }. Your list stays in this browser and never leaves your device.`
                : "Titles you save show up here. Your list stays in this browser and never leaves your device."}
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              className="clear"
              onClick={() => dispatch(clearList())}
            >
              Clear list
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="content">
            {items.map((item) => (
              <MovieCard
                key={`${item.media_type}-${item.id}`}
                data={item}
                mediaType={item.media_type}
              />
            ))}
          </div>
        ) : (
          <p className="empty">
            Nothing saved yet. Open any movie or show and tap Add to My List, or
            start with{" "}
            <Link to="/explore/movie">movies</Link> or{" "}
            <Link to="/explore/tv">TV shows</Link>.
          </p>
        )}
      </ContentWrapper>
    </div>
  );
};

export default MyList;
