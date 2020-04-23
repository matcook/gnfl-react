import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./ArticleTemplate.module.scss";

const news = gql`
  query news($slug: String!) {
    articles(sort: "Date:asc", where: { Slug: $slug }) {
      id
      Title
      Date
      Body
      Slug
      Image {
        name
        url
      }
    }
  }
`;

const ArticleTemplate = (props) => {
  const slug = props.match.params.slug;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const { loading, error, data } = useQuery(news, {
    variables: {
      slug,
    },
  });

  if (loading) {
    return (
      <div className="container">
        <span>Loading...</span>
      </div>
    );
  }
  if (error) {
    console.error(error);
  }
  if (data) {
    const article = data.articles[0];

    const articleDate = new Date(article.Date);

    const day = days[articleDate.getDay()];
    const month = months[articleDate.getMonth()];
    const year = articleDate.getFullYear();
    return (
      <div className="container">
        <img
          className={styles.articleImage}
          src={`https://api.gnfl.com.au${article.Image.url}`}
          alt={article.Image.name}
        />
        <h3 className={styles.heading}>{article.Title}</h3>
        <span className={styles.date}>
          {article.Date.length > 0
            ? `${day} ${month} ${articleDate.getDate()}, ${year}`
            : null}
        </span>
        <p className={styles.body}>{article.Body}</p>
      </div>
    );
  }
};

export default ArticleTemplate;
