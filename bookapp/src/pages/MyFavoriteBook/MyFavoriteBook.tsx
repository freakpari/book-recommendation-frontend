import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyFavoriteBook.module.scss";
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

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        const fetchUserGenres = async () => {
            try {
                const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/genres", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSelectedGenres(response.data);
            } catch (error) {
                console.error("خطا در دریافت ژانرها: ", error);
            }
        };
        const unsubscribe = eventEmitter.subscribe(fetchUserGenres);
        return () => {
            unsubscribe();
        };
    }, [token]);

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

                    <div className={styles.scrollbar}>
                        <div className={styles.myBookCards}>
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
    );
}
