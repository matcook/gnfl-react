import React from "react";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

const News = () => {
  const { loading, error, data } = useQuery(news);

  if (loading) {
    if (window.location.pathname === "/news") {
      return (
        <div className="container">
          <h1>News</h1>
          <span>Loading...</span>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Homepage News</h3>
          <span>Loading...</span>
        </div>
      );
    }
  }

  if (error) {
    console.error(error);
  }

  if (data) {
    if (window.location.pathname === "/news") {
      return (
        <div className="container">
          <h1>News</h1>
          {data.articles.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="container">
          <h2>News</h2>
          {data.articles.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>
      );
    }
  }
};

export default News;
