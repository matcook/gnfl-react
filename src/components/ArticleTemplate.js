import React, { useState, useEffect } from "react";
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
