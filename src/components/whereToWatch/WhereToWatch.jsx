/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { getRegion, regionName, saveRegion } from "../../utils/region";

const groups = [
  { key: "flatrate", label: "Stream" },
  { key: "free", label: "Free" },
  { key: "ads", label: "Free with ads" },
  { key: "rent", label: "Rent" },
  { key: "buy", label: "Buy" },
];

const byPriority = (a, b) =>
  (a.display_priority ?? 999) - (b.display_priority ?? 999);

const WhereToWatch = ({ mediaType, id, title, originalTitle, year }) => {
  const { url } = useSelector((state) => state.home);
  const [region, setRegion] = useState(getRegion);

  const { data, loading } = useFetch(`/${mediaType}/${id}/watch/providers`);

  const archiveUrl =
    mediaType === "movie" && title && year && year <= 1995
      ? `/archive?title=${encodeURIComponent(title)}&original=${encodeURIComponent(
          originalTitle || ""
        )}&year=${year}`
      : null;
  const { data: archive } = useFetch(archiveUrl);

  const results = data?.results;

  const countries = useMemo(
    () =>
      Object.keys(results || {}).sort((a, b) =>
        regionName(a).localeCompare(regionName(b))
      ),
    [results]
  );

  const current = results?.[region];

  const rows = groups
    .map((group) => ({
      ...group,
      providers: [...(current?.[group.key] || [])].sort(byPriority),
    }))
    .filter((group) => group.providers.length > 0);

  const options = countries.includes(region) ? countries : [region, ...countries];
  const archiveId = archive?.identifier;

  const onRegionChange = (event) => {
    setRegion(event.target.value);
    saveRegion(event.target.value);
  };

  if (loading) {
    return (
      <div className="whereToWatch">
        <div className="loadingRow skeleton"></div>
      </div>
    );
  }

  if (countries.length === 0 && !archiveId) return null;

  return (
    <section className="whereToWatch" aria-label="Where to watch">
      <div className="head">
        <h2 className="heading">Where to watch</h2>
        {countries.length > 0 && (
          <select
            className="region"
            value={region}
            onChange={onRegionChange}
            aria-label="Country"
          >
            {options.map((code) => (
              <option key={code} value={code}>
                {regionName(code)}
              </option>
            ))}
          </select>
        )}
      </div>

      {rows.map((group) => (
        <div className="group" key={group.key}>
          <span className="label">{group.label}</span>
          <ul className="providers">
            {group.providers.map((provider) => (
              <li key={provider.provider_id}>
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={provider.provider_name}
                  aria-label={`${provider.provider_name}: ${group.label}`}
                >
                  <img
                    src={url.logo + provider.logo_path}
                    alt=""
                    width="44"
                    height="44"
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {rows.length === 0 && countries.length > 0 && (
        <p className="empty">
          Not listed for {regionName(region)} right now.
          {countries.length > 0 && " Pick another country to see where else it is available."}
        </p>
      )}

      {archiveId && (
        <div className="group">
          <span className="label">Free download</span>
          <div className="archive">
            <a
              className="action"
              href={`https://archive.org/download/${archiveId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
            <a
              className="action"
              href={`https://archive.org/details/${archiveId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch free
            </a>
            <span className="note">Public domain, from the Internet Archive</span>
          </div>
        </div>
      )}

      {countries.length > 0 && (
        <p className="credit">
          Availability by{" "}
          <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer">
            JustWatch
          </a>
        </p>
      )}
    </section>
  );
};

export default WhereToWatch;
