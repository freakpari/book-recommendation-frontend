import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyFavoriteBook.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import Pencil from "./icons/Pencil.svg";
import EditGenreModal from "../../components/EditGenreModal/EditGenreModal";
import eventEmitter from "../../utils/eventEmitter";
import DefaultBook from "./icons/defaultBook.svg"
import likeEventEmitter from "../../utils/likeEventEmitter";
import {AnimatePresence, motion} from "framer-motion";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";

interface FavoriteBooks {
    BookID: number;
    Title: string;
    AuthorID: number;
    PublisherID: number;
    GenreID1: number;
    GenreID2: number;
    GenreID3: number;
    LIKECOUNT: number;
}

export default function MyFavoriteBook() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [faveBooks, setFaveBooks] = useState<FavoriteBooks[]>([]);
    const [isFaveBook, setIsFaveBook] = useState(true);
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        const fetchUserFavoriteBooks = async () => {

            try {
                 const response = await axios.get<FavoriteBooks[]>("https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/favorit", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                 setFaveBooks(response.data);

                if(response.status === 204) {
                    setIsFaveBook(false);
                }

            }
            catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
                }
                if (error.response.status === 500) {
                    showNotificationMessage("خطا در دریافت اطلاعات کاربر",'error');
                }
            }
        }
        fetchUserFavoriteBooks();
        const unsubscribe = eventEmitter.subscribe(fetchUserGenres);
        return () => {
            unsubscribe();
        };
    }, []);

    const fetchUserGenres = async () => {

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        try {
            const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/genres", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                timeout: 10000
            });

            setSelectedGenres(response.data);
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
            }
            else {
                showNotificationMessage("خطا در دریافت ژانرهای کاربر",'error');
            }
        }
    };

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

    const handleEditGenresClick = () => {
        setIsModalOpen(true);
        eventEmitter.emit();
    };

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

            <div className={styles.favoriteSide}>
                <SideProfile />

                <div className={styles.MyFave}>
                    <div className={styles.header}>ژانر‌های محبوب من</div>

                    <div className={styles.MyFaveGenre}>
                        {selectedGenres.length > 0 ? (
                            selectedGenres.map((genre) => (
                                <div key={genre} className={styles.Genres}>
                                    {genre}
                                </div>
                            ))
                        ) : (
                            <div></div>
                        )}
                        <button
                            className={styles.editGenresBtn}
                            onClick={handleEditGenresClick}
                        >
                            <img src={Pencil} alt="edit genres" />
                        </button>
                    </div>

                    <div className={styles.MyFaveBooks}>کتاب‌های محبوب من</div>

                    {isFaveBook ? (
                        <div className={styles.scrollbar}>
                            {faveBooks.map((book) => (
                                <div key={book.BookID}>
                                    <div className={styles.bookCard}>
                                        <div className={styles.bookImage}>
                                            <img
                                                src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${book.BookID}`}
                                                alt=""
                                                onError={(e) => { e.currentTarget.src = "./icons/defaultBook.svg"; }}
                                            />
                                        </div>
                                        <div className={styles.bookInfo}>
                                            <div className={styles.bookName}>{book.Title}</div>
                                            <div className={styles.bookAuthor}>نویسنده: {book.AuthorID}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) :
                            <div className={styles.noFaveBook}>
                                هنوز هیچ کتابی رو به علاقه‌مندی هات اضافه نکردی
                            </div>
                    }


                </div>
            </div>

            <div>
                <Footer />
            </div>
            {isModalOpen && (
                <EditGenreModal
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
