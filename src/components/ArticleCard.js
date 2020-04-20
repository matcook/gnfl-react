import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ data }) => {
  return (
    <div>
      <h3>{data.Title}</h3>
      <Link to={`/news/${data.Slug}`}>Read More</Link>
    </div>
  );
};

export default ArticleCard;
