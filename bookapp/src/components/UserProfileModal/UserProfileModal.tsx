import React, {useEffect, useState} from "react";
import styles from "./UserProfileModal.module.scss";
import {ReactComponent as Send} from "./icons/Send.svg";
import { ReactComponent as PlusCircle } from  "./icons/PlusCircle.svg";
import axios from "axios";
import {AnimatePresence} from "framer-motion";
import defaultUser from "./icons/defaultUser.svg";
import { useNotification, NotificationModal } from "../NotificationManager/NotificationManager";
import {Link, useNavigate} from "react-router-dom";
import defaultBook from "./icons/defaultCollection.svg";

interface Props {
    onClose: () => void;
    userid: string;
}

interface UserCollection  {
    IsOwner: number,
    UserId: number,
    CollectionID: number,
    IsPublic: boolean,
    Title: string,
    CreateDate: string,
    Discription: string,
    ReportID: null,
    GenreID1: number,
    GenreTitle1: string,
    GenreID2: number,
    GenreTitle2: string,
    GenreID3: number,
    GenreTitle3: string,
    AccessibilityGroupID: number,
    AccessGroupTitle: string,
    AccessGroupDiscription: string,
    NumberOfDetail: number,
    UserID_1: number,
    UserName: string,
    FullName: string,
}

interface UserInformation {
    id: number,
    first_name: string,
    last_name: string,
    user_name: string,
    bio: string,
    mbti: string,
}

export default function UserProfileModal ({ onClose , userid}: Props) {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [userCollection, setUserCollection] = useState<UserCollection[]>([]);
    const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
    const [userFullName, setUserFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');
    const [userMBTI, setUserMBTI] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoToCollectionDetails = (collectionid:number,collectionName:string, FullName: string, access: number) => {
        navigate("/bookInListUser", {
            state: {
                collectionid: collectionid,
                collectionName: collectionName,
                FullName: FullName,
                access: access,
            }
        });
    };

    const handleAddList = async (access:number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            showNotificationMessage("دسترسی غیر مجاز",'error')
            return;
        }

        try {
            await axios.put(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/save",
                {
                    accessibilitygroup: access
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    timeout: 10000
                }
            );

            showNotificationMessage("لیست با موفقیت اضافه شد",'success')
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            }
            else {
                console.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
            }
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.error("دسترسی غیرمجاز");
            return;
        }
        localStorage.setItem("token",token);
        localStorage.setItem("receiverId", userid);
        const fetchUserProfilePicture = async () => {

            try {
                const response = await axios.get(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${userid}`,
                    {
                        responseType: "blob"
                    }
            )
                if (response.status !== 204) {
                    const imageURL = URL.createObjectURL(response.data);
                    setProfileImage(imageURL);
                } if (response.status === 204) {
                    const imageURL = defaultUser;
                    setProfileImage(imageURL);
                }

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    console.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }

        };

        const fetchUserCollection = async () => {

            try {
                const response = await axios.get<UserCollection[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/anotherUser/${userid}`,{timeout: 10000})
                setUserCollection(response.data);
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

        const fetchUserInfo = async () => {

            try {
                const response = await axios.get<{ message: string, user: UserInformation }>(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile-another-user/?userid=${userid}`,
                    {timeout: 10000}
                );

                const user = response.data.user;
                setUserInfo(user);
                if(user.first_name) {
                    if(user.last_name){
                        setUserFullName(user.first_name + " " + user.last_name);
                    }
                    else {
                        setUserFullName(user.first_name);
                    }
                }
                setUserName("@" + user.user_name);
                setUserBio(user.bio || '');
                setUserMBTI(user.mbti || '');
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

        fetchUserInfo();
        fetchUserProfilePicture();
        fetchUserCollection();
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
                            <div className={styles.userId}>{userName}</div>
                            <div className={styles.userNameType}>
                                <div className={styles.userName}>
                                    {userFullName}
                                </div>
                                <div>{userMBTI ? (<p>{userMBTI}</p>) : (<p></p>)}</div>
                            </div>
                            <div className={styles.userBio}>{userBio}</div>
                        </div>
                        <Link
                            className={styles.sendMessageBtn}
                            to={"/chat"}
                        >
                            <p>ارسال پیام</p>
                            <Send className={styles.sendIcon} />
                        </Link>
                    </div>
                    <div className={styles.listHeader}>لیست‌های ساخته شده</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.userListDrawer}>
                            {userCollection.length === 0 ? (
                                <div className={styles.noList}>هیچ لیستی توسط این کاربر ساخته نشده است</div>
                            ) : (
                                userCollection.map((item) => (
                                    <div className={styles.listContent}>
                                        <div className={styles.listPic}>
                                            <img
                                                src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/pic/${item.CollectionID}`}
                                                alt={item.Title}
                                                onError={(e) => {
                                                    if (e.currentTarget.src !== defaultBook) {
                                                        e.currentTarget.src = defaultBook;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div
                                            className={styles.listDescription}
                                        >
                                            <div className={styles.titlePlusIcon}>
                                                <div
                                                    className={styles.listTitle}
                                                    onClick={() => handleGoToCollectionDetails(item.CollectionID,item.Title, item.FullName, item.AccessibilityGroupID)}
                                                >
                                                    {item.Title}
                                                </div>
                                                <div
                                                    className={styles.tooltipContainer}
                                                    onClick={() => handleAddList(item.AccessibilityGroupID)}
                                                >
                                                    <PlusCircle className={styles.plusCircleIcon} />
                                                    <span className={styles.tooltipText}>اضافه کردن به لیست</span>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.listIncludes}
                                                onClick={() => handleGoToCollectionDetails(item.CollectionID,item.Title, item.FullName, item.AccessibilityGroupID)}
                                            >
                                                {item.Discription}
                                            </div>
                                        </div>
                                    </div>

                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}
