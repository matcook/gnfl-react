import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./ArticleTemplate.module.scss";

const news = gql`
  {
    articles(sort: "Date:asc") {
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
  const [article, setArticle] = useState({
    id: "",
    Title: "",
    Date: "",
    Body: "",
    Slug: "",
    Image: {
      url: "",
      name: "",
    },
  });

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

  const { loading, error, data } = useQuery(news);
  const fetchData = async () => {
    const slug = props.match.params.slug;

    if (loading) {
      return <span>Loading...</span>;
    }
    if (error) {
      console.error(error);
    }
    if (data) {
      const article = data.articles.find((article) => article.Slug === slug);
      setArticle(article);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

export default ArticleTemplate;
