import styles from "./NotFound.module.scss";
import ghostImage from "./icons/notfound.svg";
import Footer from "../../components/Footer/Footer";

export default function NotFound() {
  return (
    <div>
      <div className={styles.notFound}>
        <img src={ghostImage} alt="404 Not Found" />
        <p>صفحه‌ای که دنبالش می‌گردی گم شده!</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
