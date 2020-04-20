import React, { useState, useEffect } from "react";
import data from "../data.json";

const ArticleTemplate = (props) => {
  const [article, setArticle] = useState({
    id: "",
    Title: "",
    Data: "",
    Body: "",
    Slug: "",
    Image: {
      url: "",
      name: "",
    },
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    const article = data.find((article) => article.Slug === slug);
    setArticle(article);
  }, [props.match.params.slug]);

  return (
    <div className="container">
      <img
        src={`https://api.gnfl.com.au${article.Image.url}`}
        alt={article.Image.name}
      />
      <h3>{article.Title}</h3>
      <p>{article.Body}</p>
    </div>
  );
};

export default ArticleTemplate;
