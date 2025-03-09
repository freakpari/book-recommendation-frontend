import styles from "./footer.module.scss";
// import logo from "../logo.svg";

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h3>شرکت</h3>
            <ul>
              <li>درباره ما</li>
              <li>قوانین و مقررات</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>راهنما</h3>
            <ul>
              <li>سوالات متداول</li>
              <li>ایمیل پشتیبانی</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>ما را دنبال کنید</h3>
            <ul className={styles.section}>
              <li>اینستاگرام</li>
              <li>لینکدین</li>
            </ul>
          </div>
        </div>
        <div className={styles.section}>
          <ul>
            <br />
            <li>© ۱۴۰۴ تمامی حقوق محفوظ است.</li>
          </ul>
        </div>
      </footer>
  );
}
