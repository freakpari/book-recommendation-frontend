import React from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./BookTalkPerson.module.scss";
import UserIcon from "./icons/userIcon.svg"
import Comment from "./icons/comment.svg"
import Dislike from "./icons/dislike.svg"
import Like from "./icons/like.svg"


export default function BookTalkPerson () {
    return (
        <div className={styles.container}>
            <div>
                <SearchNav />
            </div>
            <div>
                <div className={styles.header}>BookTalk</div>
                <div className={styles.bookTalk}>
                    <div className={styles.post}>
                        <div className={styles.postInfoOptions}>
                            <div className={styles.postUserIcon}>
                                <img src={UserIcon} alt="user icon" />
                            </div>
                            <div className={styles.postUserInfo}>
                                <div className={styles.postUserName}>مریم ساداتی</div>
                                <div className={styles.postUserId}>@marybooklover</div>
                            </div>
                            <div className={styles.postIcons}>
                                <img src={Comment} alt="comment icon" />
                                <img src={Dislike} alt="dislike icon" />
                                <img src={Like} alt="like icon" />
                            </div>
                        </div>
                        <div className={styles.postContent}><span className={styles.hashtag}>#ورونیکا_تصمیم_می‌گیرد_بمیرد</span> تأثیر عمیقی بر من گذاشت؛ روایت ساده و فلسفی ورونیکا باعث شد تا دوباره به ارزش‌های زندگی و مرگ فکر کنم. تجربه‌ای منحصر به فرد و اندیشمندانه.</div>
                    </div>
                    <div className={styles.commentText}>نظرات</div>
                    <div className={styles.comments}>
                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                        <div className={styles.comment}>
                            <div className={styles.commentInfo}>
                                <div className={styles.commentUserIcon}>
                                    <img src={UserIcon} alt="user icon" />
                                </div>
                                <div className={styles.commentUserInfo}>
                                    <div className={styles.commentUserName}>مریم ساداتی</div>
                                    <div className={styles.commentUserId}>@marybooklover</div>
                                </div>
                            </div>
                            <div className={styles.commentContent}><span className={styles.hashtag}>#ورونیکا</span> داستانی است که مرزهای میان زندگی و مرگ را به چالش می‌کشد. شخصیت‌های کتاب با دغدغه‌های عمیق و تناقضات زندگی، خواننده را به تفکر وا می‌دارند. این کتاب تجربه‌ای متفاوت از آشنایی با معنای واقعی زندگی به من داد.</div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}