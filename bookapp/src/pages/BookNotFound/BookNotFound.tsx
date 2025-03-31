import styles from "./BookNotFound.module.scss";
import notFound from "./notfound2.svg";
import Footer from "../../components/Footer/Footer";
import SearchNav from "../../components/SearchNav/SearchNav";

export default function BookNotFound() {
  return (
    <div>
      <SearchNav />
      <div className={styles.notFound}>
        <img src={notFound} alt="404 Not Found" />
        <p>هیچ کتابی با این مشخصات پیدا نشد!</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
