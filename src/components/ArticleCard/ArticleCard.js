import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.scss";

const ArticleCard = ({ data }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const articleDate = new Date(data.Date);

  const month = months[articleDate.getMonth()];
  const year = articleDate.getFullYear();

  const excerpt = data.Body.split(" ").splice(0, 30).join(" ").concat("...");
  const imageUrl = `${process.env.REACT_APP_GNFL_API_URL}${data.Image.url}`;
  return (
    <Link to={`/news/${data.Slug}`}>
      <div className={styles.blogCard}>
        <div className={styles.meta}>
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url(${imageUrl}`,
            }}
          ></div>
        </div>
        <div className={styles.description}>
          <h3>{data.Title}</h3>

          <span>{`${month} ${articleDate.getDate()}, ${year}`}</span>
          <p>{excerpt}</p>
          <p className={styles.readMore}>
            <span>Read More</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
