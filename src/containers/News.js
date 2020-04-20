import React from "react";
import data from "../data.json";
import ArticleCard from "../components/ArticleCard";
const News = (props) => {
  return (
    <div className="container">
      <h1>News</h1>
      {data.map((article) => (
        <ArticleCard key={article.id} data={article} />
      ))}
    </div>
  );
};

export default News;
