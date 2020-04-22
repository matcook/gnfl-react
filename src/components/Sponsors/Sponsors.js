import React from "react";
import Slider from "react-slick";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./Sponsors.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sponsorQuery = gql`
  {
    sponsors {
      id
      Name
      Logo {
        url
      }
      Website
    }
  }
`;

const Sponsors = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { loading, error, data } = useQuery(sponsorQuery);

  if (loading) {
    return (
      <section className={styles.sponsors}>
        <div className="container">
          <h2>Our sponsors</h2>
        </div>
        <div className={styles.slider}>Loading...</div>
      </section>
    );
  }

  if (error) {
    console.error(error);
  }
  if (data) {
    return (
      <section className={styles.sponsors}>
        <div className="container">
          <h2>Our sponsors</h2>
        </div>
        <div className={styles.slider}>
          <Slider {...settings}>
            {data.sponsors.map((sponsor) => {
              return (
                <div key={sponsor.id} className={styles.slide}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={sponsor.Website}
                  >
                    <img
                      className={styles.image}
                      src={`${process.env.REACT_APP_GNFL_API_URL}${sponsor.Logo.url}`}
                      alt={`${sponsor.Name}`}
                    />
                  </a>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    );
  }
};

export default Sponsors;
