import React, {useEffect, useState} from 'react';
import styles from "./BooksInSavedList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import { AnimatePresence } from "framer-motion";
import {useLocation, useNavigate} from "react-router-dom";
import NoBookInList from "./icons/emptyList.svg";
import Menu from "./icons/Menu.svg";
import DeleteIcon from "./icons/deleteIcon.svg"
import Tehran from "./icons/Tehran.svg";
import DeleteSavedList from "../../components/DeleteSavedList/DeleteSavedList";
import defaultBook from "./icons/defaultBook.svg";

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

export default function BookInMyList() {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const location = useLocation();
    const collectionid = location.state?.collectionid || "";
    const access = location.state?.access || "";
    const collectionName = location.state?.collectionName || "";
    const Discription = location.state?.Discription || "";
    const FullName = location.state?.FullName || "";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [booksInMyList, setBooksInMyList] = useState<BooksInMyListDetails[]>([]);
    const navigate = useNavigate();
    const [isDeleteCollection, setIsDeleteCollection] = useState(false);

    const handleGoToBookDetails = (bookid: number) => {
        navigate(`/bookdetail/${bookid}`)
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {return;}

        const fetchBookInListDetails = async () => {
            try {
                const response = await axios.get<BooksInMyListDetails[]>(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/details?collectionid=${collectionid}`,{timeout: 10000})
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

        fetchBookInListDetails();
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

            <div className={styles.bookListSide}>
                <SideProfile />

                <div className={styles.bookInMyList}>
                    <div className={styles.showBookContainer}>
                        <div className={styles.listDetails}>
                            <div className={styles.listInfoPic}>
                                <div className={styles.listPic}>
                                    <img
                                        src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/pic/${collectionid}`}
                                        alt={collectionName}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = Tehran;
                                        }}
                                    />
                                </div>
                                <div className={styles.listInfo}>
                                    <div className={styles.listName}>لیست {collectionName}</div>
                                    <div className={styles.listDiscription}>{Discription || "بدون توضیح"}</div>
                                    <div className={styles.listAuthor}>ساخته شده توسط {FullName}</div>
                                </div>
                            </div>
                            <div
                                className={styles.listMenu}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <img
                                    src={Menu} alt="منو"
                                />

                                {isMenuOpen && (
                                    <div className={styles.menu}>
                                        <div
                                            className={styles.menuOption}
                                            onClick={() => setIsDeleteCollection(true)}
                                        >
                                            <img src={DeleteIcon} alt=""/>
                                            <p>حذف لیست</p>
                                        </div>
                                    </div>
                                )}

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
                                                    />
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
                <DeleteSavedList onClose={() => setIsDeleteCollection(false)} access={access} />
            )}

        </div>
    )
}