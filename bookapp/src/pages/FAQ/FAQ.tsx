import React from "react";
import styles from "./FAQ.module.scss";
import Footer from "../../components/Footer/Footer";
import FAQContainer from "../../components/FAQContainer/FAQContainer";
import logo from "../../logo.svg";
import SearchNav from "../../components/SearchNav/SearchNav";

export default function FAQ() {
  return (
    <div>
        <div>
            <SearchNav />
        </div>
      <div className={styles.container}>
        <h3 className={styles.header}>سوالات متداول</h3>
        <FAQContainer />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
