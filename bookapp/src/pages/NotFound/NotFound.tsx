import styles from "./notFound.module.scss";
import ghostImage from "./ghost.png";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <img src={ghostImage} alt="404 Not Found" />
      <p>صفحه‌ای که دنبالش می‌گردی گم شده!</p>
    </div>
  );
};

export default NotFound;
