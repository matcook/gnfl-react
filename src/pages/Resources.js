import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { MdDescription } from "react-icons/md";
import styles from "./resources.module.scss";

const Resources = () => {
  const resourcesQuery = gql`
    {
      resource {
        Documents {
          id
          name
          url
        }
        Forms {
          id
          name
          url
        }
        Records {
          id
          name
          url
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(resourcesQuery);

  if (loading) {
    return (
      <div className="container">
        <h1 style={{ paddingBottom: 0 }}>Resources</h1>
        <h2>Documents</h2>
        <ul className={styles.list}>
          <li>Loading...</li>
        </ul>
        <h2>Forms</h2>
        <ul className={styles.list}>
          <li>Loading...</li>
        </ul>
        <h2>Records</h2>
        <ul className={styles.list}>
          <li>Loading...</li>
        </ul>
      </div>
    );
  }

  if (error) {
    console.error(error);
  }

  if (data) {
    return (
      <div className="container">
        <h1 style={{ paddingBottom: 0 }}>Resources</h1>
        <h2>Documents</h2>
        <ul className={styles.list}>
          {data.resource.Documents.map((document) => {
            return (
              <li key={document.id}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${process.env.REACT_APP_GNFL_API_URL}${document.url}`}
                >
                  <MdDescription /> {document.name}
                </a>
              </li>
            );
          })}
        </ul>
        <h2>Forms</h2>
        <ul className={styles.list}>
          {data.resource.Forms.map((form) => {
            return (
              <li key={form.id}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${process.env.REACT_APP_GNFL_API_URL}${form.url}`}
                >
                  <MdDescription /> {form.name}
                </a>
              </li>
            );
          })}
        </ul>
        <h2>Records</h2>
        <ul className={styles.list}>
          {data.resource.Records.map((record) => {
            return (
              <li key={record.id}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${process.env.REACT_APP_GNFL_API_URL}${record.url}`}
                >
                  <MdDescription /> {record.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Resources;
