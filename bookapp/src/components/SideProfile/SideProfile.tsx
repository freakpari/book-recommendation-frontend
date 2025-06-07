import React, { useRef, useState, useEffect } from "react";
import styles from "./SideProfile.module.scss";
import pencil from "./icons/Pencil.svg";
import heart from "./icons/Heart.svg";
import list from "./icons/list.svg";
import defaultUser from "./icons/defaultUser.svg";
import editPen from "./icons/editPen.svg";
import deleteIcon from "./icons/Trash.svg";
import savedList from "./icons/savedListIcon.svg";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";
import {Link} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import { useNotification, NotificationModal } from "../NotificationManager/NotificationManager";

interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    bio: string;
    gender: string;
    birthday: string;
    phone_number: string;
    email: string;
}

export default function SideProfile() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoadingText, setShowLoadingText] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();

    useEffect(() => {

        const loadingTimer = setTimeout(() => {
            setShowLoadingText(false);
        }, 1000);

        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                showNotificationMessage("دسترسی غیرمجاز",'error');
                setLoading(false);
                setShowLoadingText(false);
                return;
            }

            try {
                const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 10000
                });

                const user = response.data.user;
                setProfile(user);
                setUserName(user.user_name || "");
                setBio(user.bio || "");

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
                }
                else {
                    showNotificationMessage("خطا در دریافت اطلاعات کاربر", 'error');
                }
            } finally {
                setLoading(false);
                setShowLoadingText(false);
                clearTimeout(loadingTimer);
            }
        };

        fetchUserProfile();

        const unsubscribe = eventEmitter.subscribe(fetchUserData);

        return () => {
            unsubscribe();
            clearTimeout(loadingTimer);
        };
    }, []);

    const fetchUserProfile = async () => {
        if (profileImage) {return}

        const token = localStorage.getItem("token");
        if (!token) {
            showNotificationMessage("دسترسی غیرمجاز",'error');
            return;
        }
        try {
            const response = await axios.get(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePicToken", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                    timeout: 10000
                });

            if (response.status !== 204) {
                const imageURL = URL.createObjectURL(response.data);
                setProfileImage(imageURL);
            } if (response.status === 204) {
                setProfileImage(null);

            }


        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
            } else {
                showNotificationMessage("خطا در دریافت پروفایل کاربر", 'error');
            }
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem("token");
        if (!token) {
            showNotificationMessage("دسترسی غیرمجاز",'error');
            return;
        }

        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            showNotificationMessage("لطفاً از PNG یا JPG استفاده کنید.",'error');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            showNotificationMessage("حجم فایل بیشتر از ۲ مگابایت است.",'error');
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
             await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/profile/pic/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    timeout: 10000
                }
            );

            showNotificationMessage("تصویر با موفقیت آپلود شد", 'success');
            fetchUserProfile();
            eventEmitter.emit();

        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            }
            else {
                showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');

            }
        }
    };

    const handleDeleteImage = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            showNotificationMessage("دسترسی غیرمجاز",'error');
            return;
        }

        try {
            await axios.delete(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePicToken`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    timeout: 10000
                })

            showNotificationMessage("پروفایل با موفقیت حذف شد",'success');
            setProfileImage(null);
            fetchUserProfile();
            eventEmitter.emit();

        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
            }
            else {
                showNotificationMessage("خطا در حذف پروفایل کاربر", 'error');
            }
        }
    };

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

          <div className={styles.profile}>
              <div>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                  />

                  <img
                      src={profileImage || defaultUser}
                      alt=""
                      className={styles.profileImage}
                  />
              </div>
              <div className={styles.editBtns}>
                  {profileImage && (
                      <button onClick={handleDeleteImage} className={styles.deleteBtn}>
                          <img src={deleteIcon} alt="delete profile" />
                      </button>
                  )}
                  {profileImage === null && (
                      <button className={styles.deleteBtnNotVisible}>
                          <img src={deleteIcon} alt="delete profile" />
                      </button>
                  )}
                  <button className={styles.editBtn} onClick={() => fileInputRef.current?.click()}>
                      <img src={editPen} alt="edit profile" />
                  </button>
              </div>
              <div className={styles.userInfo}>
                  {loading ? (
                      showLoadingText ? (
                          <div>
                              <h2 className={styles.userName}>...درحال بارگذاری</h2>
                              <h6 className={styles.bio}>...درحال بارگذاری</h6>
                          </div>
                      ) : <div>
                          <h2 className={styles.userName}></h2>
                          <h6 className={styles.bio}></h6>
                      </div>
                  ) : (
                      <>
                          <h2 className={styles.userName}>{userName}</h2>
                          <h6 className={styles.bio}>{bio}</h6>
                      </>
                  )}
              </div>
              <div className={styles.optionBtns}>

                  <Link to="/editProfile">
                      <button>
                          <img src={pencil} alt="pencil logo" />
                          <p>ویرایش حساب کاربری</p>
                      </button>
                  </Link>
                  <hr className={styles.hr} />
                  <Link to="/myFavoriteBook">
                      <button>
                          <img src={heart} alt="heart logo" />
                          <p>مورد علاقه‌ها</p>
                      </button>
                  </Link>
                  <hr className={styles.hr} />
                  <Link to="/myBookList">
                      <button>
                          <img src={savedList} alt="list logo" />
                          <p>لیست کتاب ها</p>
                      </button>
                  </Link>
                  <hr className={styles.hr} />
                  <Link to="/myBookHistory">
                      <button>
                          <img src={list} alt="history logo" />
                          <p>کالکشن‌های کاربران</p>
                      </button>
                  </Link>
              </div>
          </div>
      </div>
    );
}