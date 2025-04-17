import styles from './Bookdetail.module.scss';
import { useState  } from "react";
import SearchNav from '../../components/SearchNav/SearchNav';
import Footer from '../../components/Footer/Footer';
import shazde from "./icons/shazde.svg";
import heart from "./icons/Heart.svg";
import check from "./icons/Check.svg";
import comment from "./icons/Comment.svg";
import profile  from "./icons/profile.svg";
import { useNavigate } from 'react-router-dom';
import StepRating from "./rating";

export default function Bookdetail () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [rating, setRating] = useState(4);
  const handleCheckClick = () => {
  const token = localStorage.getItem("token"); // Adjust the key if you use a different one
  if (!token) {
    navigate("/signup");
  } else {
    console.log("User is authenticated, do something else...");
  }
};
    return (
    <>
    <SearchNav />
    <div className={styles.container}>
    <div className={styles.rightSection}>
    <div className={styles.icons}>
        <img src={heart} className={styles.heartIcon} />
        <img  onClick={() => setIsModalOpen(true)} src={comment}  className={styles.commentIcon} />
        <img  onClick={handleCheckClick} src={check} className={styles.checkIcon} />
        </div>
        <img
        src={shazde}
        alt="شازده کوچولو"
        className={styles.bookCover}
        />
        <div className={styles.text}>
        <h2>شازده کوچولو</h2>
        <p className={styles.author}>آنتوان دو سنت اگزوپری</p>
        <div className={styles.tags}>
        <button>تخیلی</button>
        <button>کودکانه</button>
        <button>فلسفی</button>
        </div>
        </div>

        </div>

        <div className={styles.reviews}>
          <div className={styles.reviewCard}>
            <div className={styles.profile}>
          <img src={profile} alt='profile' />
          <span> علی محمدی</span>
          </div>
            <p>
              "شازده کوچولو ترکیبی از سادگی و فلسفه است. روایت‌های شاعرانه و مفاهیم عمیقی که در قالب داستانی کودکانه بیان می‌شوند، واقعاً تاثیرگذارند."
            </p>
          </div>
          <div className={styles.reviewCard}>
          <div className={styles.profile}>
          <img src={profile} alt='profile' />
          <span>مریم حسینی</span>
          </div>
            <p>
              "این کتاب، سفری به دنیای درون است. هر بار که می‌خوانمش، نکته جدیدی کشف می‌کنم."
            </p>
          </div>
          <div className={styles.reviewCard}>
          <div className={styles.profile}>
          <img src={profile} alt='profile' />
          <span>شاهین رشیدی</span>
          </div>
            <p>
              "شازده کوچولو بی‌نظیره. باید همه بخوننش!"
            </p>
            <a href="/bookTalkMain">
            <button className={styles.backButton}> رفتن به BookTalk </button>
            </a>
          </div>
          

      </div>
    <div className={styles.bookInfo}>
        <h3>تعداد صفحات  <span>۹۶</span></h3>
        <h3>امتیاز کاربران <span>۴.۵ از ۵</span></h3>
        <p>
          «شازده کوچولو» داستانی زیبا و فلسفی است که با زبان ساده، مفاهیم عمیقی از عشق، دوستی و رشد فردی را به تصویر می‌کشد. روایت داستان از دید یک پسر کوچک از سیاره‌ای دور آغاز می‌شود که به زمین سفر کرده و در این مسیر با شخصیت‌ها و تجربیات متفاوتی روبه‌رو می‌شود.
          </p>
        </div>
    </div>
    {isModalOpen && (
  <div style={{
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  }}>
    <div style={{
      background: "rgba(255, 255, 255, 0.7)",
      padding: "2rem",
      borderRadius: "12px",
      width: "1125px",
      border:"5px solid #303857",
      height:"534px",
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
      <h3 style={{ textAlign: "center", color:"#303857",fontSize:"24px" }}>ثبت تجربه خواندن کتاب</h3>
      <p style={{ textAlign: "center", color:"#303857",fontSize:"20px" }}>با تکمیل این فرم، تجربه و نظرتان را درباره کتابی که خوانده‌اید با ما به اشتراک بگذارید.</p>

      <label style={{color:"#303857",marginRight:"494px",marginTop:"60px"}}>لطفا تجربه و نظرتان را در مورد کتاب بیان کنید...</label>
      <textarea rows={5} style={{ marginRight:"494px", padding: "0.8rem", width:"570px",height:"169px" ,borderRadius: "8px", background: "rgba(255, 255, 255, 0.2)", }} />

      <div style={{display:"flex" , gap:"44px", flexDirection:"column",marginTop:"-80px",marginRight:"100px"}}>
        <span style={{color:"#303857"}}>لطفا امتیاز خود را انتخاب کنید</span>
        <StepRating  rating={rating} onRate={setRating} />
      </div>

      <div style={{ display: "flex",flexDirection:"column", gap: "1rem", marginTop: "20px",marginRight:"90px" }}>
        <span style={{color:"#303857"}}>آیا این کتاب را به دوستانتان توصیه می‌کنید؟</span>
        <div style={{display:"flex", flexDirection:"row",gap:"16px"}}>
        <button style={{backgroundColor:"rgba(48, 56, 87, 0.35)",width:"105px",
          height:"41px",color:"#303857",border:"1px solid #303857",borderRadius:"10px"}}>بله</button>
        <button style={{backgroundColor:"rgba(48, 56, 87, 0.35)",width:"105px",
          height:"41px",color:"#303857",border:"1px solid #303857",borderRadius:"10px"}}>خیر</button>
          </div>
      </div>

      <div style={{ display: "flex", marginTop: "30px",gap:"15px",marginRight: "360px"}}>
        <button onClick={() => setIsModalOpen(false)} style={{
          backgroundColor: "#f9f9f9",
          width:"137px",
          height:"56px",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          fontSize:"16px",
          border: "2px solid #303857"
        }}>بعدا</button>
        <button style={{
          backgroundColor: "#303857",
          width:"137px",
          height:"56px",
          color: "white",
          fontSize:"16px",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          border: "none"
        }}>ثبت</button>
      </div>
    </div>
  </div>
)}

    <Footer />
    </>
);
};

