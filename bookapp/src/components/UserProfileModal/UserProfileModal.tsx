import React, {useEffect, useState} from "react";
import styles from "./UserProfileModal.module.scss";
import Tehran from "../../pages/MyBookList/icons/Tehran.svg";
import {ReactComponent as Send} from "./icons/Send.svg";
import { ReactComponent as PlusCircle } from  "./icons/PlusCircle.svg";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";
import defaultUser from "../SideProfile/icons/defaultUser.svg";
import { useNotification, NotificationModal } from "../NotificationManager/NotificationManager";

interface Props {
    onClose: () => void;
    userid: string;
}

interface UserInformation  {
    CollectionID: number,
    IsPublic: boolean,
    Title: string,
    CreateDate: string,
    Discription: string,
    ReportID: null,
    GenreID1: number,
    GenreTitle1: null,
    GenreID2: number,
    GenreTitle2: null,
    GenreID3: number,
    GenreTitle3: null,
    AccessibilityGroupID: null,
    AccessGroupTitle: null,
    AccessGroupDiscription: null,
    NumberOfDetail: number,
    UserID: number,
    UserName: string,
    FullName: string,
}

function BookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.titlePlusIcon}>
                <div className={styles.listTitle}>
                    {title}
                </div>
                    <div className={styles.tooltipContainer}>
                        <PlusCircle className={styles.plusCircleIcon} />
                        <span className={styles.tooltipText}>اضافه کردن به لیست</span>
                    </div>
                </div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

export default function UserProfileModal ({ onClose , userid}: Props) {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [userInfo, setUserInfo] = useState<UserInformation[]>([]);
    const [userFullName, setUserFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {

        const handleUserProfilePicture = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                console.error("دسترسی غیرمجاز");
                return;
            }
            const useri = "10115";
            try {
                const response = await axios.get(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${useri}`,
                    {
                        responseType: "blob"
                    }
            )
                const imageBlob = response.data;
                const imageURL = URL.createObjectURL(imageBlob);

                setProfileImage(imageURL);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }

        };


        const handleUserInfo = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                console.error("دسترسی غیرمجاز");
                return;
            }

            const useri = "10115";
            try {
                const response = await axios.get<UserInformation[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/anotherUser/${useri}`)
                setUserInfo(response.data);
                if(response.data.length > 0) {
                    setUserFullName(response.data[0]?.FullName);
                    setUserName(response.data[0]?.UserName);
                }
            }
            catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }
        };

        handleUserInfo();
        handleUserProfilePicture();
    }, []);

    return (
        <div>
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>
            <div
                className={styles.overlay}
                onClick={onClose}
            >
            </div>

            <div className={styles.modalOverlay}>
                <div className={styles.halfBorderCircle}>
                    <div className={styles.circle}>
                        <div className={styles.hideMainBorder}></div>
                        <img src={profileImage || defaultUser} alt="" />
                    </div>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.profile}>
                        <div className={styles.userInfo}>
                            <div className={styles.userId}>@{userName}</div>
                            <div className={styles.userNameType}>
                                <div className={styles.userName}>
                                    {userFullName}
                                </div>
                                <div>ENFP</div>
                            </div>
                            <div className={styles.userBio}>مری جون هستم کسی که منریدنیستردنتسیذرنتلذسبنتلرذ</div>
                        </div>
                        <div className={styles.sendMessageBtn}>
                            <p>ارسال پیام</p>
                            <Send className={styles.sendIcon} />
                        </div>
                    </div>
                    <div className={styles.listHeader}>لیست‌های ساخته شده</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.userListDrawer}>
                            {userInfo.length === 0 ? (
                                <div className={styles.noList}>هیچ لیستی توسط این کاربر ساخته نشده است</div>
                            ) : (
                                userInfo.map((item, index) => (
                                    <BookListCard
                                        key={`user-list-${index}`}
                                        title={item.Title}
                                        includes={item.Discription || 'بدون توضیح'}
                                        image={Tehran}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}
