import styles from "./NotFound.module.scss";
import ghostImage from "./icons/notfound.svg";
import Footer from "../../components/Footer/Footer";
import SearchNav from "../../components/SearchNav/SearchNav";

export default function NotFound() {
  return (
    <div>
        <div>
            <SearchNav />
        </div>
      <div className={styles.notFound}>
        <img className={styles.pic} src={ghostImage} alt="404 Not Found" />
        <p className={styles.para}>صفحه‌ای که دنبالش می‌گردی گم شده!</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
