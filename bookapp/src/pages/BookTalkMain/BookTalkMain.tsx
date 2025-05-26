import React, {useEffect, useState} from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./BookTalkMain.module.scss";
import Abbas from "./icons/Abbas.svg";
import UserProfileModal from "../../components/UserProfileModal/UserProfileModal";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";

interface Comments {
    commentid: number,
    userid: number,
    bookid: number,
    text: string,
    commentrefid: number,
    createdat: string,
    likecount: number,
    dislikecount: number,
    isblocked: boolean,
    isedited: boolean,
    isspoiled: boolean,
    reportcount: number,
    reportid: null
}

interface Props {
    bookid: string;
}

export default function BookTalkMain() {

    const [userid, setUserid] = useState("");
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = React.useState(false);
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();

    useEffect(() => {
        const handleComments = async () => {

            const bookid = 40;
            try {
                const response = await axios.get(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment/book/${bookid}`
                )

            }
            catch(error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطا در بارگیری کامنت‌ها",'error');

                }
            }
        };

        setUserid("10115");
        handleComments();
    }, []);


    useEffect(() => {
        if (isUserProfileModalOpen) {
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
    }, [isUserProfileModalOpen]);

    return (
        <div className={styles.container}>
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>

            <div>
                <SearchNav />
            </div>
            <div>
                <div className={styles.header}>BookTalk</div>
                <div className={styles.bookTalk}>
                    <div className={styles.scrollBar}>
                        <div className={styles.scrollBarContent}>
                            <div className={styles.minComment}>
                                <div 
                                    className={styles.minCommentInfo}
                                    onClick={() => setIsUserProfileModalOpen(true)}
                                >
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
                        </div>
                    </div>

                </div>


            </div>
            <div>
                <Footer/>
            </div>

            {isUserProfileModalOpen && (
                <UserProfileModal
                    onClose={() => setIsUserProfileModalOpen(false)}
                    userid={userid}
                />
            )}
            
        </div>
    )
}