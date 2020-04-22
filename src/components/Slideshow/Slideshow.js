import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./Slideshow.module.scss";

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const slides = [1, 2, 3, 4, 5]; //hacky -- needs fixing
  const imageQuery = gql`
    {
      homePage {
        SliderImages {
          name
          url
        }
      }
    }
  `;

  const nextSlide = () => {
    current === slides.length - 1 ? setCurrent(0) : setCurrent(current + 1);
  };

  useEffect(() => {
    let slideTimer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearTimeout(slideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const { data, loading, error } = useQuery(imageQuery);

  if (loading) {
    return <section className={styles.slider}></section>;
  }
  if (error) {
    console.error(error);
  }
  if (data) {
    return (
      <section className={styles.slider}>
        {data.homePage.SliderImages.map((slide, index) => (
          <div
            key={slide.name}
            className={
              index === current
                ? `${styles.slide} ${styles.active}`
                : styles.slide
            }
          >
            <img
              className={styles.image}
              src={`${process.env.REACT_APP_GNFL_API_URL}${slide.url}`}
              alt={slide.name}
            />
          </div>
        ))}
      </section>
    );
  }
};

export default Slideshow;
