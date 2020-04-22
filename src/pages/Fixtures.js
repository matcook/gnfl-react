import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import FixtureCard from "../components/FixtureCard/FixtureCard";
import styles from "./fixtures.module.scss";

const Fixtures = () => {
  const [grade, setGrade] = useState("League");
  const [season, setSeason] = useState(2020);
  const [round, setRound] = useState("1");

  const dataQuery = gql`
    query allData($round: String!, $grade: String!, $season: Int!) {
      matches(
        where: {
          Round: $round
          Grade: { Name: $grade }
          Season: { Year: $season }
        }
        sort: "Date:asc"
      ) {
        id
        Status
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
        homeTeamGoals
        homeTeamBehinds
        awayTeamGoals
        awayTeamBehinds
        Date
        Time
        Venue {
          Name
        }
      }
      seasons(sort: "Year:desc") {
        Year
      }
      grades {
        Name
      }

      rounds: matches(
        where: { Grade: { Name: $grade }, Season: { Year: $season } }
      ) {
        id
        Round
      }
    }
  `;

  const seasonOptions = [];
  const gradeOptions = [];
  let roundOptions = [];

  const { loading, error, data } = useQuery(dataQuery, {
    variables: {
      grade,
      season,
      round,
    },
  });
  if (loading) {
    return (
      <div className="container">
        <h1>Fixtures & Results</h1>
        <div className={styles.filters}>
          <Select
            options={seasonOptions}
            className={styles.seasonDropdown}
            placeholder="Season..."
            defaultValue={{ label: "2020", value: "2020" }}
            onChange={(value) => setSeason(value.value)}
          />
          <Select
            options={roundOptions}
            className={styles.seasonDropdown}
            placeholder="Round..."
            defaultValue={{ label: "Round: 1", value: "1" }}
            onChange={(value) => setRound(value.value)}
          />
          <Select
            options={gradeOptions}
            className={styles.gradeDropdown}
            placeholder="Grade..."
            defaultValue={{ label: "League", value: "league" }}
            onChange={(value) => setGrade(value.value)}
          />
        </div>
        <span>Loading...</span>
      </div>
    );
  }
  if (error) {
    console.error(error);
  }

  if (data) {
    data.rounds.map((match) => {
      if (roundOptions.some((round) => round.value === match.Round)) {
        return null;
      } else {
        return roundOptions.push({
          value: match.Round,
          label: `Round: ${match.Round}`,
        });
      }
    });

    data.seasons.map((season) =>
      seasonOptions.push({ value: season.Year, label: season.Year })
    );

    data.grades.map((grade) =>
      gradeOptions.push({ value: grade.Name, label: grade.Name })
    );

    if (data.matches.length === 0) {
      return (
        <div className="container">
          <h1>Fixtures & Results</h1>
          <div className={styles.filters}>
            <Select
              options={seasonOptions}
              className={styles.seasonDropdown}
              placeholder="Season..."
              defaultValue={{ label: "2020", value: "2020" }}
              onChange={(value) => setSeason(value.value)}
            />
            <Select
              options={roundOptions}
              className={styles.seasonDropdown}
              placeholder="Round..."
              defaultValue={{ label: "Round: 1", value: "1" }}
              onChange={(value) => setRound(value.value)}
            />
            <Select
              options={gradeOptions}
              className={styles.gradeDropdown}
              placeholder="Grade..."
              defaultValue={{ label: "League", value: "league" }}
              onChange={(value) => setGrade(value.value)}
            />
          </div>
          <span>No Matches...</span>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Fixtures & Results</h1>
          <div className={styles.filters}>
            <Select
              options={seasonOptions}
              className={styles.seasonDropdown}
              placeholder="Season..."
              defaultValue={{ label: "2020", value: "2020" }}
              onChange={(value) => setSeason(value.value)}
            />
            <Select
              options={roundOptions}
              className={styles.seasonDropdown}
              placeholder="Round..."
              defaultValue={{ label: "Round: 1", value: "1" }}
              onChange={(value) => setRound(value.value)}
            />
            <Select
              options={gradeOptions}
              className={styles.gradeDropdown}
              placeholder="Grade..."
              defaultValue={{ label: "League", value: "league" }}
              onChange={(value) => setGrade(value.value)}
            />
          </div>
          {data.matches.map((match) => {
            return <FixtureCard key={match.id} match={match} />;
          })}
        </div>
      );
    }
  }
};

export default Fixtures;
