import React, {useEffect} from 'react';
import styles from "./BooksInUserList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import eventEmitter from "../../utils/eventEmitter";
import BlackHourse from "./icons/BlackHourse.svg"
import { ReactComponent as Plus } from "./icons/Plus.svg";

export default function BooksInUserList() {

    useEffect(() => {
        eventEmitter.emit();
    }, []);

    return (
        <div className={styles.container}>

            <SearchNav />

            <div className={styles.userBookList}>
                <div className={styles.booksInUserList}>

                    <div className={styles.header}>
                        <div className={styles.listInfo}>
                            <div className={styles.listName}>لیست تهرانم</div>
                            <div className={styles.listCreator}>ساخته شده توسط <span>مریم امیری</span></div>
                        </div>
                        <div>
                            <button
                                className={styles.addListBtn}
                            >
                                <div className={styles.btnContent}>
                                    افزودن به لیست
                                    <Plus className={styles.plusIcon} />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className={styles.scrollbar}>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookImage}>
                                <img src={BlackHourse} alt="Black Hourse" />
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.bookName}>اسب سیاه</div>
                                <div className={styles.bookAuthor}>تاد رز واگی راس</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}