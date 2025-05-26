import React, { useEffect } from "react";
import styles from "./MyBookList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import SideProfile from "../../components/SideProfile/SideProfile";
import eventEmitter from "../../utils/eventEmitter";
import Tehran from "./icons/Tehran.svg";
import Koodak from "./icons/Koodak.svg";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import { useState } from "react";
import CreateListModal from "../../components/CreateListModal/CreateListModal";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

interface UserBookList  {
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

const mySavedList = [
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
];

function BookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.listTitle}>{title}</div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

function SavedBookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.listTitle}>{title}</div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

export default function MyBookList() {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userBookList, setUserBookList] = useState<UserBookList[]>([]);

    useEffect(() => {

        const handleShowUserBookList = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                console.error("دسترسی غیرمجاز");
                return;
            }

            try {
                const response = await axios.get<UserBookList[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/user`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setUserBookList(response.data);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }
        };

        handleShowUserBookList();
    }, []);

    useEffect(() => {
        eventEmitter.emit();

        if (isModalOpen) {
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
    }, [isModalOpen]);

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
            <div className={styles.listSide}>
                <SideProfile />
                <div className={styles.bookList}>
                    <div className={styles.myListHeader}>لیست‌های من</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.myListDrawer}>
                            {userBookList.length === 0 ? (
                                <div className={styles.noList}>هنوز لیستی توسط این کاربر ساخته نشده است</div>
                            ) : (
                                userBookList.map((item, index) => (
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

                    <div className={styles.mySavedListHeader}>لیست‌های ذخیره‌شده</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.myListDrawer}>
                            {mySavedList.map((list, index) => (
                                <SavedBookListCard
                                    key={`saved-list-${index}`}
                                    title={list.title}
                                    includes={list.includes}
                                    image={list.image}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.createListContainer}>
                        <button
                            className={styles.createListBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <div className={styles.btnContent}>
                                ساخت لیست
                                <Plus className={styles.plusIcon} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            {isModalOpen && (
                <CreateListModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
