import React, {useEffect, useState} from 'react';
import styles from "./BooksInMyList.module.scss";
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
import Pencil from "./icons/pencil.svg";
import DeleteIcon from "./icons/deleteIcon.svg"
import Tehran from "../../pages/MyBookList/icons/Tehran.svg";
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
    const collectionName = location.state?.collectionName || "";
    const Discription = location.state?.Discription || "";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [booksInMyList, setBooksInMyList] = useState<BooksInMyListDetails[]>([]);
    const navigate = useNavigate();
    const [isDeleteCollection, setIsDeleteCollection] = useState(false);

    const handleGoToBookDetails = (bookid: number) => {
        navigate(`/bookdetail/${bookid}`)
    };

    const handleEditBook = () => {
        navigate(`/editbookinlist`, {
            state: {
                collectionid: collectionid,
            }
        })
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
                    setBooksInMyList([]);
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
                                    <img src={Tehran} alt="عکس لیست"/>
                                </div>
                                <div className={styles.listInfo}>
                                    <div className={styles.listName}>لیست {collectionName}</div>
                                    <div className={styles.listDiscription}>{Discription || "بدون توضیح"}</div>
                                </div>
                            </div>
                            <div
                                className={styles.listMenu}
                            >
                                <img
                                    src={Menu} alt="منو"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                />

                                {isMenuOpen && (
                                    <div className={styles.menu}>
                                        <div
                                            className={styles.menuOption}
                                            onClick={handleEditBook}
                                        >
                                            <img src={Pencil} alt=""/>
                                            <p>ویرایش کتاب‌های لیست</p>
                                        </div>
                                        <div className={styles.hr}></div>
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