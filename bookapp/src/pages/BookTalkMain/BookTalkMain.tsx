import React from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./BookTalkMain.module.scss";
import Abbas from "./icons/Abbas.svg"
import Maryam from "./icons/Maryam.svg"
import Rana from "./icons/Rana.svg"
import Sogol from "./icons/Sogol.svg"

export default function BookTalkMain() {
    return (
        <div className={styles.container}>
            <div>
                <SearchNav />
            </div>
            <div>
                <div className={styles.header}>BookTalk</div>
                <div className={styles.bookTalk}>
                    <div className={styles.scrollBar}>
                        <div className={styles.scrollBarContent}>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.midComment}>
                                <div className={styles.midCommentInfo}>
                                    <div>
                                        <img src={Maryam} alt="user icon"/>
                                    </div>
                                    <div className={styles.midUserInfo}>
                                        <div className={styles.midUserName}>مریم ساداتی</div>
                                        <div className={styles.midUserId}>@marybooklover</div>
                                    </div>
                                </div>
                                <div className={styles.midCommentContent}>
                                    <div><span className={styles.hashtag}> #ورونیکا_تصمیم_می‌گیرد_بمیرد </span>تأثیر
                                        عمیقی بر من گذاشت؛ روایت ساده و فلسفی ورونیکا باعث شد تا دوباره به ارزش‌های
                                        زندگی و مرگ فکر کنم. تجربه‌ای منحصر به فرد و اندیشمندانه.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.midComment}>
                                <div className={styles.midCommentInfo}>
                                    <div>
                                        <img src={Maryam} alt="user icon"/>
                                    </div>
                                    <div className={styles.midUserInfo}>
                                        <div className={styles.midUserName}>مریم ساداتی</div>
                                        <div className={styles.midUserId}>@marybooklover</div>
                                    </div>
                                </div>
                                <div className={styles.midCommentContent}>
                                    <div><span className={styles.hashtag}> #ورونیکا_تصمیم_می‌گیرد_بمیرد </span>تأثیر
                                        عمیقی بر من گذاشت؛ روایت ساده و فلسفی ورونیکا باعث شد تا دوباره به ارزش‌های
                                        زندگی و مرگ فکر کنم. تجربه‌ای منحصر به فرد و اندیشمندانه.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment2}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment2}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment2}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.minComment}>
                                <div className={styles.minCommentInfo}>
                                    <div>
                                        <img src={Abbas} alt="user icon"/>
                                    </div>
                                    <div className={styles.minUserInfo}>
                                        <div className={styles.minUserName}>عباس عباسی</div>
                                        <div className={styles.minUserId}>@abbassi</div>
                                    </div>
                                </div>
                                <div className={styles.minCommentContent}>
                                    <div><span className={styles.hashtag}>#انسان_در_جستجوی_معنا</span> یک سفر فلسفی است؛
                                        الهام‌بخش و انگیزشی، اگرچه بعضی قسمت‌ها تکراری به نظر می‌رسد.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.maxComment2}>
                                <div className={styles.maxCommentInfo}>
                                    <div>
                                        <img src={Sogol} alt="user icon"/>
                                    </div>
                                    <div className={styles.maxUserInfo}>
                                        <div className={styles.maxUserName}>سوگل بیگی</div>
                                        <div className={styles.maxUserId}>@soogool</div>
                                    </div>
                                </div>
                                <div className={styles.maxCommentContent}>
                                    <div><span className={styles.hashtag}>#خسی_در_میقات</span> اثر جلال آل احمد، با
                                        نگاهی تند و انتقادی به ناهنجاری‌های فرهنگی و اجتماعی می‌پردازد. این اثر، علاوه
                                        بر نقد واقعیت‌های تلخ جامعه، خواننده را به تأمل عمیق در مسائل هویتی و فرهنگی
                                        دعوت می‌کند؛ یک تجربه تلخ اما الهام‌بخش که فراخوانی برای بازنگری در ارزش‌های
                                        اجتماعی است.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}