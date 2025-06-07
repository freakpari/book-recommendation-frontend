import React, { useEffect } from "react";
import styles from "./MyBookList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import SideProfile from "../../components/SideProfile/SideProfile";
import eventEmitter from "../../utils/eventEmitter";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import { useState } from "react";
import CreateListModal from "../../components/CreateListModal/CreateListModal";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import defaultBook from "./icons/defaultCollection.svg";

interface UserBookList  {
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

function BookListCard({ title, includes, collectionid, collectionName, Discription, ispublic }: { title: string, includes: string, collectionid: number, collectionName: string, Discription:string, ispublic: boolean }) {
    const navigate = useNavigate();

    const handleGoToCollectionDetails = () => {
        navigate("/bookInlist", {
            state: {
                collectionid: collectionid,
                collectionName: collectionName,
                Discription: Discription,
                ispublic: ispublic,
            }
        });
    }

    return (
        <div
            className={styles.listContent}
            onClick={handleGoToCollectionDetails}
        >
            <div className={styles.listPic}>
                <img
                    src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/pic/${collectionid}`}
                    alt={title}
                    onError={(e) => {
                        if (e.currentTarget.src !== defaultBook) {
                            e.currentTarget.src = defaultBook;
                        }
                    }}
                />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.listTitle}>{title}</div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

function SavedBookListCard({ title, includes, collectionid, collectionName, Discription, access, FullName }: { title: string, includes: string, collectionid: number, collectionName: string, Discription:string, access:number, FullName: string }) {
    const navigate = useNavigate();

    const handleGoToCollectionDetails = () => {
        navigate("/savedlist", {
            state: {
                collectionid: collectionid,
                collectionName: collectionName,
                Discription: Discription,
                access: access,
                FullName: FullName,
            }
        });
    }

    return (
        <div
            className={styles.listContent}
            onClick={handleGoToCollectionDetails}
        >
            <div className={styles.listPic}>
                <img
                    src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/pic/${collectionid}`}
                    alt={title}
                    onError={(e) => {
                        if (e.currentTarget.src !== defaultBook) {
                            e.currentTarget.src = defaultBook;
                        }
                    }}
                />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.titleAuthor}>
                    <div className={styles.listTitle}>{title}</div>
                    <div className={styles.listAuthor}>{FullName}</div>
                </div>
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
    const [mySavedList, setMySavedList] = useState<UserBookList[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.error("دسترسی غیرمجاز");
            return;
        }
        const handleShowUserBookList = async () => {

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

        const handleShowSavedLists = async () => {


            try {
                const response = await axios.get<{ message: string; data: UserBookList[] }>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/save`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setMySavedList(response.data.data);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }
        }

        handleShowUserBookList();
        handleShowSavedLists();
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

                                    userBookList.filter(item => item.IsOwner === 1).length === 0 ? (
                                        <div className={styles.noList}>هنوز لیستی توسط این کاربر ساخته نشده است</div>
                                    ) : (
                                        userBookList
                                            .filter(item => item.IsOwner === 1)
                                            .map((item, index) => (
                                                <BookListCard
                                                    key={`user-list-${index}`}
                                                    title={item.Title}
                                                    includes={item.Discription || 'بدون توضیح'}
                                                    collectionid={item.CollectionID}
                                                    collectionName={item.Title}
                                                    Discription={item.Discription}
                                                    ispublic={item.IsPublic}
                                                />
                                            ))
                                    )
                            )}
                        </div>
                    </div>

                    <div className={styles.mySavedListHeader}>لیست‌های ذخیره‌شده</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.myListDrawer}>
                            {mySavedList.length === 0 ? (
                                <div className={styles.noList}>هنوز لیستی توسط این کاربر ذخیره نشده است</div>
                            ) : (
                                mySavedList.map((list, index) => (
                                        <SavedBookListCard
                                            key={`saved-list-${index}`}
                                            title={list.Title}
                                            includes={list.Discription}
                                            collectionid={list.CollectionID}
                                            collectionName={list.Title}
                                            Discription={list.Discription}
                                            access={list.AccessibilityGroupID}
                                            FullName={list.FullName}
                                        />
                                ))
                            )}
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
