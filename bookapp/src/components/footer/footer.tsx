import styles from "./footer.module.scss";

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h3>شرکت</h3>
            <ul>
              <li><a href="">درباره ما</a></li>
              <li><a href="">قوانین و مقررات</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>راهنما</h3>
            <ul>
              <li><a href="">سوالات متداول</a></li>
              <li><a>ایمیل پشتیبانی</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>ما را دنبال کنید</h3>
            <ul className={styles.section}>
              <li><a href="">اینستاگرام</a></li>
              <li><a href="">لینکدین</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.section}>
          <ul>
            <br />
            <br/>
            <br/>
            <li>© ۱۴۰۴ تمامی حقوق محفوظ است.</li>
          </ul>
        </div>
      </footer>
  );
}
