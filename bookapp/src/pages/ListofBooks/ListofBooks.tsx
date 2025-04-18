import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./ListofBooks.module.scss";
import bufkoor from "../Homepage/icon/bufkoor.svg";
import { Link } from "react-router-dom";

const book = { title: "بوف کور", author: "صادق هدایت", img: bufkoor };


export default function Listofbooks() {
    return(
        <>
        <SearchNav />
        <div className={styles.text}>
        <h2 >لیست کتاب ها</h2>
        </div>
        <div className={styles.popularSection}>
        <div className={styles.toptext}>
            <h2>پیشنهادات جدید برای علی</h2>
            <button className={styles.showbutton}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/popularbook">
            مشاهده همه
            </Link>
            </button>

        </div>
        <div className={styles.popularBooks}>
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.cardwrapper}>
            <img src={book.img} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            </div>
        ))}
        </div>
        </div>
        <div className={styles.popularSection}>
        <div className={styles.toptext}>
            <h2> تاریخچه پیشنهادها</h2>
            <button className={styles.showbutton}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/popularbook">
            مشاهده همه
            </Link>
            </button>

        </div>
        <div className={styles.popularBooks}>
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.cardwrapper}>
            <img src={book.img} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            </div>
        ))}
        </div>
        </div>
        <div className={styles.popularSection}>
        <div className={styles.toptext}>
            <h2>لیست کتاب‌‌های محبوب من</h2>
            <button className={styles.showbutton}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/popularbook">
              مشاهده همه
              </Link>
              </button>

        </div>
        <div className={styles.popularBooks}>
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.cardwrapper}>
            <img src={book.img} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            </div>
        ))}
        </div>
        </div>
        
        
        
        <Footer />
        </>
    )
}