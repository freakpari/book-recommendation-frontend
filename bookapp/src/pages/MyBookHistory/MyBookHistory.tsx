import React, {useEffect, useState} from 'react';
import styles from './MyBookHistory.module.scss';
import Footer from '../../components/Footer/Footer';
import SideProfile from "../../components/SideProfile/SideProfile";
import SearchNav from "../../components/SearchNav/SearchNav";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";
import {NotificationModal, useNotification} from "../../components/NotificationManager/NotificationManager";
import {AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";
import defaultBook from "./icons/defaultCollection.svg";

interface AllList  {
    title: string,
    username: string,
    fullname: string,
    discription: string,
    collectionid: number,
    accessibilityGroupID: number,
}

export default function MyBookHistory() {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [allLists, setAllLists] = useState<AllList[]>([]);
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
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log("توکن یافت نشد.");
            return;
        }
        const fetchAllCollections = async () => {
            try {
                const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setAllLists(response.data);
            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }
        };

        fetchAllCollections();
        eventEmitter.emit();
    }, []);

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
            <SearchNav />

            <div className={styles.historySide}>
                <SideProfile />
                <div className={styles.MyBookHistory}>
                    <div className={styles.scrollbar}>
                        {allLists.length === 0 ? (
                            <div className={styles.noList}>لیستی برای نمایش وجود نداره</div>
                        ) : (
                            allLists.map((item) => (
                                    <div className={styles.listContent}>
                                        <div className={styles.listPic}>
                                            <img
                                                src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/pic/${item.collectionid}`}
                                                alt={item.title}
                                                onError={(e) => {
                                                    if (e.currentTarget.src !== defaultBook) {
                                                        e.currentTarget.src = defaultBook;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className={styles.listDescription}>
                                            <div className={styles.titleAuthor}>
                                                <div
                                                    className={styles.listTitle}
                                                    onClick={() => handleGoToCollectionDetails(item.collectionid,item.title, item.fullname, item.accessibilityGroupID)}
                                                >
                                                    {item.title}</div>
                                                <div className={styles.listAuthor}>{item.fullname}</div>
                                            </div>
                                            <div
                                                className={styles.listIncludes}
                                                onClick={() => handleGoToCollectionDetails(item.collectionid,item.title, item.fullname, item.accessibilityGroupID)}
                                            >
                                                {item.discription}</div>
                                        </div>
                                    </div>
                                ))

                        )}

                    </div>

                </div>

            </div>


            <div>
                <Footer />
            </div>

        </div>
    )
}