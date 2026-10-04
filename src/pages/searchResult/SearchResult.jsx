/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Search.scss";

import { fetchDataFromApi } from "../../utils/api";
import useSeo from "../../hooks/useSeo";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/moiveCard/moiveCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  useSeo({ title: `Search results for '${query}' | Movix`, noindex: true });

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi("/search/multi", { query, page: 1 }).then((res) => {
      setData(res);
      setPageNum(2);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi("/search/multi", { query, page: pageNum }).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res.results] });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <h1 className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </h1>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      fromSearch={true}
                      mediaType={item?.media_type}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="resultNotFound">
              No results for &apos;{query}&apos;. Check the spelling, try a
              shorter title, or browse{" "}
              <Link to="/explore/movie">movies</Link> and{" "}
              <Link to="/explore/tv">TV shows</Link> instead.
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
