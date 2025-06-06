import styles from './Bookdetail.module.scss';
import { useEffect, useState } from "react";
import SearchNav from '../../components/SearchNav/SearchNav';
import Footer from '../../components/Footer/Footer';
import heart from "./icons/Heart.svg";
import filledHeart from "./icons/filled.png";
import comment from "./icons/Comment.svg";
import profile from "./icons/profile.svg";
import { ReactComponent as CircleAdd } from "./icons/CircleAdd.svg";
import { useParams } from 'react-router-dom';
import StepRating from "./rating";
import UserProfileModal from "../../components/UserProfileModal/UserProfileModal";
import AddBookToListModal from "../../components/AddBookToListModal/AddBookToListModal";
import axios from 'axios';
import not from "../PopularBook/icon/not.png";
import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import eventEmitter from "../../utils/eventEmitter";
import user from "../../components/SearchNav/icons/defaultUser.svg";

interface BookData {
    BookID: number;
    Title: string;
    AuthorName: string;
    PublisherName: string;
    GenreName1: string | null;
    GenreName2: string | null;
    GenreName3: string | null;
    GenreExtra: string | null;
    Description: string;
    PublishedYear: number;
    LanguageName: string;
    PageCount: number;
    ISBN: string;
    rating: number;
    ImageUrl?: string;
}
interface Comment {
    commentid: number;
    bookid: number;
    text: string;
    createdat: string;
    userid: string;
    username: string;
    fullname: string;
    imageurl: string;
}

interface NotificationModalProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            className={`${styles.notificationModal} ${type === 'success' ? styles.success : styles.error}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.notificationContent}>
                {message}
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
        </motion.div>
    );
};

export default function Bookdetail() {
    const { BookID } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
    const [isAddBookToListModalOpen, setIsAddBookToListModalOpen] = useState(false);
    const [bookData, setBookData] = useState<BookData | null>(null);
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
    const [isLikeStatusLoading, setIsLikeStatusLoading] = useState(true);
    const [userid, setUserid] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [userData, setUserData] = useState<any>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [hasToken, setHasToken] = useState<boolean>(false);



    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserid = localStorage.getItem("userid");
        if (storedUserid) {
            setUserid(storedUserid);
            fetchUserData(storedUserid, token);
        }
    }, []);

    const fetchUserData = async (userId: string, token: string | null) => {
        try {
            const response = await axios.get(
                `https://intelligent-shockley-8ynjnlm8e.liara.run/api/user/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setUserData(response.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (BookID) {
            const savedLikeStatus = localStorage.getItem(`book_${BookID}_liked`);
            if (savedLikeStatus) {
                setIsLiked(savedLikeStatus === 'true');
            }
        }
    }, [BookID]);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/bookdetail",
                    {
                        params: { bookid: BookID }
                    }
                );

                if (response.data.book) {
                    setBookData(response.data.book);
                } else {
                    setError("کتاب یافت نشد");
                }
            } catch (err) {
                setError("خطا در دریافت اطلاعات کتاب");
                console.error("Error fetching book data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (BookID) {
            fetchBookData();
        }
    }, [BookID]);

    useEffect(() => {
        const fetchInitialLikeStatus = async () => {
            const token = localStorage.getItem("token");
            const userid = localStorage.getItem("userid");

            if (!BookID) return;

            const savedLikeStatus = localStorage.getItem(`book_${BookID}_liked`);
            if (savedLikeStatus) {
                setIsLiked(savedLikeStatus === 'true');
                setIsLikeStatusLoading(false);
                return;
            }

            if (token && userid) {
                try {
                    setIsLikeStatusLoading(true);
                    const response = await axios.get(
                        "https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/likestatus",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            params: { bookid: BookID, userid: userid }
                        }
                    );
                    setIsLiked(response.data.status);
                    localStorage.setItem(`book_${BookID}_liked`, response.data.status.toString());
                } catch (error) {
                    console.error("Error fetching like status:", error);
                    setIsLiked(false);
                } finally {
                    setIsLikeStatusLoading(false);
                }
            } else {
                setIsLikeStatusLoading(false);
            }
        };

        fetchInitialLikeStatus();
    }, [BookID]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setHasToken(true);

        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get(
                    "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePicToken",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        responseType: "blob",
                    }
                );
                const imageURL = URL.createObjectURL(response.data);
                setProfileImage(imageURL);
            } catch (error) {
                console.error("خطا در دریافت تصویر پروفایل");
            }
        };

        fetchUserProfile();
        const unsubscribe = eventEmitter.subscribe(fetchUserProfile);
        return () => unsubscribe();
    }, []);


    const showNotificationMessage = (message: string, type: 'success' | 'error') => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const currentUserid = localStorage.getItem("userid");
            if (currentUserid !== userid) {
                setUserid(currentUserid || "");
                const savedLikeStatus = localStorage.getItem(`book_${BookID}_liked`);
                if (savedLikeStatus) {
                    setIsLiked(savedLikeStatus === 'true');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [BookID, userid]);

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
    };

    const handleHeartClick = async () => {
        if (isLikeStatusLoading || !BookID) return;

        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");

        if (!token) {
            showNotificationMessage("برای لایک کردن باید وارد شوید.", "error");
            return;
        }

        try {
            setIsLikeStatusLoading(true);

            if (isLiked) {
                await axios.delete(
                    "https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/dislike",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        data: { bookid: BookID, userid: userid },
                    }
                );
                setIsLiked(false);
                localStorage.setItem(`book_${BookID}_liked`, 'false');
                showNotificationMessage("کتاب از لیست موردعلاقه ها حذف شد", "error");
            } else {
                await axios.post(
                    "https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/like",
                    {
                        bookid: BookID,
                        userid: userid,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setIsLiked(true);
                localStorage.setItem(`book_${BookID}_liked`, 'true');
                showNotificationMessage("کتاب به لیست موردعلاقه ها اضافه شد", "success");
            }
        } catch (error) {
            console.error("Error in like/dislike:", error);
            showNotificationMessage("خطا در انجام عملیات", "error");
        } finally {
            setIsLikeStatusLoading(false);
        }
    };

    const submit = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            showNotificationMessage("برای ثبت امتیاز لطفاً وارد شوید.", "error");
            return;
        }

        if (!rating) {
            showNotificationMessage("لطفاً امتیاز خود را انتخاب کنید.", 'error');
            return;
        }

        if (!commentText.trim()) {
            showNotificationMessage("لطفاً نظر خود را وارد کنید.", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            // ارسال امتیاز
            const ratingResponse = await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/rate",
                {
                    bookid: BookID,
                    rate: rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // ارسال کامنت
            const commentResponse = await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment",
                {
                    bookid: BookID,
                    text: commentText
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // // افزودن کامنت جدید به لیست کامنت‌ها
            // if (commentResponse.data.comment && userData) {
            //     const newComment: Comment = {
            //         userid: userid,
            //         fullname: userData.fullname,
            //         username: userData.username,
            //         text: commentText,
            //         createdat: new Date().toISOString()
            //     };

            //     setComments(prevComments => [newComment, ...prevComments]);
            // }

            showNotificationMessage("امتیاز و نظر شما با موفقیت ثبت شد", "success");
            setIsModalOpen(false);
            setCommentText("");
            setRating(0);
        } catch (error: any) {
            console.error("Error details:", error);
            showNotificationMessage(
                error.response?.data?.message || "مشکلی در سرور رخ داده است",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get<Comment[]>(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment/book/${BookID}`
                );
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                showNotificationMessage("خطا در دریافت کامنت‌ها", "error");
            }
        };


        if (BookID) {
            fetchComments();
        }
    }, [BookID]);

    useEffect(() => {
        if (isUserProfileModalOpen || isModalOpen || isAddBookToListModalOpen) {
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
    }, [isUserProfileModalOpen, isModalOpen, isAddBookToListModalOpen]);

    useEffect(() => {
        if (BookID) {
            localStorage.setItem("bookid", BookID);
        }
    }, [BookID]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loading}>در حال بارگذاری...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    if (!bookData) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.error}>کتاب یافت نشد</div>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>

            <SearchNav />
            <div className={styles.container}>
                <div className={styles.rightSection}>
                    <div className={styles.icons}>
                        <img
                            src={isLikeStatusLoading ? heart : (isLiked ? filledHeart : heart)}
                            onClick={handleHeartClick}
                            className={`${styles.heartIcon} ${isLiked ? styles.liked : ''}`}
                            alt={isLiked ? "Remove from favorites" : "Add to favorites"}
                            style={{ opacity: isLikeStatusLoading ? 0.5 : 1 }}
                        />
                        <img
                            onClick={() => setIsModalOpen(true)}
                            src={comment}
                            className={styles.commentIcon}
                            alt="Add comment"
                        />
                        <CircleAdd
                            className={styles.circleAdd}
                            onClick={() => setIsAddBookToListModalOpen(true)}
                            aria-label="Add to list"
                        />
                    </div>
                    <img
                        src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${bookData.BookID}`}
                        alt={`Cover of ${bookData.Title}`}
                        className={styles.bookCover}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = not;
                        }}
                    />
                    <div className={styles.text}>
                        <h2>{bookData.Title}</h2>
                        <p className={styles.author}>{bookData.AuthorName}</p>
                        <div className={styles.tags}>
                            {bookData.GenreName1 && <button>{bookData.GenreName1}</button>}
                            {bookData.GenreName2 && <button>{bookData.GenreName2}</button>}
                            {bookData.GenreName3 && <button>{bookData.GenreName3}</button>}
                            {bookData.GenreExtra && <button>{bookData.GenreExtra}</button>}
                        </div>
                    </div>
                </div>

                <div className={styles.reviews}>
                    {comments.length === 0 ? (
                        <div className={styles.noComments}>
                            کامنتی برای این کتاب وجود ندارد
                        </div>
                    ) : (
                        comments.map((item,index) => (
                            <div key={item.commentid} className={styles.reviewCard}>
                                <div
                                    className={styles.profile}
                                    onClick={() => {
                                        setUserid(item.userid);
                                        setIsUserProfileModalOpen(true);
                                    }}
                                >
                                    <div>
                                        <img  className={styles.userIcon} src={profileImage || user} alt="user icon" />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div className={styles.userName}>{item.fullname}</div>
                                        <div className={styles.userId}>@{item.username}</div>
                                    </div>
                                </div>
                                <div className={styles.commentContent}>
                                    <div>{item.text}</div>
                                </div>
                                {index === comments.length - 1 && (
                                    <button
                                        className={styles.backButton}
                                        onClick={() => (window.location.href = "/bookTalkMain")}
                                    >
                                        رفتن به BookTalk
                                    </button>
                                )}
                            </div>

                        ))

                    )}
                </div>
                <div className={styles.bookInfo}>
                    <h3>تعداد صفحات <span>{bookData.PageCount}</span></h3>
                    <h3>سال انتشار <span>{bookData.PublishedYear}</span></h3>
                    <h3>امتیاز <span>{bookData.rating}</span></h3>
                    <p>{bookData.Description || "توضیحاتی برای این کتاب موجود نیست."}</p>
                </div>
            </div>

            {isUserProfileModalOpen && (
                <UserProfileModal
                    onClose={() => setIsUserProfileModalOpen(false)}
                    userid={userid}
                />
            )}

            {isAddBookToListModalOpen && (
                <AddBookToListModal
                    onClose={() => setIsAddBookToListModalOpen(false)}
                    userid={userid}
                />
            )}

            {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(0.6rem)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style={{
                        position: "fixed",
                        backdropFilter: "blur(1.2rem)",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        padding: "2rem",
                        borderRadius: "0.6rem",
                        width: "1125px",
                        border: "0.3rem solid #303857",
                        height: "534px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem"
                    }}>
                        <h3 style={{ textAlign: "center", color: "#303857", fontSize: "24px" }}>ثبت تجربه خواندن کتاب</h3>
                        <p style={{ textAlign: "center", color: "#303857", fontSize: "20px" }}>با تکمیل این فرم، تجربه و نظرتان را درباره کتابی که خوانده‌اید با ما به اشتراک بگذارید.</p>

                        <label style={{ color: "#303857", marginRight: "494px", marginTop: "60px" }}>لطفا تجربه و نظرتان را در مورد کتاب بیان کنید...</label>
                        <TextField
                            className={styles.inputComment}
                            value={commentText}
                            onChange={handleCommentChange}
                            multiline
                            rows={4}
                        />

                        <div style={{ display: "flex", gap: "44px", flexDirection: "column", marginTop: "-225px", marginRight: "100px" }}>
                            <span style={{ color: "#303857" }}>لطفا امتیاز خود را انتخاب کنید</span>
                            <StepRating rating={rating} onRate={setRating} />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "20px", marginRight: "90px" }}>
                            <span style={{ color: "#303857" }}>آیا این کتاب را به دوستانتان توصیه می‌کنید؟</span>
                            <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
                                <button style={{
                                    backgroundColor: "rgba(48, 56, 87, 0.35)", width: "105px",
                                    height: "41px", color: "#303857", border: "1px solid #303857", borderRadius: "10px"
                                }}>بله</button>
                                <button style={{
                                    backgroundColor: "rgba(48, 56, 87, 0.35)", width: "105px",
                                    height: "41px", color: "#303857", border: "1px solid #303857", borderRadius: "10px"
                                }}>خیر</button>
                            </div>
                        </div>

                        <div
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                            style={{ display: "flex", marginTop: "10px", gap: "15px", marginRight: "390px" }}>
                            <button onClick={() => setIsModalOpen(false)} style={{
                                backgroundColor: "#f9f9f9",
                                width: "137px",
                                height: "56px",
                                padding: "0.5rem 1rem",
                                borderRadius: "10px",
                                fontSize: "16px",
                                border: "2px solid #303857"
                            }}>بعدا</button>
                            <button onClick={submit}
                                    disabled={isSubmitting}
                                    style={{
                                        backgroundColor: "#303857",
                                        width: "137px",
                                        height: "56px",
                                        color: "white",
                                        fontSize: "16px",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "10px",
                                        border: "none"
                                    }}>
                                {isSubmitting ? "در حال ثبت..." : "ثبت"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}