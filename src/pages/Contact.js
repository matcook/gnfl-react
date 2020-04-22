import React from "react";
import Select from "react-select";
import styles from "./contact.module.scss";

const Contact = () => {
  const queryOptions = [
    { value: "general", label: "General Enquiry" },
    { value: "specific", label: "Specific Enquiry" },
  ];

  return (
    <div className="container">
      <h1>Contact</h1>
      <div className={styles.grid}>
        <div className={styles.contactForm}>
          <form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <Select
              options={queryOptions}
              placeholder="Enquiry Type..."
              className={styles.dropdown}
              name="enquiry"
              id="enquiry"
            />
            <div className={styles.formComponent}>
              {" "}
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className={styles.formComponent}>
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" name="phone" />
            </div>
            <div className={styles.formComponent}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className={styles.formComponent}>
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message"></textarea>
            </div>
            <div className={styles.formComponent}>
              <input type="submit" value="Send Message" />
            </div>
          </form>
        </div>
        <div className={styles.otherContact}>
          <h2>Other Contact Options</h2>
          <h3>Phone</h3>
          <p>Office: 1234 5678</p>
          <p>Mobile: 0412 345 678</p>
          <h3>Email</h3>
          <p>gnfl@sportshouse.net.au</p>
          <h3>Office Location</h3>
          <p>Sportshouse/Dept Sport and Rec</p>
          <p>Lot 3/4325 Marine Terrace</p>
          <p>Geraldton WA 6530</p>
          <h3>Postal Address</h3>
          <p>PO Box 23423532</p>
          <p>Geraldton WA 6530</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
