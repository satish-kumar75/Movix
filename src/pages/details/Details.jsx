/* eslint-disable no-unused-vars */
import { useLocation, useParams } from "react-router-dom";
import "./Details.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import PageNotFound from "../404/PageNotFound";
import useFetch from "../../hooks/useFetch";
import Cast from "../details/cast/Cast";
import Seasons from "./seasons/Seasons";
import VideosSection from "./VideosSection/VideoSection";
import Collection from "./carousels/Collection";
import SimilarMovies from "./carousels/SimilarMovies";
import Recommendations from "./carousels/Recommendations";

const Details = () => {
  const { id } = useParams();
  const mediaType = useLocation().pathname.split("/")[1];
  const { data } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const { data: main } = useFetch(`/${mediaType}/${id}`);

  if (
    data?.status_code === 34 ||
    credits?.status_code === 34 ||
    main?.status_code === 34
  ) {
    return <PageNotFound />;
  }

  return (
    <div>
      <DetailsBanner
        video={data?.results?.[0]}
        crew={credits?.crew}
        mediaType={mediaType}
        id={id}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {mediaType === "tv" && <Seasons id={id} />}
      <VideosSection mediaType={mediaType} id={id} />
      {mediaType === "movie" && (
        <Collection
          collection={main?.belongs_to_collection}
          currentId={Number(id)}
        />
      )}
      <SimilarMovies mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
