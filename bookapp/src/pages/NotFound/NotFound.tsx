import styles from "./NotFound.module.scss";
import ghostImage from "./notfound.svg";
import Footer from "../../components/Footer/footer";

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