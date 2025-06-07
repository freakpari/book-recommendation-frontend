import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./ListofBooks.module.scss";
import bufkoor from "../Homepage/icon/bufkoor.svg";
import mark from "../../pages/Homepage/icon/mark.svg";
import berida from "../../pages/Homepage/icon/berida.svg";
import khasi from "../../pages/Homepage/icon/khasi.svg";
import kimiagar1 from "../../pages/Homepage/icon/kimiagarlarge.svg";
import asb from "../../pages/Homepage/icon/asb.svg";

import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {types} from "sass";
import Null = types.Null;


const books =  [ {title: "بوف کور", author: "صادق هدایت", img: bufkoor},
                 {title: "مارک و پلو", author: "منصورضابطیان ", img: mark},
                 {title: " بریدا", author: "پائولو کوئلیو ", img: berida},
                 {title: " خسی در میقات", author: "جلال آل احمد ", img: khasi},
                 {title: " کیمیاگر", author: " پائولو کوئلیو", img: kimiagar1},
                 {title: "اسب سیاه ", author: " تاد رز واگی گاس", img: asb}

]


export default function Listofbooks() {
    const [userName, setUserName] = useState();
    const [userType, setUserType] = useState();
    const isPersian = (text: string) => {
        const persianRegex = /[\u0600-\u06FF]/;
        return persianRegex.test(text);
    };
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

    }, []);
    return(
        <>
        <SearchNav />
        <div className={styles.text}>
        <h2 >لیست کتاب ها</h2>
        </div>
        <div className={styles.popularSection}>
        <div className={styles.toptext}>
            <h2>

                پیشنهادات جدید برای
                <span>
                            {isPersian(userName || "") ? (
                                ` ${userName}`
                            ) : (
                                ` : ${userName}`
                            )}
                        </span>
            </h2>
            <button className={styles.showbutton}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/recommendbooks">
            مشاهده همه
            </Link>
            </button>

        </div>
        <div className={styles.popularBooks}>
            {books.map((book, index) => (
                <div key={index} className={styles.cardwrapper}>
                    <img src={book.img} alt={book.title} />
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                </div>
            ))}

        </div>
        </div>

        <div className={styles.popularSection}>
        <div className={styles.toptext}>
            <h2>لیست کتاب‌‌های محبوب من</h2>
            <button className={styles.showbutton}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/popularbook">
            مشاهده همه
            </Link>
            </button>

        </div>
        <div className={styles.popularBooks}>
            {books.map((book, index) => (
                <div key={index} className={styles.cardwrapper}>
                    <img src={book.img} alt={book.title} />
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                </div>
            ))}

        </div>
        </div>
        
        
        
        <Footer />
        </>
    )
}