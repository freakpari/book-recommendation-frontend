import styles from "./Homepage.module.scss";
import book1 from "./book1.svg";
import book2 from "./book2.svg";
import book3 from "./book3.svg";
import bufkoor from "./bufkoor.svg";



export default function HomePage() {
    return (
    <div className={styles.container}>
        <div className={styles.topSection}>
            <div className={styles.descontainer} >
            <div className={styles.heading}>
            <h1>کتاب بعدی خود را کشف کنید</h1></div>
            <p className={styles.description}>محبوب‌ترین و جدیدترین کتاب‌ها در «کرم کتاب». اگر مطمئن نیستید چه بخوانید، تست شخصیت‌شناسی ما را انجام دهید تا بهترین پیشنهاد را دریافت کنید.</p>
            <button className={styles.mbtitest}>تست MBTI</button>
            </div>
        <div className={styles.booksDisplay}>
            <div className={styles.bookCardContainer} >
            <div className={styles.bookCardWrapper}>    
            <img src={book1} alt="book" className={styles.bookCard} />
            <h4>اسب سیاه</h4>
            <p>تاد رز واگی گاس</p>
            </div>
            <div className={styles.bookCardWrapper}>
            <h4> کتابخانه نیمه شب</h4>
            <p> مت هیگ</p>
            <img src={book2} alt="book" className={styles.bookCard} />
            </div>
            <div className={styles.bookCardWrapper}>
            <img src={book3} alt="book" className={styles.bookCard} />
            <h4>نوشابه زرد</h4>
            <p>منصور ضابطیان</p>
            </div>
            </div>
    </div>
    </div>

    <div className={styles.popularSection}>
        <h2>محبوب‌ترین‌ها</h2>
        <button >مشاهده همه</button>
        <div className={styles.popularBooks}>
        <div className={styles.cardwrapper} >
        <img src={bufkoor} alt="boof koor" />
        <h4>بوف کور</h4>
        <p>صادق هدایت</p>
        </div>
        <div className={styles.cardwrapper} >
        <img src={bufkoor} alt="boof koor" />
        <h4>بوف کور</h4>
        <p>صادق هدایت</p>
        </div>
        <div className={styles.cardwrapper} >
        <img src={bufkoor} alt="boof koor" />
        <h4>بوف کور</h4>
        <p>صادق هدایت</p>
        </div>
        <div className={styles.cardwrapper} >
        <img src={bufkoor} alt="boof koor" />
        <h4>بوف کور</h4>
        <p>صادق هدایت</p>
        </div>
        <div className={styles.cardwrapper} >
        <img src={bufkoor} alt="boof koor" />
        <h4>بوف کور</h4>
        <p>صادق هدایت</p>
        </div>
    </div>
    </div>
    </div>    
  );
};

