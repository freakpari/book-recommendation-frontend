import React from "react";
import styles from "./ReplyComment.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import UserIcon from "./icons/userIcon.svg";
import Like from "./icons/like.svg";
import Dislike from "./icons/dislike.svg";
import Comment from "./icons/comment.svg";
// import axios from "axios";
import Arrow from "./icons/arrow.svg";


export default function ReplyComment() {

    return (
        <div className={styles.container}>
            <div>
                <SearchNav />
            </div>
            <div className={styles.commentReply}>
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
                            <img
                                src={Comment}
                                alt="comment icon"
                            />
                            <img
                                src={Dislike}
                                alt="dislike icon"
                                // onClick={handleDisLikeComment}
                            />
                            <img
                                src={Like}
                                alt="like icon"
                                // onClick={handleLikeComment}
                            />
                        </div>
                    </div>
                    <div className={styles.postContent}><span className={styles.hashtag}>#ورونیکا_تصمیم_می‌گیرد_بمیرد</span> تأثیر عمیقی بر من گذاشت؛ روایت ساده و فلسفی ورونیکا باعث شد تا دوباره به ارزش‌های زندگی و مرگ فکر کنم. تجربه‌ای منحصر به فرد و اندیشمندانه.</div>
                    <div className={styles.arrowIcon}>
                        <img src={Arrow} alt="arrow icon" />
                    </div>
                </div>



                <div className={styles.reply}>
                    <textarea
                        className={styles.replyBox}
                        placeholder="شما درمورد این نظر چه نظری دارید؟"
                    />
                    <div className={styles.Btns}>
                        <div>
                            <button className={styles.cancleBtn}>انصراف</button>
                        </div>
                        <div>
                            <button className={styles.submitBtn}>ثبت</button>
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