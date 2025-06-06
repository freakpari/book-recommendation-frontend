import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "./BooksInMyList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
// import search from "./icons/Search.svg";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import { AnimatePresence } from "framer-motion";
import {useLocation, useNavigate} from "react-router-dom";
import NoBookInList from "./icons/emptyList.svg";
import Menu from "./icons/Menu.svg";
import Pencil from "./icons/pencil.svg";
import DeleteIcon from "./icons/deleteIcon.svg"
import Tehran from "./icons/Tehran.svg";
import DeleteListModal from "../../components/DeleteListModal/DeleteListModal";
import searchIcon from "../../components/SearchNav/icons/searchButton.svg";

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
    const [query, setQuery] = useState("");
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [results, setResults] = useState<BooksInMyListDetails[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = useCallback(async (input: string) => {
        if (!input.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const url = `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/searchurl/${encodeURIComponent(input)}`;
            const response = await axios.get(url);
            const data = response.data.updatedBookData || [];

            const mappedResults: BooksInMyListDetails[] = data
                .filter((book: any) =>
                    book.title.trim().toLowerCase().includes(input.trim().toLowerCase())
                )
                .slice(0, 5)
                .map((book: any) => ({
                    BookID: book.bookid,
                    Title: book.title,
                    FullAuthorName:book.fullauthorname,
                    ImageUrl: book.imageurl,
                }));

            setResults(mappedResults);
        } catch (error) {
            console.error("خطا در دریافت نتایج:", error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            if (query.trim()) {
                handleSearch(query);
            } else {
                setResults([]);
            }
        }, 300);

        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, [query, handleSearch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(query);
        }
    };

    const handleGoToBookDetails = (bookid: number) => {
        navigate(`/bookdetail/${bookid}`)
    };

    const handleEditBook = () => {
        navigate(`/editbookinlist`, {
            state: {
                collectionid: collectionid,
                collectionName: collectionName,
                Discription: Discription,
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
                        <div className={styles.searchBar}>
                            <input
                                type="search"
                                placeholder="برای اضافه کردن کتاب جدید به لیست نام آن یا نویسنده را وارد کنید"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {/*<img*/}
                            {/*    src={search}*/}
                            {/*    alt="search button"*/}
                            {/*    onClick={() => handleSearch(query)}*/}
                            {/*    style={{ cursor: "pointer" }}*/}
                            {/*/>*/}
                        </div>
                        {!isSearching && results.length > 0 && (
                            <div className={styles.searchResults}>
                                {results.map((book) => (
                                    <div
                                        key={book.BookID}
                                        className={styles.resultItem}

                                    >
                                        <img className={styles.bookcover} src={book.ImageUrl} alt={book.Title} />
                                        <div className={styles.bookdetail}>
                                            <p className={styles.bookTitle}>{book.Title}</p>
                                            <p className={styles.bookAuthor}>{book.FullAuthorName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!isSearching && query && results.length === 0 && (
                            <div className={styles.searchResults}><p>نتیجه‌ای یافت نشد</p></div>
                        )}
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