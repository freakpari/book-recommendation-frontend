import React from "react";
import {useState} from "react";
import styles from "./FAQContainer.module.scss"
import toggleIconDown from "../../toggleIconDown.svg"
import toggleIconUp from "../../toggleIconUp.svg"


export default function FAQContainer(){
    // @ts-ignore
    const [showAnwser1, setShowAnwser1] = useState(false);
    const [showAnwser2, setShowAnwser2] = useState(false);
    const [showAnwser3, setShowAnwser3] = useState(false);
    const [showAnwser4, setShowAnwser4] = useState(false);
    const [showAnwser5, setShowAnwser5] = useState(false);
    const [showAnwser6, setShowAnwser6] = useState(false);


    return (
        <div className={styles.container}>

            <div className={styles.QAB}>
                <h1>چگونه می‌توانم در «کرم کتاب» ثبت‌نام کنم؟</h1>
                {showAnwser1 ?
                    <button className={styles.UpIcon}
                        onClick={() => setShowAnwser1(!showAnwser1)}>
                        <img src={toggleIconUp} alt="hide answer" />
                    </button>
                    : <button className={styles.DownIcon}
                              onClick={() => setShowAnwser1(!showAnwser1)}>
                        <img  src={toggleIconDown} alt="show answer" />
                    </button>
                }

            </div>
            <div className={styles.Answer}>
                {showAnwser1 &&
                <p>برای ثبت‌نام، روی دکمه "ثبت‌نام" در بالای صفحه کلیک کنید و فرم مربوطه را با وارد کردن ایمیل و رمز عبور تکمیل نمایید. همچنین امکان ورود سریع با حساب گوگل وجود دارد.</p>
                }
            </div>

            <div className={styles.QAB}>
                <h1>چگونه تست شخصیت‌شناسی را انجام دهم؟</h1>
                {showAnwser2 ?
                    <button className={styles.UpIcon}
                        onClick={() => setShowAnwser2(!showAnwser2)}>
                        <img src={toggleIconUp} alt="hide answer" />
                    </button>
                    : <button className={styles.DownIcon}
                              onClick={() => setShowAnwser2(!showAnwser2)}>
                        <img src={toggleIconDown} alt="show answer" />
                    </button>
                }

            </div>
            <div className={styles.Answer}>
                {showAnwser2 &&
                    <p>پس از ورود به حساب کاربری، به بخش "تست شخصیت" بروید. با پاسخ به چند سوال ساده، سبک خواندن و علایق شما شناسایی شده و کتاب‌های متناسب با شخصیتتان پیشنهاد می‌شوند.</p>
                }
            </div>

            <div className={styles.QAB}>
                <h1>چگونه کتاب‌های پیشنهادی را ذخیره کنم؟</h1>
                {showAnwser3 ?
                    <button className={styles.UpIcon}
                            onClick={() => setShowAnwser3(!showAnwser3)}>
                        <img src={toggleIconUp} alt="hide answer" />

                    </button>
                    : <button className={styles.DownIcon}
                              onClick={() => setShowAnwser3(!showAnwser3)}>
                        <img src={toggleIconDown} alt="show answer" />

                    </button>
                }

            </div>
            <div className={styles.Answer}>
                {showAnwser3 &&
                    <p>در صفحه جزئیات هر کتاب، دکمه "ذخیره در علاقه‌مندی‌ها" موجود است. با کلیک روی این دکمه، کتاب به لیست علاقه‌مندی‌های شما اضافه می‌شود و در داشبورد کاربری قابل مشاهده خواهد بود.</p>
                }
            </div>

            <div className={styles.QAB}>
                <h1>آیا اطلاعات شخصی من محفوظ است؟</h1>
                {showAnwser4 ?
                    <button className={styles.UpIcon}
                            onClick={() => setShowAnwser4(!showAnwser4)}>
                        <img src={toggleIconUp} alt="hide answer" />

                    </button>
                    : <button className={styles.DownIcon}
                              onClick={() => setShowAnwser4(!showAnwser4)}>
                        <img src={toggleIconDown} alt="show answer" />

                    </button>
                }

            </div>
            <div className={styles.Answer}>
                {showAnwser4 &&
                    <p>بله، حریم خصوصی کاربران برای ما بسیار مهم است. تمامی اطلاعات شما طبق استانداردهای امنیتی بالا ذخیره و محافظت می‌شوند.</p>
                }
            </div>

            <div className={styles.QAB}>
                <h1>چگونه می‌توانم نظرات خود را درباره کتاب‌ها ثبت کنم؟</h1>
                {showAnwser5 ?
                    <button className={styles.UpIcon}
                            onClick={() => setShowAnwser5(!showAnwser5)}>
                        <img src={toggleIconUp} alt="hide answer" />

                    </button>
                    : <button className={styles.DownIcon}
                              onClick={() => setShowAnwser5(!showAnwser5)}>
                        <img src={toggleIconDown} alt="show answer" />

                    </button>
                }

            </div>
            <div className={styles.Answer}>
                {showAnwser5 &&
                    <p>در صفحه جزئیات کتاب، فرم ثبت نظر قرار دارد. شما می‌توانید نظرات خود را ارسال کرده و همچنین نظرات سایر کاربران را مشاهده و بر اساس جدیدترین یا محبوب‌ترین آن‌ها فیلتر کنید.</p>
                }
            </div>

            <div className={styles.QAB}>
                <h1>در صورت بروز مشکل یا سوال، چه کاری انجام دهم؟</h1>
                {showAnwser6 ?
                    <button className={styles.UpIcon}
                            onClick={() => setShowAnwser6(!showAnwser6)}>
                        <img src={toggleIconUp} alt="hide answer" />

                    </button>
                    : <button className={styles.DownIcon}
                              onClick={() => setShowAnwser6(!showAnwser6)}>
                        <img src={toggleIconDown} alt="show answer" />

                    </button>
                }

            </div>
            <div className={styles.Answer}>
                {showAnwser6 &&
                    <p>در صورت بروز هرگونه مشکل، از طریق صفحه "تماس با ما" یا ایمیل پشتیبانی با ما در ارتباط باشید. تیم پشتیبانی ما در سریع‌ترین زمان ممکن به شما پاسخ خواهد داد.</p>
                }
            </div>
        </div>


    );
}






