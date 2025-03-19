import styles from "./AboutUs.module.scss";
import logo from "../../logo.svg";
import Footer from "../../components/Footer/footer";

export default function AboutUs() {
  return (
    <div>
      <div className={styles.aboutUs}>
        <img src={logo} alt="logo icon" />
        <h3>درباره ما</h3>
        <h1>اسم شرکت</h1>
        <p>
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
