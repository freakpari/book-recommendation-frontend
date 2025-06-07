import styles from "./Homepage.module.scss";
import book1 from "./icon/book1.svg";
import book2 from "./icon/book2.svg";
import book3 from "./icon/book3.svg";
import bufkoor from "./icon/bufkoor.svg";
import kimia from "./icon/kimiagar.svg";
import payambar from "./icon/payambar.svg";
import ensan from "./icon/ensan.svg";
import book4 from "./icon/book4.svg";
import book5 from "./icon/book5.svg";
import book6 from "./icon/book6.svg";
import book7 from "./icon/book7.svg";
import book8 from "./icon/book8.svg";
import book9 from "./icon/book9.svg";
import book10 from "./icon/shazde.svg";
import icon1 from "./icon/icon1.svg";
import icon2 from "./icon/icon2.svg";

import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import not from "../PopularBook/icon/not.png";
import {fetchBookImageFromAPI, fetchPopularBooksFromAPI} from "../../services/Bookservice";

interface Book {
  bookid: string;
  title: string;
  author: string;
  imageUrl: string;
}




const handleClick = () => {
  window.location.href =
      "https://www.16personalities.com/fa/%D8%A2%D8%B2%D9%85%D9%88%D9%86-%D8%B4%D8%AE%D8%B5%DB%8C%D8%AA";
};


interface SuggestedBooks {
  bookid: string,
  title: string,
  fullauthorname: string,
}
interface UserCollection {
  title: string;
  username: string;
  fullname: string;
  discription: string;
  collectionid: number;
  accessibilityGroupID: number;
}


const isPersian = (text: string) => {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(text);
};
export default function HomePage() {
  const [userName, setUserName] = useState();
  const [userType, setUserType] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [suggestedBooks, setSuggestedBooks] = useState<SuggestedBooks[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [collections, setCollections] = useState<UserCollection[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPopularBooks = async (page: number) => {
    setLoading(true);
    try {
      const responseBooks = await fetchPopularBooksFromAPI(page);
      const fetchedBooks = await Promise.all(
          responseBooks.map(async (book: Book) => {
            const imageUrl = await fetchBookImageFromAPI(book.bookid);
            return { ...book, imageUrl: imageUrl || not };
          })
      );
      if (fetchedBooks.length > 0) {
        setBooks((prevBooks) => [...prevBooks, ...fetchedBooks]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching popular books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const responseBooks = await fetchPopularBooksFromAPI(pageNum);
        setBooks((prevBooks) => [...prevBooks, ...responseBooks]);

        responseBooks.forEach(async (book: Book) => {
          const imageUrl = await fetchBookImageFromAPI(book.bookid);
          setBooks((prevBooks) =>
              prevBooks.map((b) =>
                  b.bookid === book.bookid ? { ...b, imageUrl: imageUrl || not } : b
              )
          );
        });

        if (responseBooks.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching popular books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [pageNum]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      console.log("توکن یافت نشد.");
      return;
    }
    const fetchUserType = async () => {

      try {
        const response = await axios.get(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/MBTI`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
              timeout: 10000
            });
        setUserType(response.data.user.MBTI);

      } catch (error: any) {
        if (error.code === 'ECONNREFUSED') {
          alert("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.");
        } else {
          alert("خطا در دریافت تایپ کاربر");
        }
      }
    };

    const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 10000
          });
      setUserName(response.data.user.first_name);

    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        alert("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.");
      } else {
        alert("خطا در دریافت نام کاربر");
      }
    }
  }

    fetchUserInfo();
    fetchUserType();
    fetchUserSuggestedbooks(pageNum);
    fetchCollections();

  }, []);

  const fetchCollections = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("دسترسی غیرمجاز");
      return;
    }

    try {
      const response = await axios.get(
          "https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 10000
          }
      );
      setCollections(response.data);
    } catch (error: any) {
      console.error("خطا در واکشی کالکشن‌ها:", error);
    }
  };
  const fetchUserSuggestedbooks = async (page: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("دسترسی غیرمجاز");
      return;
    }

    try {
      const response = await axios.get(
          `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/MBTIbooks?pagenum=${page}&count=13`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 10000
          }
      );

      const newBooks: SuggestedBooks[] = response.data.books.map((book: any) => ({
        bookid: book.bookid,
        title: book.title,
        fullauthorname: book.fullauthorname,
      }));

      setSuggestedBooks((prev) => [...prev, ...newBooks]);

      if (newBooks.length < 13) {
        setHasMore(false);
      }
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        alert("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.");
      } else {
        alert("خطا در دریافت کتاب‌های پیشنهادی");
      }
    }
  }
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

          <div className={styles.popularSection}>
            <div className={styles.toptext}>
              <h2>محبوب‌ترین‌ها</h2>
              <button className={styles.showbutton}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/popularbook">
                  مشاهده همه
                </Link>
              </button>

            </div>
            <div className={styles.popularBooks}>
              {books.slice(0, 6).map((book) => (
                  <Link style={{textDecoration:"none"}} to={`/bookdetail/${book.bookid}`}   key={book.bookid}
                        state={{ imageUrl: book.imageUrl,
                          title: book.title,
                          author: book.author
                        }}
                        >
              <div className={styles.cardwrapper}>

                <img src={book.imageUrl || not} alt={book.title} className={styles.imageUrl}  />
                <h4>{book.title}</h4>
                <p> {book.author}</p>
              </div>
                  </Link>
              ))}

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

            <div className={styles.wrapper}>
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
          </div>
          <div className={styles.toptext}>
            <h2>
              پیشنهادات برای
              <span>
                            {isPersian(userName || "") ? (
                                ` ${userName} : ${userType}`
                            ) : (
                                ` ${userType} : ${userName}`
                            )}
                        </span>
            </h2>
            <button className={styles.showbutton} >
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/suggestionBook">

              مشاهده همه
              </Link>
            </button>
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
                  src={kimia}
                  alt="کیمیاگر"
                  className={styles.coverimage}
              />
              <h2> کیمیاگر</h2>
              <h3> پائولو کوئیلو</h3>
              <p>
                «کیمیاگر» نوشته‌ی پائولو کوئیلو، داستانی است درباره‌ی سفر درونی به سوی تحقق رویاها. این کتاب برای INFJهایی که به دنبال معنا و الهام در مسیر زندگی هستند، انتخابی فوق‌العاده است.
              </p>
            </div>
            <div className={styles.bookcover}>
              <img
                  src={ensan}
                  alt="انسان در جست‌وجوی معنا"
                  className={styles.coverimage}
              />
              <h2> انسان در جست‌وجوی معنا</h2>
              <h3>ویکتور فرانکل</h3>
              <p>
                «انسان در جستجوی معنا» نوشته‌ی ویکتور فرانکل، داستان واقعی بقا و یافتن معنا در میان چالش‌های زندگی را روایت می‌کند؛ کتابی که برای INFJها با دیدگاه عمیق به مسائل وجودی، بسیار کاربردی و الهام‌بخش است.
              </p>
            </div>
            <div className={styles.bookcover}>
              <img
                  src={payambar}
                  alt="پیامبر"
                  className={styles.coverimage}
              />
              <h2> پیامبر</h2>
              <h3>جبران خلیل جبران</h3>
              <p>
                «پیامبر» نوشته‌ی خلیل جبران، با نثری عمیق و فلسفی، برای INFJهایی که به دنبال تفکر در باب ارزش‌های انسانی و معنویت هستند، منبع الهام و تأمل است.
              </p>
            </div>
          </div>
          <div className={styles.toptext}>
            <h2>لیست های دیگر کاربران</h2>
            <button className={styles.showbutton}>مشاهده همه</button>
          </div>
          <div className={styles.listsWrapper}>
            <div className={styles.cardImage}>
              <img src={icon1} alt="کتاب فانتزی"  className={styles.fante1}/>
            </div>
            <div className={styles.listCard}>
              <div className={styles.wrapper2}>
                <h3 className={styles.category}>دنیای رنگی خیال</h3>
                <p className={styles.author}>توسط: گلنار شفیعی</p>
                <p className={styles.description2}>
                  شامل: سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت، سری کتاب‌های هابیت
                </p>
              </div>
            </div>
            <div className={styles.cardImage}>
              <img src={icon2} alt="کتاب فانتزی" className={styles.fante} />
            </div>
            <div className={styles.listCard}>
              <div className={styles.wrapper2}>
                <h3 className={styles.category}>  روانشناسی</h3>
                <p className={styles.author}>توسط: پریوش چراغی</p>
                <p className={styles.description2}>
                  شامل: سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت، سری کتاب‌های هابیت
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </div>

  </>
  );
}