import React from "react";
import styles from "./MyFavoriteBook.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import BlackHourse from "./icons/blackHourse.svg"
import Pencil from "./icons/Pencil.svg"

export default function MyFavoriteBook() {
    return (
        <div className={styles.container}>
            <SearchNav />
            <div className={styles.MyFave}>

                <div className={styles.header}>ژانر‌های محبوب من</div>

                <div className={styles.MyFaveGenre}>
                    <div className={styles.Genres}>فلسفی</div>
                    <div className={styles.Genres}>رمان</div>
                    <div className={styles.Genres}>خیالی</div>
                    <button className={styles.editGenresBtn}>
                        <img src={Pencil} alt="edit genres" />
                    </button>
                </div>

                <div className={styles.MyFaveBooks}>کتاب‌های محبوب من</div>

                <div className={styles.scrollbar}>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                    <div className={styles.myBookCards}>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                        <button className={styles.bookCard}>
                            <img src={BlackHourse} alt="Black Hourse" />
                            <h4>اسب سیاه</h4>
                            <p>تاد رز واگی راس</p>
                        </button>
                    </div>
                </div>
            </div>
            <SideProfile />

            <div>
                <Footer />
            </div>
        </div>

    )
}