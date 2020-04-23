import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./ClubLinks.module.scss";

const ClubLinks = () => {
  const clubsQuery = gql`
    {
      clubs {
        id
        Name
        Nickname
        Website
        Logo {
          name
          url
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(clubsQuery);

  if (loading) {
    return (
      <div className="container">
        <h2>Our Clubs</h2>
        <span>Loading...</span>
      </div>
    );
  }
  if (error) {
    console.error(error);
  }
  if (data) {
    data.clubs.sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
      return 0;
    });
    return (
      <div className="container">
        <h2>Our Clubs</h2>
        <div className={styles.grid}>
          {data.clubs.map((club) => {
            return (
              <div key={club.id} className={styles.gridItem}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={club.Website}
                >
                  <div className={styles.clubLink}>
                    <div className={styles.imageContainer}>
                      <img
                        src={`${process.env.REACT_APP_GNFL_API_URL}${club.Logo.url}`}
                        alt={`${process.env.REACT_APP_GNFL_API_URL}${club.Name}`}
                      />
                    </div>
                    <div>{club.Name}</div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default ClubLinks;
