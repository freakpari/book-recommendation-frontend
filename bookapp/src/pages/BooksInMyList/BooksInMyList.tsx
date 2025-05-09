import React, {useEffect} from 'react';
import styles from "./BooksInMyList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import eventEmitter from "../../utils/eventEmitter";
import BlackHourse from "./icons/BlackHourse.svg"


export default function BookInMyList() {

    useEffect(() => {
        eventEmitter.emit();
    }, []);

    return (
        <div className={styles.container}>

            <SearchNav />

            <div className={styles.bookListSide}>
                <SideProfile />

                <div className={styles.bookInMyList}>
                    <div className={styles.showBookContainer}>
                        <div className={styles.listName}>لیست <span>تهرانم</span></div>

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