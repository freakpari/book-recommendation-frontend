import styles from "./AboutUs.module.scss";
import logo from "../../logo.svg";
import Footer from "../../components/Footer/Footer";
import SearchNav from "../../components/SearchNav/SearchNav";

export default function AboutUs() {
  return (
    <div>
        <div>
            <SearchNav />
        </div>
      <div className={styles.aboutUs}>
        <h3 className={styles.header}>درباره ما</h3>
        <h1 className={styles.name}>BookWorm</h1>
        <p className={styles.para}>
          پلتفرمی منحصر به فرد برای علاقه‌مندان به کتاب و مطالعه. ما با استفاده
          از تست‌های شخصیت‌شناسی و هوش مصنوعی، کتاب‌هایی متناسب با سلیقه شما را
          پیشنهاد می‌دهیم. هدف ما ایجاد جامعه‌ای پویا و الهام‌بخش است تا هر
          خواننده بتواند با دریافت پیشنهادهای شخصی، دنیای کتاب‌ها را از زاویه‌ای
          متفاوت تجربه کند.
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
