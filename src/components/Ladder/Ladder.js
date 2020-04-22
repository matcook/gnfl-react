import React from "react";

import styles from "./Ladder.module.scss";
const dummyTeams = [1, 2, 3, 4, 5, 6, 7]; //hacky

const Ladder = ({ clubs, matches, grade }) => {
  const teams = [];

  if (teams && matches) {
    clubs.forEach((club) => {
      if (club.Name === "Mullewa" && grade === "Womens") {
        return;
      } else {
        teams.push({ name: club.Name, id: club.id });
      }
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
          {teams.map((team) => {
            return (
              <tr key={team.id}>
                <td>{team.name}</td>
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
