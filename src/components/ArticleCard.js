import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ data }) => {
  const excerpt = data.Body.split(" ").splice(0, 30).join(" ").concat("...");
  // const excerpt = data.Body.substr(0, 150).concat("...");
  return (
    <div className="articleCard">
      <div className="imageContainer">
        <img
          src={`${process.env.REACT_APP_GNFL_API_URL}${data.Image.url}`}
          alt={data.Image.name}
        />
      </div>
      <div className="articleCardBody">
        {" "}
        <h3>{data.Title}</h3>
        <p>{excerpt}</p>
        <Link to={`/news/${data.Slug}`}>Read More</Link>
      </div>
    </div>
  );
};

export default ArticleCard;
