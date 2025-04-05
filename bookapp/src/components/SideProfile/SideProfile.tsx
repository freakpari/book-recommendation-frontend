import React, { useRef, useState } from "react";
import styles from "./SideProfile.module.scss";
import pencil from "./icons/Pencil.svg";
import heart from "./icons/Heart.svg";
import history from "./icons/History.svg";
import list from "./icons/list.svg";
import defaultUser from "./icons/defaultUser.svg";
import editPen from "./icons/editPen.svg";

export default function SideProfile() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            alert("فرمت فایل پشتیبانی نمی‌شود. لطفاً از PNG یا JPG استفاده کنید.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB
            alert("حجم فایل بیشتر از ۲ مگابایت است. لطفاً عکس کوچک‌تری انتخاب کنید.");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
    };


    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <button onClick={() => fileInputRef.current?.click()}>
                    <img src={editPen} alt="edit profile"/>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    // accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                <img
                    src={profileImage || defaultUser}
                    alt="user image"
                    className={styles.profileImage}
                />

                <h2>علی محمدی</h2>
                <h6>یه عاشق کتاب که مهندسه</h6>
            </div>

            <div className={styles.options}>
                <a href="http://localhost:3000/editProfile">
                    <button>
                        <img src={pencil} alt="pencil logo" />
                        <p>ویرایش حساب کاربری</p>
                    </button>
                </a>
                <hr className={styles.hr} />
                <a href="http://localhost:3000/myFavoriteBook">
                    <button>
                        <img src={heart} alt="heart logo" />
                        <p>مورد علاقه‌ها</p>
                    </button>
                </a>
                <hr className={styles.hr} />
                <a href="http://localhost:3000/myBookHistory">
                    <button>
                        <img src={history} alt="history logo" />
                        <p>تاریخچه</p>
                    </button>
                </a>
                <hr className={styles.hr} />

                <button>
                    <img src={list} alt="list logo" />
                    <p>لیست کتاب ها</p>
                </button>
            </div>
        </div>
    );
}
