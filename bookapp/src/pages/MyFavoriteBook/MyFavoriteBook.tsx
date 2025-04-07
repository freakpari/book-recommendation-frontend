import React, {useEffect} from "react";
import styles from "./MyFavoriteBook.module.scss";
import {useState} from "react";
import SearchNav from "../../components/SearchNav/SearchNav";
import SideProfile from "../../components/SideProfile/SideProfile";
import Footer from "../../components/Footer/Footer";
import BlackHourse from "./icons/blackHourse.svg"
import Pencil from "./icons/Pencil.svg"
import EditGenreModal from "../../components/EditGenreModal/EditGenreModal";

export default function MyFavoriteBook() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <div className={styles.container}>
            <SearchNav />
            <div className={styles.MyFave}>

                <div className={styles.header}>ژانر‌های محبوب من</div>

                <div className={styles.MyFaveGenre}>

                    {selectedGenres.map((genre) => (
                        <div key={genre} className={styles.Genres}>{genre}</div>
                    ))}
                    <button className={styles.editGenresBtn} onClick={() => setIsModalOpen(true)}>
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