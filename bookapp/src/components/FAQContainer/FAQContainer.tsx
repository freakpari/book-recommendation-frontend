import React from "react";
import {useState} from "react";
import styles from "./FAQContainer.module.scss"
import toggleIconDown from "../../toggleIconDown.svg"
import toggleIconUp from "../../toggleIconUp.svg"
import {motion} from "framer-motion"
import {AnimatePresence} from "framer-motion";


export default function FAQContainer(){

    const [activeQuastion, setActiveQuastion] = useState<number | null>(null);

    const question = [
        {
            id:1,
            question: "چگونه می‌توانم در «کرم کتاب» ثبت‌نام کنم؟",
            answer: "برای ثبت‌نام، روی دکمه \"ثبت‌نام\" در بالای صفحه کلیک کنید و فرم مربوطه را با وارد کردن ایمیل و رمز عبور تکمیل نمایید. همچنین امکان ورود سریع با حساب گوگل وجود دارد."
        },
        {
            id:2,
            question: "چگونه تست شخصیت‌شناسی را انجام دهم؟",
            answer: "پس از ورود به حساب کاربری، به بخش \"تست شخصیت\" بروید. با پاسخ به چند سوال ساده، سبک خواندن و علایق شما شناسایی شده و کتاب‌های متناسب با شخصیتتان پیشنهاد می‌شوند."
        },
        {
            id:3,
            question: "چگونه کتاب‌های پیشنهادی را ذخیره کنم؟",
            answer: "در صفحه جزئیات هر کتاب، دکمه \"ذخیره در علاقه‌مندی‌ها\" موجود است. با کلیک روی این دکمه، کتاب به لیست علاقه‌مندی‌های شما اضافه می‌شود و در داشبورد کاربری قابل مشاهده خواهد بود."
        },
        {
            id:4,
            question: "آیا اطلاعات شخصی من محفوظ است؟",
            answer: "بله، حریم خصوصی کاربران برای ما بسیار مهم است. تمامی اطلاعات شما طبق استانداردهای امنیتی بالا ذخیره و محافظت می‌شوند."
        },
        {
            id:5,
            question: "چگونه می‌توانم نظرات خود را درباره کتاب‌ها ثبت کنم؟",
            answer: "در صفحه جزئیات کتاب، فرم ثبت نظر قرار دارد. شما می‌توانید نظرات خود را ارسال کرده و همچنین نظرات سایر کاربران را مشاهده و بر اساس جدیدترین یا محبوب‌ترین آن‌ها فیلتر کنید."
        },
        {
            id:6,
            question: "در صورت بروز مشکل یا سوال، چه کاری انجام دهم؟",
            answer: "در صورت بروز هرگونه مشکل، از طریق صفحه \"تماس با ما\" یا \"ایمیل پشتیبانی\" با ما در ارتباط باشید. تیم پشتیبانی ما در سریع‌ترین زمان ممکن به شما پاسخ خواهد داد."
        }
    ];

    return (
        <div>
            <div className={styles.container}>
                {question.map((q) => (
                    <div key={q.id}  className={styles.container}>
                        <button onClick={() => setActiveQuastion ( activeQuastion === q.id ? null : q.id )}>
                            {q.question}
                            {activeQuastion === q.id ? (
                                <img className={styles.UpIcon} src={toggleIconUp} alt="hide answer"/>
                            ) : <img className={styles.DownIcon} src={toggleIconDown} alt="show answer" />
                            }
                        </button>
                        <AnimatePresence>
                            {activeQuastion === q.id && (
                                <motion.div
                                initial={{opacity: 0,
                                height: 0,}}
                                animate={{opacity: 1,
                                height: "auto",}}
                                exit={{ opacity: 0,
                                height: 0,}}
                                className={styles.Answer}
                                >
                                    <p>{q.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                ))}

            </div>
        </div>
    )
}
