import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "./EditBookPage.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import eventEmitter from "../../utils/eventEmitter";
import axios from "axios";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import { AnimatePresence } from "framer-motion";
import {useLocation, useNavigate} from "react-router-dom";
import NoBookInList from "./icons/emptyList.svg";
import DeleteIcon from "./icons/deleteIcon.svg"
import Tehran from "./icons/Tehran.svg";
import DeleteListModal from "../../components/DeleteListModal/DeleteListModal";
import search from "./icons/Search.svg";
import arrow from "./icons/arrow.svg";

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
    const [query, setQuery] = useState("");
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [results, setResults] = useState<BooksInMyListDetails[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

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
                    FullAuthorName: book.fullauthorname,
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

    const handleBackToList = () => {
        navigate("/bookInlist", {
            state: {
                collectionid: collectionid,
                collectionName: collectionName,
                Discription: Discription,
            }
        });
    }

    const handleAddBookToList = async (bookid:number) => {
        const token = localStorage.getItem("token");
        if(!token){
            console.error("توکن یافت نشد.");
            return;
        }

        if(!bookid){
            showNotificationMessage("کتابی انتخاب نشده",'error')
        } else {
            try {
                await axios.post("https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/details",
                    {
                        collectionid: collectionid,
                        bookid: bookid,
                    },
                    {
                        timeout: 10000
                    })

                showNotificationMessage(`کتاب با موفقیت به لیست ${collectionName} اضافه شد`,'success');
                eventEmitter.emit();

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                else {
                    showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
                }
            }
        }

    }

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

    const handleDeleteBookFromList = async (bookid: number) => {
        try {
            await axios.delete(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/delete-collection-details?collectionid=${collectionid}&bookid=${bookid}`,{timeout: 10000})
            showNotificationMessage("کتاب با موفقیت از لیست حذف شد",'success');
            setBooksInMyList((prev) => prev.filter(book => book.BookID !== bookid));

            eventEmitter.emit();

        }catch (error: any) {
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
    },[collectionid]);

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
                                onClick={handleBackToList}
                                style={{cursor: 'pointer'}}
                            >
                                <img className={styles.backIcon} src={arrow} alt="برگشت"/>
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
                            <img
                                src={search}
                                className={styles.search}
                                alt="search button"
                                onClick={() => handleSearch(query)}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        {!isSearching && results.length > 0 && (
                            <div className={styles.searchResults}>
                                {results.map((book) => (
                                    <div
                                        key={book.BookID}
                                        className={styles.resultItem}
                                        onClick={() => handleAddBookToList(book.BookID)}
                                    >
                                        <img className={styles.bookcover} src={book.ImageUrl} alt={book.Title}/>
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