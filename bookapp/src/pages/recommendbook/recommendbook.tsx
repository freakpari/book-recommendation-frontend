import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./recommendbook.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import Styles from "../PopularBook/PopularBook.module.scss";

interface Book {
    BookID: string;
    Title: string;
    FullAuthorName: string;
    imageUrl?: string;
}

const fetchBookImageFromAPI = async (bookid: string): Promise<string | undefined> => {
    try {
        const response = await axios.get(
            `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${bookid}`,
            { responseType: 'blob' }
        );
        if (response.status === 200) {
            return URL.createObjectURL(response.data);
        }
    } catch (error) {
        console.error("Error fetching book image:", error);
    }
    return undefined;
};

export default function Recommendbook() {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [end, setEnd] = useState(false);
    const [userName, setUserName] = useState<string | undefined>();
    const [userType, setUserType] = useState<string | undefined>();

    const isPersian = (text: string) => {
        const persianRegex = /[\u0600-\u06FF]/;
        return persianRegex.test(text);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("توکن یافت نشد.");
            return;
        }

        const fetchUserType = async () => {
            try {
                const response = await axios.get(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/MBTI`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        timeout: 10000
                    }
                );
                setUserType(response.data.user.MBTI);
            } catch (error: any) {
                alert("خطا در دریافت تایپ کاربر");
                console.error("MBTI Error:", error);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        timeout: 10000
                    }
                );
                setUserName(response.data.user.first_name);
            } catch (error: any) {
                alert("خطا در دریافت نام کاربر");
                console.error("Profile Error:", error);
            }
        };

        fetchUserInfo();
        fetchUserType();
        fetchBooks(); // فراخوانی اولیه
    }, []);

    const fetchBooks = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("توکن یافت نشد.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/suggestion`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        pagenum: page
                    }
                }
            );

            const newBooks: Book[] = response.data.books || response.data;

            if (newBooks.length === 0) {
                setEnd(true);
            } else {
                // گرفتن تصویر برای هر کتاب
                const booksWithImages = await Promise.all(
                    newBooks.map(async (book) => {
                        const imageUrl = await fetchBookImageFromAPI(book.BookID);
                        return { ...book, imageUrl };
                    })
                );

                setBooks((prev) => [...prev, ...booksWithImages]);
                setPage((prev) => prev + 1);
            }
        } catch (error: any) {
            alert("خطا در دریافت کتاب‌ها");
            console.error("Book API Error:", error.response || error.message || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SearchNav />
            <div className={styles.text}>
                <h2>
                    پیشنهادات جدید برای
                    <span>
            {isPersian(userName || "") ? ` ${userName} ` : `: ${userName}`}
          </span>
                </h2>
            </div>

            <div className={styles.popularBooks}>
                {books.map((book, index) => (
                    <div key={index} className={styles.cardwrapper}>
                        <img
                            className={styles.photo}
                            src={book.imageUrl || "/default-book.jpg"}
                            alt={book.Title}
                        />
                        <h4 className={styles.title2} >{book.Title}</h4>
                        <p className={Styles.para}>{book.FullAuthorName}</p>
                    </div>
                ))}
            </div>

            {!end && (
                <button
                    className={styles.loadmore}
                    disabled={loading}
                    onClick={fetchBooks}
                >
                    {loading ? "در حال بارگذاری..." : "نمایش بیشتر"}
                </button>
            )}

            {end && <p className={styles.endmessage}>کتاب بیشتری موجود نیست.</p>}

            <Footer />
        </>
    );
}
