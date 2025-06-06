import React, { useEffect, useState } from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import styles from "./BookTalkMain.module.scss";
import UserProfileModal from "../../components/UserProfileModal/UserProfileModal";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import {useNotification, NotificationModal,} from "../../components/NotificationManager/NotificationManager";
import defaultUser from "./icons/defaultUser.svg";
import {useNavigate} from "react-router-dom";
import arrow from "./icons/arrow.svg";

interface Comments {
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

export default function BookTalkMain() {
  const [comments, setComments] = useState<Comments[]>([]);
  const [userid, setUserid] = useState("");
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const {
    showNotification,
    notificationMessage,
    notificationType,
    setShowNotification,
    showNotificationMessage,
  } = useNotification();
  const bookid = localStorage.getItem("bookid");
  const bookName = localStorage.getItem("bookName");
  const [userImages, setUserImages] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const fetchUserImage = async (userId: string) => {
    if (userImages[userId]) return;

    try {
      const response = await axios.get(
          `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${userId}`,
          { responseType: "blob",
            timeout: 10000
          }
      );
      if (response.status !== 204) {
        const imageURL = URL.createObjectURL(response.data);
        setUserImages(prev => ({ ...prev, [userId]: imageURL }));
      } if (response.status === 204) {
        const imageURL = defaultUser;
        setUserImages(prev => ({ ...prev, [userId]: imageURL }));
      }
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
      }
      else {
        showNotificationMessage("خطا در دریافت پروفایل کاربر", "error");
      }    }
  };

  const handleGoToPersonComment = (commentid : number, userid : string, fullname : string, username : string, text : string) => {
    navigate("/booktalkperson" , {
      state: {
        bookid: bookid,
        commentid: commentid,
        userid: userid,
        fullname: fullname,
        username: "@" + username,
        text: text,
        bookName: bookName,
      }
    });
  }

  const handleBack = () => {
    navigate("/bookdetail/" + bookid);
  }

  useEffect(() => {
    const handleComments = async () => {
      try {
        const response = await axios.get<Comments[]>(
          `https://intelligent-shockley-8ynjnlm8e.liara.run/api/comment/book/${bookid}`,
            {timeout: 10000}
        );
        setComments(response.data);

        response.data.forEach(comment => {
          fetchUserImage(comment.userid);
        });

      } catch (error: any) {
        if (error.code === "ECONNABORTED") {
          showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", "error");
        } else {
          showNotificationMessage("خطا در بارگیری کامنت‌ها", "error");
        }
      }
    };

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

  const handleUserInfoModalOpen = (userId : string) => {
    setUserid(userId);
    setIsUserProfileModalOpen(true);
  }

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
        <div className={styles.header}>BookTalk <span style={{ fontFamily: "shabnam" }}>برای </span><span className={styles.bookName}>{bookName}</span></div>
        <div className={styles.bookTalk}>
          <div
              className={styles.backIcon}
              onClick={handleBack}
          >
            <img src={arrow} alt="برگشت"/>
          </div>
          <div className={styles.scrollBar}>
            <div className={styles.scrollBarContent}>
              {comments.length === 0 ? (
                <div className={styles.noList}>
                  کامنتی برای این کتاب وجود ندارد
                </div>
              ) : (
                comments.map((item) => (
                    <div className={styles.minComment}>
                      <div
                          className={styles.minCommentInfo}
                          onClick={() => handleUserInfoModalOpen(item.userid)}
                      >
                        <div>
                          <img
                              src={userImages[item.userid] || defaultUser}
                              alt="user icon"
                          />
                        </div>
                        <div className={styles.minUserInfo}>
                          <div className={styles.minUserName}>{item.fullname}</div>
                          <div className={styles.minUserId}>@{item.username}</div>
                        </div>
                      </div>
                      <div
                          className={styles.minCommentContent}
                          onClick={() => handleGoToPersonComment(item.commentid, item.userid, item.fullname, item.username, item.text)}
                      >
                        <div>{item.text}</div>
                      </div>
                    </div>
                ))
              )}
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
          userid={userid}
        />
      )}
    </div>
  );
}
