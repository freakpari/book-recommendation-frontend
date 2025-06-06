import React, {useEffect, useState} from 'react';
import styles from "./BooksInUserList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AnimatePresence} from "framer-motion";
import {NotificationModal, useNotification} from "../../components/NotificationManager/NotificationManager";
// import NoBookInList from "./icons/emptyList.svg";
import defaultBook from "./icons/defaultBook.svg";

interface BooksInUserListDetails {
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

export default function BooksInUserList() {

    const location = useLocation();
    const collectionid = location?.state.collectionid || "";
    const collectionName = location?.state.collectionName || "";
    const FullName = location?.state.FullName || "";
    const access = location?.state.access || "";
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [booksInUserList, setBooksInUserList] = useState<BooksInUserListDetails[]>([]);
    const navigate = useNavigate();

    const handleGoToBookDetails = (bookid: number) => {
        navigate(`/bookdetail/${bookid}`)
    };

    const handleAddList = async () => {
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
                showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
            }
        }

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {return;}

        const fetchBookInUserListDetails = async () => {
            try {
                const response = await axios.get<BooksInUserListDetails[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/details?collectionid=${collectionid}`,{timeout: 10000})
                setBooksInUserList(response.data);

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

        fetchBookInUserListDetails();
    },[])

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

            <div className={styles.userBookList}>
                <div className={styles.booksInUserList}>

                    <div className={styles.header}>
                        <div className={styles.listInfo}>
                            <div className={styles.listName}>لیست {collectionName}</div>
                            <div className={styles.listCreator}>ساخته شده توسط {FullName}</div>
                        </div>
                        <div>
                            <button
                                className={styles.addListBtn}
                            >
                                <div
                                    className={styles.btnContent}
                                    onClick={handleAddList}
                                >
                                    افزودن به لیست
                                    <Plus className={styles.plusIcon} />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className={styles.scrollbar}>
                        {booksInUserList.length === 0 ? (
                            <div className={styles.emptyList}>
                                {/*<img src={NoBookInList} alt=""/>*/}
                                <p>این لیست خالیه!</p>
                            </div>
                        ) : (
                            booksInUserList.map((book) => (
                                    <div>
                                        <div
                                            className={styles.bookCard}
                                            onClick={() => handleGoToBookDetails(book.BookID)}
                                        >
                                            <div className={styles.bookImage}>
                                                <img
                                                    src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${book.BookID}`}
                                                    alt={book.Title}
                                                    onError={(e) => {
                                                        if (e.currentTarget.src !== defaultBook) {
                                                            e.currentTarget.src = defaultBook;
                                                        }
                                                    }}
                                                />                                            </div>
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
            <div>
                <Footer />
            </div>
        </div>
    )
}