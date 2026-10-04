/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";

const INITIAL_EPISODES = 8;

const Seasons = ({ id }) => {
  const { url } = useSelector((state) => state.home);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const { data: show } = useFetch(`/tv/${id}`);

  const seasons = useMemo(
    () => (show?.seasons || []).filter((season) => season.episode_count > 0),
    [show]
  );

  useEffect(() => {
    setSelected(null);
    setExpanded(false);
  }, [id]);

  const current =
    selected ??
    seasons.find((season) => season.season_number > 0)?.season_number ??
    seasons[0]?.season_number;

  const { data: detail, loading } = useFetch(
    current !== undefined ? `/tv/${id}/season/${current}` : null
  );

  if (seasons.length === 0) return null;

  const episodes = Array.isArray(detail?.episodes) ? detail.episodes : [];
  const visible = expanded ? episodes : episodes.slice(0, INITIAL_EPISODES);

  const chooseSeason = (number) => {
    setSelected(number);
    setExpanded(false);
  };

  return (
    <div className="seasonsSection">
      <ContentWrapper>
        <h2 className="sectionHeading">Seasons and Episodes</h2>
        <div className="seasonChips" role="group" aria-label="Season">
          {seasons.map((season) => (
            <button
              type="button"
              key={season.id}
              className={`chip ${current === season.season_number ? "active" : ""}`}
              aria-pressed={current === season.season_number}
              onClick={() => chooseSeason(season.season_number)}
            >
              {season.season_number === 0
                ? "Specials"
                : `Season ${season.season_number}`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="episodes">
            {[...Array(3)].map((_, index) => (
              <div className="episode" key={index}>
                <div className="still skeleton"></div>
                <div className="details">
                  <div className="lineOne skeleton"></div>
                  <div className="lineTwo skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="episodes">
            {visible.map((episode) => (
              <li className="episode" key={episode.id}>
                <div className="still">
                  {episode.still_path && (
                    <Img
                      src={url.still + episode.still_path}
                      alt={`${episode.name} still`}
                    />
                  )}
                </div>
                <div className="details">
                  <h3 className="name">
                    {episode.episode_number}. {episode.name}
                  </h3>
                  <p className="meta">
                    {[
                      episode.air_date &&
                        dayjs(episode.air_date).format("MMM D, YYYY"),
                      episode.runtime && `${episode.runtime} min`,
                      episode.vote_count > 0 &&
                        `${episode.vote_average.toFixed(1)} / 10`,
                    ]
                      .filter(Boolean)
                      .join("  ·  ")}
                  </p>
                  {episode.overview && (
                    <p className="overview">{episode.overview}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && episodes.length > INITIAL_EPISODES && (
          <button
            type="button"
            className="toggle"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Show fewer episodes" : `Show all ${episodes.length} episodes`}
          </button>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Seasons;
