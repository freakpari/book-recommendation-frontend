import styles from "./recommendbook.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import bufkoor from "../Homepage/icon/bufkoor.svg";


const book = { title: "بوف کور", author: "صادق هدایت", img: bufkoor };

export default function Recommendbook(){
    return(
    <>
    <SearchNav />
    <div className={styles.text}>
    <h2 >پیشنهادات جدید برای علی</h2>
    </div>
    <div className={styles.popularBooks}>
        {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className={styles.cardwrapper}>
            <img src={book.img} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            </div>
        ))}
        </div>
        <button className={styles.loadmore}>
            نمایش بیشتر
        </button>
    <Footer />

    </>



    )
}