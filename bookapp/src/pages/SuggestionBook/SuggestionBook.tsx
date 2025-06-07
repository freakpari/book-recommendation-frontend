import React, {useEffect, useState} from 'react';
import styles from './SuggestionBook.module.scss';
import Footer from '../../components/Footer/Footer';
import SearchNav from "../../components/SearchNav/SearchNav";
import defaultBook from "./icons/defaultBook.svg";
import axios from "axios";
import {AnimatePresence} from "framer-motion";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import {useNavigate} from "react-router-dom";

const isPersian = (text: string) => {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text);
};

interface SuggestedBooks {
    bookid: string,
    title: string,
    fullauthorname: string,
}

export default function SuggestionBook() {
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [userType, setUserType] = useState();
    const [userName, setUserName] = useState();
    const [suggestedBooks, setSuggestedBooks] = useState<SuggestedBooks[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

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
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                } else {
                    showNotificationMessage("خطا در دریافت تایپ کاربر", 'error');
                }
            }
        };

        const fetchUserInfo = async () => {
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
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                } else {
                    showNotificationMessage("خطا در دریافت نام کاربر", 'error');
                }
            }
        }


        fetchUserInfo();
        fetchUserType();
        fetchUserSuggestedbooks(pageNum);

        }, []);
    const fetchUserSuggestedbooks = async (page: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            showNotificationMessage("دسترسی غیرمجاز", "error");
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
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            } else {
                showNotificationMessage("خطا در دریافت کتاب‌های پیشنهادی", 'error');
            }
        }
    }

    const handleLoadMore = () => {
        setPageNum(prevPage => {
            const nextPage = prevPage + 1;
            fetchUserSuggestedbooks(nextPage);
            return nextPage;
        });
    }

    const handleClickOnBook =(bookid: string) => {
        console.log(bookid);
        navigate("/bookdetail/" + bookid);
    };

    return (
        <div className={styles.container}>
            <SearchNav />
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>


                <div className={styles.suggestedBooks}>

                    <h1
                        className={styles.header}
                    >
                        پیشنهاد برای
                        <span>
                            {isPersian(userName || "") ? (
                                ` ${userName} : ${userType}`
                            ) : (
                                ` ${userType} : ${userName}`
                            )}
                        </span>

                    </h1>

                        <div className={styles.scrollbar}>
                            {suggestedBooks.map((book) => (
                                <div key={book.bookid}>
                                    <button
                                        className={styles.bookCard}
                                        onClick={() => handleClickOnBook(book.bookid)}
                                    >
                                        <div className={styles.bookImage}>
                                            <img
                                                src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${book.bookid}`}
                                                alt={book.title}
                                                onError={(e) => {
                                                    if (e.currentTarget.src !== defaultBook) {
                                                        e.currentTarget.src = defaultBook;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className={styles.bookInfo}>
                                            <div className={styles.bookName}>{book.title}</div>
                                            <div className={styles.bookAuthor}>{book.fullauthorname}</div>
                                        </div>
                                    </button>
                                </div>
                            ))}

                        {hasMore && (
                            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                                نمایش بیشتر
                            </button>
                        )}
                    </div>

                </div>

                <div className={styles.answerTest}>

                    <h1 className={styles.answerHeader}>
                        نتیجه تست<br/>MBTI
                    </h1>

                    <h1 className={styles.userType}>{userType}</h1>
                    <a href="https://www.16personalities.com/fa/%D8%A2%D8%B2%D9%85%D9%88%D9%86-%D8%B4%D8%AE%D8%B5%DB%8C%D8%AA">

                        <button className={styles.goToTestBtn}>
                            تست دوباره
                        </button>
                    </a>
                </div>


            <div>
                <Footer />
            </div>

        </div>
    )
}