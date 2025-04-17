import React, { useEffect } from "react";
import styles from "./MyFavoriteBook.module.scss";
import { useState } from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import BlackHourse from "./icons/blackHourse.svg";
import Pencil from "./icons/Pencil.svg";
import EditGenreModal from "../../components/EditGenreModal/EditGenreModal";
import eventEmitter from "../../utils/eventEmitter";

export default function MyFavoriteBook() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    useEffect(() => {
        // فراخوانی eventEmitter در صورت نیاز
        eventEmitter.emit();

        // مدیریت overflow صفحه
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden"; // برای برخی مرورگرها
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
        eventEmitter.emit(); // اگر نیاز به emit رویداد جداگانه دارید
    };

    return (
        <div className={styles.container}>
            <SearchNav />
            <div className={styles.favoriteSide}>
                <SideProfile />

                <div className={styles.MyFave}>
                    <div className={styles.header}>ژانر‌های محبوب من</div>

                    <div className={styles.MyFaveGenre}>
                        {selectedGenres.map((genre) => (
                            <div key={genre} className={styles.Genres}>
                                {genre}
                            </div>
                        ))}
                        <button
                            className={styles.editGenresBtn}
                            onClick={handleEditGenresClick} // استفاده از تابع جدید
                        >
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

    )
}