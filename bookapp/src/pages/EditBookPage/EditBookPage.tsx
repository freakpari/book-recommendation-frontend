import React, {useEffect, useState} from 'react';
import styles from "./EditBookPage.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import { AnimatePresence } from "framer-motion";
import {useLocation} from "react-router-dom";
import NoBookInList from "./icons/emptyList.svg";
import DeleteIcon from "./icons/deleteIcon.svg"
import Tehran from "./icons/Tehran.svg";
import DeleteListModal from "../../components/DeleteListModal/DeleteListModal";

interface BooksInMyListDetails {
    CollectionID: number,
    BookID: number,
    Title: string,
    PublisherID: number,
    GenreID1: number,
    GenreID2: number,
    GenreID3: number,
    GenreExtra: number,
    Description: string,
    PublishedYear: number,
    LanguageID: number,
    PageCount: number,
    ISBN: string,
    CreatedAt: string,
    UpdatedAt: string,
    AuthorID: number,
    FullAuthorName: string,
    ImageGuid: string,
    IsPrimary: boolean,
    ImageUrl: string,
}

export default function EditBookPage() {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const location = useLocation();
    const collectionid = location.state?.collectionid || "";
    const collectionName = location.state?.collectionName || "";
    const Discription = location.state?.Discription || "";
    const [booksInMyList, setBooksInMyList] = useState<BooksInMyListDetails[]>([]);
    const [isDeleteCollection, setIsDeleteCollection] = useState(false);

    const handleDeleteBookFromList = async (bookid: number) => {
        try {
            await axios.delete(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/delete-collection-details?collectionid=${collectionid}&bookid=${bookid}`)
            showNotificationMessage("کتاب با موفقیت از لیست حذف شد",'success');
            eventEmitter.emit();
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            } if (error.status === 404) {
            }
            else {
                showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {return;}

        console.log(collectionid);

        const fetchBookInListDetails = async () => {
            try {
                const response = await axios.get<BooksInMyListDetails[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/details?collectionid=${collectionid}`)
                setBooksInMyList(response.data);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                } if (error.status === 404) {
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }
        }
        eventEmitter.emit();
        fetchBookInListDetails();
        const unsubscribe = eventEmitter.subscribe(fetchBookInListDetails);
        return () => unsubscribe();
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

            <div className={styles.bookListSide}>
                <SideProfile />

                <div className={styles.bookInMyList}>
                    <div className={styles.showBookContainer}>
                        <div className={styles.listDetails}>
                            <div className={styles.listInfoPic}>
                                <div className={styles.listPic}>
                                    <img src={Tehran} alt="عکس لیست"/>
                                </div>
                                <div className={styles.listInfo}>
                                    <div className={styles.listName}>لیست {collectionName}</div>
                                    <div className={styles.listDiscription}>{Discription || "بدون توضیح"}</div>
                                </div>
                            </div>

                        </div>

                        <div className={styles.scrollbar}>
                            {booksInMyList.length === 0 ? (
                                <div className={styles.emptyList}>
                                    <img src={NoBookInList} alt=""/>
                                    <p>ببین لیستت خالیه!</p>
                                </div>
                            ) : (
                                booksInMyList.map((book) => (
                                        <div>

                                            <div
                                                className={styles.bookCard}>
                                                <div
                                                    className={styles.deleteBtn}
                                                    onClick={() => handleDeleteBookFromList(book.BookID)}
                                                >
                                                    <img src={DeleteIcon} alt="حذف کتاب"/>
                                                </div>
                                                <div className={styles.bookImage}>
                                                    <img src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${book.BookID}`} alt="Black Hourse" />
                                                </div>
                                                <div className={styles.bookInfo}>
                                                    <div className={styles.bookName}>{book.Title}</div>
                                                    <div className={styles.bookAuthor}>{book.FullAuthorName}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>

                    </div>
                </div>

            </div>

            <div>
                <Footer />
            </div>

            {isDeleteCollection && (
                <DeleteListModal onClose={() => setIsDeleteCollection(false)} collectionid={collectionid} />
            )}
        </div>
    )
}