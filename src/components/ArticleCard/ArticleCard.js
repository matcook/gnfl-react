import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.scss";

const ArticleCard = ({ data }) => {
  const excerpt = data.Body.split(" ").splice(0, 30).join(" ").concat("...");
  // const excerpt = data.Body.substr(0, 150).concat("...");
  return (
    <div className={styles.horizontalCard} key={data.id}>
      <div className={styles.image}>
        <Link to={`/news/${data.Slug}`}>
          <img
            src={`${process.env.REACT_APP_GNFL_API_URL}${data.Image.url}`}
            alt={`${process.env.REACT_APP_GNFL_API_URL}${data.Image.name}`}
          />
        </Link>
      </div>
      <div className={styles.content}>
        <h3>{data.Title}</h3>
        <p>{excerpt}</p>
        <Link className={styles.button} to={`/news/${data.Slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
