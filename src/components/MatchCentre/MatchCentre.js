import React, { useState } from "react";
import Select from "react-select";
import FixtureCard from "../FixtureCard/FixtureCard";
import Ladder from "../Ladder/Ladder";
import styles from "./MatchCentre.module.scss";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const MatchCentre = () => {
  const currentYear = new Date();
  const [grade, setGrade] = useState("League");
  const [season, setSeason] = useState(currentYear.getFullYear());
  const gradeOptions = [];
  const seasonOptions = [];

  const upcomingMatchQuery = gql`
    query allData($season: Int!, $grade: String!) {
      upcoming: matches(
        where: { Grade: { Name: $grade }, Status: "Upcoming" }
        limit: 3
      ) {
        id
        Venue {
          Name
        }
        Date
        Time
        homeTeam {
          Name
          Nickname
          Logo {
            url
          }
        }
        awayTeam {
          Name
          Nickname
          Logo {
            url
          }
        }
      }
      clubs {
        id
        Name
      }
      matches(where: { Grade: { Name: $grade }, Season: { Year: $season } }) {
        id
        Round
        homeTeam {
          Name
        }
        homeTeamGoals
        homeTeamBehinds
        awayTeam {
          Name
        }
        awayTeamGoals
        awayTeamBehinds
        Status
      }
      seasons(sort: "Year:desc") {
        Year
      }
      grades {
        Name
      }
    }
  `;

  const { loading, error, data } = useQuery(upcomingMatchQuery, {
    variables: {
      grade,
      season,
    },
  });

  if (loading) {
    return (
      <div className={styles.matchCentre} style={matchCentreStyles}>
        <div className={`${styles.grid} container`}>
          <div className={styles.upcoming}>
            <h2>Upcoming Games</h2>
            <Select
              options={gradeOptions}
              className={styles.dropdown}
              placeholder="Grade..."
              defaultValue={{ label: grade, value: grade }}
              onChange={(value) => {
                setGrade(value.value);
                console.log(value);
              }}
            />
            <span className="white">Loading...</span>
          </div>
          <div className={styles.ladder}>
            <h2>Ladder</h2>
            <Select
              options={seasonOptions}
              className={styles.dropdown}
              placeholder="Season..."
              defaultValue={{ label: season, value: season }}
              onChange={(value) => {
                console.log(value);
                setSeason(value.value);
              }}
            />
            <Ladder season={season} grade={grade} />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    console.error(error);
  }

  if (data) {
    data.grades.forEach((grade) => {
      gradeOptions.push({ value: grade.Name, label: grade.Name });
    });
    data.seasons.forEach((season) => {
      seasonOptions.push({ value: season.Year, label: season.Year });
    });
    return (
      <div className={styles.matchCentre} style={matchCentreStyles}>
        <div className={`${styles.grid} container`}>
          <div className={styles.upcoming}>
            <h2>Upcoming Games</h2>
            <Select
              options={gradeOptions}
              className={styles.dropdown}
              placeholder="Grade..."
              defaultValue={{ label: "League", value: "League" }}
              onChange={(value) => setGrade(value.value)}
            />
            {data.upcoming.length === 0 ? (
              <span className="white">No upcoming matches..</span>
            ) : (
              <>
                {data.upcoming.map((match) => {
                  return (
                    <FixtureCard key={match.id} match={match} color="white" />
                  );
                })}
              </>
            )}
          </div>
          <div className={styles.ladder}>
            <h2>Ladder</h2>
            <Select
              options={seasonOptions}
              className={styles.dropdown}
              placeholder="Season..."
              defaultValue={{ label: season, value: season }}
              onChange={(value) => setSeason(value.value)}
            />
            <Ladder clubs={data.clubs} matches={data.matches} grade={grade} />
          </div>
        </div>
      </div>
    );
  }
};

const matchCentreStyles = {
  background: `
    linear-gradient(
        rgba(48, 63, 159, .4), 
        rgba(48, 63, 159, .4)
    ),
    url(https://images.unsplash.com/photo-1517137879134-48acfbe3be13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)`,

  backgroundPosition: "center center",
  backgroundSize: "cover",
};

export default MatchCentre;
