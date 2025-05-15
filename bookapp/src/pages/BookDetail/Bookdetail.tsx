import styles from './Bookdetail.module.scss';
import {useEffect, useState} from "react";
import SearchNav from '../../components/SearchNav/SearchNav';
import Footer from '../../components/Footer/Footer';
import heart from "./icons/Heart.svg";
import filledHeart from "./icons/filled.png";
import comment from "./icons/Comment.svg";
import profile  from "./icons/profile.svg";
import {ReactComponent as CircleAdd } from "./icons/CircleAdd.svg";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StepRating from "./rating";
import UserProfileModal from "../../components/UserProfileModal/UserProfileModal";
import AddBookToListModal from "../../components/AddBookToListModal/AddBookToListModal";
import axios from 'axios';
import eventEmitter from "../../utils/eventEmitter";
import not from "../PopularBook/icon/not.png";
import { setCommentRange } from 'typescript';
import { TextField } from "@mui/material";



interface LocationState {
  imageUrl: string;
  title: string;
  author: string;
  avgrate: number;
  commentText:string;
}




export default function Bookdetail () {
  const { id } = useParams();
  useEffect(() => {
    console.log("Book ID:", id);
  }, [id]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  eventEmitter.emit();
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [isAddBookToListModalOpen, setIsAddBookToListModalOpen] = useState(false);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(4);
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const state = location.state as LocationState | null;
const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setCommentText(event.target.value); 
};
  
const submit = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("برای ثبت امتیاز لطفاً وارد شوید.");
    return;
  }

  // Validate inputs before making any API calls
  if (!rating) {
    alert("لطفاً امتیاز خود را انتخاب کنید.");
    return;
  }

  if (!commentText.trim()) {
    alert("لطفاً نظر خود را وارد کنید.");
    return;
  }
   setIsSubmitting(true); 

  console.log("Submitting:", { bookid: id, rate: rating, text: commentText });

  try {
    // Submit rating first
    const ratingResponse = await axios.post(
      "https://intelligent-shockley-8ynjnlm8e.liara.run/api/rate",
      {
        bookid: id,
        rate: rating
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Rating response:", ratingResponse.data);

    // Then submit comment
    const commentResponse = await axios.post(
      "https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment",
      {
        bookid: id,
        text: commentText   
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Comment response:", commentResponse.data);

    alert("امتیاز و نظر شما با موفقیت ثبت شد");
    setIsModalOpen(false);
    setCommentText("");
    setRating(0); // Reset rating if needed

  } catch (error: any) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });

    if (error.response) {
      // Server responded with a status code outside 2xx
      alert(`خطای سرور: ${error.response.data.message || 'مشکلی در سرور رخ داده است'}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("پاسخی از سرور دریافت نشد. لطفاً اتصال اینترنت خود را بررسی کنید.");
    } else {
      // Something happened in setting up the request
      alert("خطا در تنظیم درخواست: " + error.message);
    }

  }
  finally {
    setIsSubmitting(false); // End loading regardless of success/error
  }
};

    useEffect(() => {
        if (isUserProfileModalOpen || isModalOpen || isAddBookToListModalOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, [isUserProfileModalOpen || isModalOpen || isAddBookToListModalOpen]);

    return (
    <>
    <SearchNav />
    <div className={styles.container}>
    <div className={styles.rightSection}>
    <div className={styles.icons}>
        <img src={heart} className={styles.heartIcon} 
 />
        <img  onClick={() => setIsModalOpen(true)} src={comment}  className={styles.commentIcon} />
        <CircleAdd className={styles.circleAdd} onClick={() => setIsAddBookToListModalOpen(true)} />
        </div>
        <img
        src={state?.imageUrl || not}
        alt=" picture"
        className={styles.bookCover}
        />
        <div className={styles.text}>
        <h2>{state?.title || "none"}</h2>
        <p className={styles.author}>{state?.author || "none"}</p>
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
                <button
                    className={styles.profileBtn}
                    onClick={() => setIsUserProfileModalOpen(true)}
                >
                    <img src={profile} alt='profile' />
                    <h1>علی محمدی</h1>
                </button>
            </div>
            <p>
              "شازده کوچولو ترکیبی از سادگی و فلسفه است. روایت‌های شاعرانه و مفاهیم عمیقی که در قالب داستانی کودکانه بیان می‌شوند، واقعاً تاثیرگذارند."
            </p>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.profile}>
                <button
                    className={styles.profileBtn}
                    onClick={() => setIsUserProfileModalOpen(true)}
                    >
                    <img src={profile} alt='profile' />
                    <h1>مریم حسینی</h1>
                </button>
            </div>
            <p>
              "این کتاب، سفری به دنیای درون است. هر بار که می‌خوانمش، نکته جدیدی کشف می‌کنم."
            </p>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.profile}>
                <button
                    className={styles.profileBtn}
                    onClick={() => setIsUserProfileModalOpen(true)}
                >
                    <img src={profile} alt='profile' />
                    <span>شاهین رشیدی</span>
                </button>
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
        {isUserProfileModalOpen && (
            <UserProfileModal onClose={() => setIsUserProfileModalOpen(false)} />
        )}

        {isAddBookToListModalOpen && (
            <AddBookToListModal onClose={() => setIsAddBookToListModalOpen(false)} />
        )}

    {isModalOpen && (
  <div style={{
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    backdropFilter:"blur(0.6rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 1000
  }}>
    <div style={{
      position:"fixed",
      // zIndex:"1001",
      backdropFilter:"blur(1.2rem)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      padding: "2rem",
      borderRadius: "  0.6rem",
      width: "1125px",
      border:"0.3rem solid #303857",
      height:"534px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
      <h3 style={{ textAlign: "center", color:"#303857",fontSize:"24px" }}>ثبت تجربه خواندن کتاب</h3>
      <p style={{ textAlign: "center", color:"#303857",fontSize:"20px" }}>با تکمیل این فرم، تجربه و نظرتان را درباره کتابی که خوانده‌اید با ما به اشتراک بگذارید.</p>

      <label style={{color:"#303857",marginRight:"494px",marginTop:"60px"}}>لطفا تجربه و نظرتان را در مورد کتاب بیان کنید...</label>
         <TextField
  className={styles.inputComment} 
  value={commentText} 
  onChange={handleCommentChange}
/>

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

      <div
      onClick={() => !isSubmitting && setIsModalOpen(false)} 
      style={{ display: "flex", marginTop: "10px",gap:"15px",marginRight: "390px"}}>
        <button onClick={() => setIsModalOpen(false)} style={{
          backgroundColor: "#f9f9f9",
          width:"137px",
          height:"56px",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          fontSize:"16px",
          border: "2px solid #303857"
        }}>بعدا</button>
        <button onClick={submit}
        disabled={isSubmitting}
        style={{
          backgroundColor: "#303857",
          width:"137px",
          height:"56px",
          color: "white",
          fontSize:"16px",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          border: "none"
        }}>
            {isSubmitting ? "در حال ثبت..." : "ثبت"}
        </button>
      </div>
    </div>
  </div>
)}

    <Footer />

    </>

);
};

