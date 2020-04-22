import React from "react";
import styles from "./FixtureCard.module.scss";

const FixtureCard = (props) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const {
    homeTeam,
    awayTeam,
    Status,
    homeTeamGoals,
    homeTeamBehinds,
    awayTeamGoals,
    awayTeamBehinds,
    Time,
    Venue,
  } = props.match;

  const date = new Date(props.match.Date);

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const time = new Date(`${props.match.Date}:${Time}`);
  let matchClass;
  if (props.color === "white") {
    matchClass = `${styles.matchDetails} white text-border`;
  } else {
    matchClass = styles.matchDetails;
  }
  if (Status === "Played" || Status === "Forfeited") {
    return (
      <>
        <div className={matchClass}>
          <div>
            {day}, {month} {date.getDate()}
          </div>
          <div>
            <span>{Venue.Name}</span>
            <span>|</span>
            <span>
              {time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </div>
        </div>
        <div className={styles.fixtureCard}>
          <div className={styles.homeTeam}>
            <div className={styles.name}>
              <div>{homeTeam.Name}</div>
              <div>{homeTeam.Nickname}</div>
            </div>
            <div className={styles.logo}>
              <img
                className={styles.logo}
                src={`${process.env.REACT_APP_GNFL_API_URL}${homeTeam.Logo.url}`}
                alt={`${homeTeam.Name} Logo`}
              />
            </div>
          </div>
          <div className={styles.score}>
            <div>{homeTeamGoals * 6 + homeTeamBehinds}</div>
            <div>
              {homeTeamGoals}.{homeTeamBehinds}
            </div>
          </div>
          <div className={styles.versus}>VS</div>
          <div className={styles.score}>
            <div>{awayTeamGoals * 6 + awayTeamBehinds}</div>
            <div>
              {awayTeamGoals}.{awayTeamBehinds}
            </div>
          </div>
          <div className={styles.awayTeam}>
            <div className={styles.name}>
              <div>{awayTeam.Name}</div>
              <div>{awayTeam.Nickname}</div>
            </div>
            <div className={styles.logo}>
              <img
                className={styles.logo}
                src={`${process.env.REACT_APP_GNFL_API_URL}${awayTeam.Logo.url}`}
                alt={`${awayTeam.Name} Logo`}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={matchClass}>
          <div>
            {day}, {month} {date.getDate()}
          </div>
          <div>
            <span>{Venue.Name}</span>
            <span>|</span>
            <span>
              {time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </div>
        </div>
        <div className={styles.fixtureCard}>
          <div className={styles.homeTeam}>
            <div className={styles.name}>
              <div>{homeTeam.Name}</div>
              <div>{homeTeam.Nickname}</div>
            </div>
            <div className={styles.logo}>
              <img
                className={styles.logo}
                src={`${process.env.REACT_APP_GNFL_API_URL}${homeTeam.Logo.url}`}
                alt={`${homeTeam.Name} Logo`}
              />
            </div>
          </div>
          <div className={styles.versus}>VS</div>
          <div className={styles.awayTeam}>
            <div className={styles.name}>
              <div>{awayTeam.Name}</div>
              <div>{awayTeam.Nickname}</div>
            </div>
            <div className={styles.logo}>
              <img
                className={styles.logo}
                src={`${process.env.REACT_APP_GNFL_API_URL}${awayTeam.Logo.url}`}
                alt={`${awayTeam.Name} Logo`}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default FixtureCard;
