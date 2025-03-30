import styles from "./Homepage.module.scss";
import book1 from "./book1.svg";
import book2 from "./book2.svg";
import book3 from "./book3.svg";
import bufkoor from "./bufkoor.svg";
import book4 from "./book4.svg";
import book5 from "./book5.svg";
import book6 from "./book6.svg";
import book7 from "./book7.svg";
import book8 from "./book8.svg";
import book9 from "./book9.svg";
import book10 from "./shazde.svg";
import icon1 from "./icon1.svg";
import icon2 from "./icon2.svg";

import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
const handleClick = () => {
  window.location.href =
    "https://www.16personalities.com/fa/%D8%A2%D8%B2%D9%85%D9%88%D9%86-%D8%B4%D8%AE%D8%B5%DB%8C%D8%AA";
};
export default function HomePage() {
  return (
    <>
      <SearchNav />
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.descontainer}>
            <div className={styles.heading}>
              <h1>کتاب بعدی خود را کشف کنید</h1>
            </div>
            <p className={styles.description}>
              محبوب‌ترین و جدیدترین کتاب‌ها در «کرم کتاب». اگر مطمئن نیستید چه
              بخوانید، تست شخصیت‌شناسی ما را انجام دهید تا بهترین پیشنهاد را
              دریافت کنید.
            </p>
            <button onClick={handleClick} className={styles.mbtitest}>
              تست MBTI
            </button>
          </div>
          <div className={styles.booksDisplay}>
            <div className={styles.bookCardContainer}>
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
          <div className={styles.toptext}>
            <h2>محبوب‌ترین‌ها</h2>
            <button className={styles.showbutton}>مشاهده همه</button>
          </div>
          <div className={styles.popularBooks}>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
            <div className={styles.cardwrapper}>
              <img src={bufkoor} alt="boof koor" />
              <h4>بوف کور</h4>
              <p>صادق هدایت</p>
            </div>
          </div>
        </div>
        <div className={styles.bookTalk}>
          <div className={styles.topImage}>
            <img src={book6} alt="کتاب 1" />
            <img src={book5} alt="کتاب 2" />
            <img src={book4} alt="کتاب 3" />
          </div>
          <div className={styles.buttomImage}>
            <img src={book9} alt="کتاب 4" />
            <img src={book8} alt="کتاب 5" />
            <img src={book7} alt="کتاب 5" />
          </div>

          <div className={styles.content}>
            <h2>BookTalk</h2>
            <h4>جایی برای به اشتراک گذاشتن دیدگاه‌های شما درباره کتاب‌ها</h4>
            <p>
              تجربیات خود درباره کتاب‌های خوانده شده را به اشتراک بگذارید و
              نظرات خوانندگان را بر اساس جدیدترین یا محبوب‌ترین مرور کنید.
            </p>
            <button className={styles.button}>رفتن به BookTalk</button>
          </div>
        </div>
        <div className={styles.toptext}>
          <h2>پیشنهادات برای تایپ علی:infj</h2>
          <button>مشاهده همه</button>
        </div>
        <div className={styles.suggestion}>
          <div className={styles.bookcover}>
            <img
              src={book10}
              alt="شازده کوچولو"
              className={styles.coverimage}
            />
            <h2>شازده کوچولو</h2>
            <h3>آنتوان دو سنت اگزوپری</h3>
            <p>
              «شازده کوچولو»، اثر آنتوان دو سنت‌اگزوپری، با روایت‌های شاعرانه و
              نمادین خود، به INFJها کمک می‌کند تا به سادگی و زیبایی دنیای
              پیرامون نگاه کنند و ارزش‌های واقعی زندگی را درک نمایند.
            </p>
          </div>
          <div className={styles.bookcover}>
            <img
              src={book10}
              alt="شازده کوچولو"
              className={styles.coverimage}
            />
            <h2>شازده کوچولو</h2>
            <h3>آنتوان دو سنت اگزوپری</h3>
            <p>
              «شازده کوچولو»، اثر آنتوان دو سنت‌اگزوپری، با روایت‌های شاعرانه و
              نمادین خود، به INFJها کمک می‌کند تا به سادگی و زیبایی دنیای
              پیرامون نگاه کنند و ارزش‌های واقعی زندگی را درک نمایند.
            </p>
          </div>
          <div className={styles.bookcover}>
            <img
              src={book10}
              alt="شازده کوچولو"
              className={styles.coverimage}
            />
            <h2>شازده کوچولو</h2>
            <h3>آنتوان دو سنت اگزوپری</h3>
            <p>
              «شازده کوچولو»، اثر آنتوان دو سنت‌اگزوپری، با روایت‌های شاعرانه و
              نمادین خود، به INFJها کمک می‌کند تا به سادگی و زیبایی دنیای
              پیرامون نگاه کنند و ارزش‌های واقعی زندگی را درک نمایند.
            </p>
          </div>
          <div className={styles.bookcover}>
            <img
              src={book10}
              alt="شازده کوچولو"
              className={styles.coverimage}
            />
            <h2>شازده کوچولو</h2>
            <h3>آنتوان دو سنت اگزوپری</h3>
            <p>
              «شازده کوچولو»، اثر آنتوان دو سنت‌اگزوپری، با روایت‌های شاعرانه و
              نمادین خود، به INFJها کمک می‌کند تا به سادگی و زیبایی دنیای
              پیرامون نگاه کنند و ارزش‌های واقعی زندگی را درک نمایند.
            </p>
          </div>
        </div>
        <div className={styles.toptext}>
          <h2>لیست های دیگر کاربران</h2>
          <button>مشاهده همه</button>
        </div>
        <div className={styles.listsWrapper}>
          <div className={styles.cardImage}>
            <img src={icon1} alt="کتاب فانتزی" />
          </div>
          <div className={styles.listCard}>
            <div className={styles.cardContent}>
              <h3 className={styles.category}>دنیای رنگی خیال</h3>
              <p className={styles.author}>توسط: گلنار شفیعی</p>
              <p className={styles.description}>
                شامل: زندگی کردن در لحظه، مهارت‌های مدیریت استرس و ...
              </p>
            </div>
          </div>
          <div className={styles.cardImage}>
            <img src={icon2} alt="کتاب فانتزی" />
          </div>
          <div className={styles.listCard}>
            <div className={styles.cardContent}>
              <h3 className={styles.category}>دنیای رنگی خیال</h3>
              <p className={styles.author}>توسط: گلنار شفیعی</p>
              <p className={styles.description}>
                شامل سری کتاب‌های هری پاتر، نغمه‌ای از یخ و آتش و ...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
