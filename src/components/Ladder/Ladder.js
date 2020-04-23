import React from "react";

import styles from "./Ladder.module.scss";
const dummyTeams = [1, 2, 3, 4, 5, 6, 7]; //hacky

const Ladder = ({ clubs, matches, grade }) => {
  const teams = [];
  const ladderItems = [];

  if (teams && matches) {
    clubs.forEach((club) => {
      if (club.Name === "Mullewa" && grade === "Womens") {
        return;
      } else {
        teams.push({ name: club.Name, id: club.id });
      }
    });

    teams.map((team) => {
      let played = 0;
      let points = 0;
      let percent = 0;
      let wins = 0;
      let losses = 0;
      let draws = 0;
      let pointsFor = 0;
      let pointsAgainst = 0;
      // eslint-disable-next-line
      matches.map((match) => {
        if (match.Status === "Played" || match.Status === "Forfeited") {
          if (!isNaN(Number(match.Round))) {
            let homeTeamScore = match.homeTeamGoals * 6 + match.homeTeamBehinds;
            let awayTeamScore = match.awayTeamGoals * 6 + match.awayTeamBehinds;
            if (team.name === match.homeTeam.Name) {
              played++;
              if (homeTeamScore > awayTeamScore) {
                points += 4;
                wins++;
              }
              if (homeTeamScore < awayTeamScore) {
                losses++;
              }
              if (homeTeamScore === awayTeamScore) {
                draws++;
                points += 2;
              }
              pointsFor += homeTeamScore;
              pointsAgainst += awayTeamScore;
            }

            if (team.name === match.awayTeam.Name) {
              played++;
              if (awayTeamScore > homeTeamScore) {
                points += 4;
                wins++;
              }
              if (awayTeamScore < homeTeamScore) {
                losses++;
              }
              if (awayTeamScore === homeTeamScore) {
                draws++;
                points += 2;
              }
              pointsFor += awayTeamScore;
              pointsAgainst += homeTeamScore;
            }
          }
        }
      });

      percent = ((pointsFor / pointsAgainst) * 100).toFixed(2);

      let ladderItem = {
        id: team.id,
        team: team.name,
        played,
        points,
        percent,
        wins,
        losses,
        draws,
        pointsFor,
        pointsAgainst,
      };

      return ladderItems.push(ladderItem);
    });

    ladderItems.sort((a, b) => {
      if (a.points === b.points) {
        return b.percent - a.percent;
      }
      return a.points > b.points ? -1 : 1;
    });

    return (
      <table className={styles.ladder} cellSpacing={0}>
        <thead>
          <tr>
            <th>Club</th>
            <th>P</th>
            <th>Pts</th>
            <th>%</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>PF</th>
            <th>PA</th>
          </tr>
        </thead>
        <tbody>
          {ladderItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.team}</td>
                <td>{item.played}</td>
                <td>{item.points}</td>
                <td>{isNaN(item.percent) ? 0 : item.percent}</td>
                <td>{item.wins}</td>
                <td>{item.losses}</td>
                <td>{item.draws}</td>
                <td>{item.pointsFor}</td>
                <td>{item.pointsAgainst}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return (
      <table className={styles.ladder} cellSpacing={0}>
        <thead>
          <tr>
            <th>Club</th>
            <th>P</th>
            <th>Pts</th>
            <th>%</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>PF</th>
            <th>PA</th>
          </tr>
        </thead>
        <tbody>
          {dummyTeams.map((team) => {
            return (
              <tr key={team}>
                <td></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};

export default Ladder;
