import { Link } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useSeo from "../../hooks/useSeo";

const PageNotFound = () => {
  useSeo({ title: "Page not found | Movix", noindex: true });

  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <h1 className="title">404</h1>
        <p className="text">This page could not be found.</p>
        <Link className="homeLink" to="/">
          Back to Movix
        </Link>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
