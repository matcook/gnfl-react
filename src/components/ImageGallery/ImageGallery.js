import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./ImageGallery.module.scss";

const ImageGallery = () => {
  const galleryQuery = gql`
    {
      galleries {
        id
        Image {
          url
        }
        Website
        Title
      }
    }
  `;

  const { loading, error, data } = useQuery(galleryQuery);

  if (loading) {
    return <span>Loading</span>;
  }
  if (error) {
    console.error(error);
  }
  if (data) {
    return (
      <div className={styles.grid}>
        {data.galleries.map((gallery) => {
          return (
            <div key={gallery.id} className={styles.gridItem}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={gallery.Website}
              >
                <img
                  src={`${process.env.REACT_APP_GNFL_API_URL}${gallery.Image.url}`}
                  alt={gallery.Title}
                />
              </a>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ImageGallery;
