import React, { useRef, useState, useEffect } from "react";
import styles from "./SideProfile.module.scss";
import pencil from "./icons/Pencil.svg";
import heart from "./icons/Heart.svg";
import history from "./icons/History.svg";
import list from "./icons/list.svg";
import defaultUser from "./icons/defaultUser.svg";
import editPen from "./icons/editPen.svg";
import deleteIcon from "./icons/Trash.svg";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";

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
    const [showLoadingText, setShowLoadingText] = useState(true); // حالت جدید برای نمایش متن‌های بارگذاری
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }

        // تایمر برای مخفی کردن متن‌های بارگذاری بعد از ۲ ثانیه
        const loadingTimer = setTimeout(() => {
            setShowLoadingText(false);
        }, 1000);

        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("توکن یافت نشد");
                setLoading(false);
                setShowLoadingText(false); // اگر خطا داشتیم هم متن‌ها را مخفی کنیم
                return;
            }

            try {
                const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = response.data.user;
                setProfile(user);
                setUserName(user.user_name || "");
                setBio(user.bio || "");
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError("دسترسی غیرمجاز");
                } else {
                    setError("خطا در دریافت اطلاعات کاربر");
                }
            } finally {
                setLoading(false);
                setShowLoadingText(false); // وقتی داده‌ها لود شدند متن‌ها را مخفی کنیم
                clearTimeout(loadingTimer); // تایمر را پاک کنیم چون دیگر نیازی نیست
            }
        };

        const unsubscribe = eventEmitter.subscribe(fetchUserData);

        return () => {
            unsubscribe();
            clearTimeout(loadingTimer); // پاک کردن تایمر هنگام آنمونت
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            alert("فرمت فایل پشتیبانی نمی‌شود. لطفاً از PNG یا JPG استفاده کنید.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("حجم فایل بیشتر از ۲ مگابایت است. لطفاً عکس کوچک‌تری انتخاب کنید.");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
    };

    const handleDeleteImage = () => {
        setProfileImage(null);
        localStorage.removeItem("profileImage");
    };

    return (
      <div className={styles.container}>
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
                  {!profileImage && (
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

                  <a href="/editProfile">
                      <button>
                          <img src={pencil} alt="pencil logo" />
                          <p>ویرایش حساب کاربری</p>
                      </button>
                  </a>
                  <hr className={styles.hr} />
                  <a href="/myFavoriteBook">
                      <button>
                          <img src={heart} alt="heart logo" />
                          <p>مورد علاقه‌ها</p>
                      </button>
                  </a>
                  <hr className={styles.hr} />
                  <a href="/myBookHistory">
                      <button>
                          <img src={history} alt="history logo" />
                          <p>تاریخچه</p>
                      </button>
                  </a>
                  <hr className={styles.hr} />
                  <a>
                      <button>
                          <img src={list} alt="list logo" />
                          <p>لیست کتاب ها</p>
                      </button>
                  </a>
              </div>
          </div>
      </div>
    );
}