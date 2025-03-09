import styles from "./NotFound.module.scss";
import ghostImage from "./notfound.svg";
import Footer from "../../components/footer";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <img src={ghostImage} alt="404 Not Found" />
      <p>صفحه‌ای که دنبالش می‌گردی گم شده!</p>
      <Footer />
    </div>
  );
}
