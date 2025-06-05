import React, {useEffect, useState} from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./BookTalkPerson.module.scss";
import Comment from "./icons/comment.svg";
import defaultUser from "./icons/defaultUser.svg";
import axios from "axios";
import UserProfileModal from "../../components/UserProfileModal/UserProfileModal";
import {useNavigate, useLocation} from "react-router-dom";
import {useNotification, NotificationModal,} from "../../components/NotificationManager/NotificationManager";
import {AnimatePresence} from "framer-motion";

interface RefComments {
    commentid: number,
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
    reportid: number,
    userid: string,
    username: string,
    mbti: string,
    fullname: string,
    imageguid: string,
    imageurl: string,
}

export default function BookTalkPerson () {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage,
    } = useNotification();
    const navigate = useNavigate();
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
    const location = useLocation();
    const commentid = location.state?.commentid || "";
    const mainUserId = location.state?.userid || "";
    const fullname = location.state?.fullname || "";
    const username = location.state?.username || "";
    const text = location.state.text || "";
    const [userId, setUserId] = useState("");
    const [mainUserImage, setMainUserImage] = useState<{ [key: string]: string }>({});
    const [refComments, setRefComments] = useState<RefComments[]>([]);
    const [userImages, setUserImages] = useState<{ [key: string]: string }>({});


    const handleReplyComment = () => {
        navigate("/replyComment", {
            state: {
                mainUserId: mainUserId,
                commentid: commentid,
                fullname: fullname,
                username: username,
                text: text,
            },
        });
    }

    const fetchUserImage = async (userId: string) => {
        if (userImages[userId]) return;

        try {
            const response = await axios.get(
                `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${userId}`,
                { responseType: "blob" }
            );
            if (response.status !== 204) {
                const imageURL = URL.createObjectURL(response.data);
                setUserImages(prev => ({ ...prev, [userId]: imageURL }));
            } if (response.status === 204) {
                const imageURL = defaultUser;
                setUserImages(prev => ({ ...prev, [userId]: imageURL }));
            }
        } catch (error) {
            console.error("خطا در دریافت پروفایل کاربران");
        }
    };

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        const fetchRefComments = async () => {
            try {
                const response = await axios.get<RefComments[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment/ref/${commentid}`,{timeout:10000});

                console.log(response.data);

                setRefComments(response.data);
                response.data.forEach(refComments => {
                    fetchUserImage(refComments.userid);
                });

            } catch (error: any) {
                if (error.code === "ECONNABORTED") {
                    showNotificationMessage(
                        "سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",
                        "error"
                    );
                } if (error.status === 500) {}
                else {
                    showNotificationMessage("خطا در بارگیری نظرات", "error");
                }
            }
        };

        const fetchMainUserImage = async () => {
            try {
                const response = await axios.get(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${mainUserId}`,
                    { responseType: "blob" }
                );
                if (response.status !== 204) {
                    const imageURL = URL.createObjectURL(response.data);
                    setMainUserImage(prev => ({ ...prev, [mainUserId]: imageURL }));
                } if (response.status === 204) {
                    const imageURL = defaultUser;
                    setMainUserImage(prev => ({ ...prev, [mainUserId]: imageURL }));
                }

            } catch (error) {
                console.error("خطا در دریافت پروفایل کاربران");
            }
        };

        fetchMainUserImage();
        fetchRefComments();
    }, []);

    const handleUserInfoModalOpen = (userId : string) => {
        setUserId(userId);
        setIsUserProfileModalOpen(true);
    }

    return (
        <div className={styles.container}>
            <div>
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
            </div>
            <div>
                <div className={styles.header}>BookTalk</div>
                <div className={styles.bookTalk}>
                    <div className={styles.post}>
                        <div className={styles.postInfoOptions}>
                            <div
                                className={styles.UserInfo}
                                onClick={() => handleUserInfoModalOpen(mainUserId)}
                            >
                                <div className={styles.postUserIcon}>
                                    <img src={mainUserImage[mainUserId] || defaultUser} alt="user icon" />
                                </div>
                                <div className={styles.postUserInfo}>
                                    <div className={styles.postUserName}>{fullname}</div>
                                    <div className={styles.postUserId}>{username}</div>
                                </div>
                            </div>

                            <div className={styles.postIcons}>
                                <img
                                    src={Comment}
                                    alt="comment icon"
                                    onClick={handleReplyComment}
                                />
                            </div>
                        </div>
                        <div className={styles.postContent}>{text}</div>
                    </div>
                    <div className={styles.commentText}>نظرات</div>
                    <div className={styles.comments}>
                        {refComments.length === 0 ? (
                            <div className={styles.noRef}>
                                نظری برای این کامنت وجود ندارد
                            </div>
                        ) : (
                            refComments.map((item) => (
                                <div className={styles.comment}>
                                    <div
                                        className={styles.commentInfo}
                                        onClick={() => handleUserInfoModalOpen(item.userid)}
                                    >
                                        <div className={styles.commentUserIcon}>
                                            <img src={userImages[item.userid] || defaultUser} alt="user icon" />
                                        </div>
                                        <div className={styles.commentUserInfo}>
                                            <div className={styles.commentUserName}>{item.fullname}</div>
                                            <div className={styles.commentUserId}>@{item.username}</div>
                                        </div>
                                    </div>
                                    <div className={styles.commentContent}>{item.text}</div>
                                </div>
                            ))
                        )}


                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            {isUserProfileModalOpen && (
                <UserProfileModal
                    onClose={() => setIsUserProfileModalOpen(false)}
                    userid={userId}
                />
            )}
        </div>
    )
}