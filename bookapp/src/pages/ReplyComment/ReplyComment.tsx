import React, {useEffect, useState} from "react";
import styles from "./ReplyComment.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import defaultUser from "./icons/defaultUser.svg";
import Arrow from "./icons/arrow.svg";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import UserProfileModal from "../../components/UserProfileModal/UserProfileModal";
import {useNotification, NotificationModal,} from "../../components/NotificationManager/NotificationManager";
import {AnimatePresence} from "framer-motion";

export default function ReplyComment() {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage,
    } = useNotification();
    const bookid = localStorage.getItem("bookid");
    const location = useLocation();
    const commentid = location.state?.commentid || "";
    const mainUserId = location.state?.mainUserId || "";
    const fullname = location.state?.fullname || "";
    const username = location.state?.username || "";
    const text = location.state.text || "";
    const [mainUserImage, setMainUserImage] = useState<{ [key: string]: string }>({});
    const [refText, setRefText] = useState("");
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendRefText = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment`,
                {
                    bookid: bookid,
                    text: refText,
                    commentrefid: commentid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json",
                    }
                })

            showNotificationMessage("نظر شما با موفقیت ثبت شد",'success');

            setTimeout(() => {
                navigate("/booktalkperson",
                    {
                        state:
                            {
                                commentid : commentid,
                                userid : mainUserId,
                                fullname : fullname,
                                username :username,
                                text :text,
                            }
                    })
            }, 1200);

        } catch (error: any) {
            if (error.code === "ECONNABORTED") {
                showNotificationMessage(
                    "سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",
                    "error"
                );
            } else {
                showNotificationMessage("خطا در ثبت نظر", "error");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        const fetchMainUserImage = async () => {
            try {
                const response = await axios.get(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${mainUserId}`,
                    {
                        responseType: "blob",
                        timeout: 10000
                    }
                );
                if (response.status !== 204) {
                    const imageURL = URL.createObjectURL(response.data);
                    setMainUserImage(prev => ({ ...prev, [mainUserId]: imageURL }));
                } if (response.status === 204) {
                    const imageURL = defaultUser;
                    setMainUserImage(prev => ({ ...prev, [mainUserId]: imageURL }));
                }
            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
                }
                else {
                    showNotificationMessage("خطا در دریافت پروفایل کاربر", 'error');
                }
            }
        };

        fetchMainUserImage();
    }, []);

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
            <div className={styles.commentReply}>
                <div className={styles.post}>
                    <div
                        className={styles.userInfo}
                        onClick={() => setIsUserProfileModalOpen(true)}
                    >
                        <div className={styles.postUserIcon}>
                            <img src={mainUserImage[mainUserId] || defaultUser} alt="user icon" />
                        </div>
                        <div className={styles.postUserInfo}>
                            <div className={styles.postUserName}>{fullname}</div>
                            <div className={styles.postUserId}>{username}</div>
                        </div>
                    </div>
                    <div className={styles.postContent}>{text}</div>
                    <div className={styles.arrowIcon}>
                        <img src={Arrow} alt="arrow icon" />
                    </div>
                </div>

                <div className={styles.reply}>
                    <textarea
                        className={styles.replyBox}
                        placeholder="شما درمورد این نظر چه نظری دارید؟"
                        onChange={(e) => {setRefText(e.target.value)}}
                    />
                    <div className={styles.Btns}>
                        <div>
                            <button className={styles.cancleBtn}>انصراف</button>
                        </div>
                        <div>
                            <button
                                className={styles.submitBtn}
                                onClick={handleSendRefText}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className={styles.loadingText}>در حال ارسال ...</span>
                                ) : (
                                    "ثبت"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            {isUserProfileModalOpen && (
                <UserProfileModal
                    onClose={() => setIsUserProfileModalOpen(false)}
                    userid={mainUserId}
                />
            )}
        </div>
    )
}