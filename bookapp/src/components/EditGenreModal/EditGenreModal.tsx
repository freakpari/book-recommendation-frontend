import React from "react";
import styles from "./EditGenreModal.module.scss";
import addIcon from "./icons/Plus.svg"
import deleteIcon from "./icons/Trash.svg"

const genresList = ["فلسفی", "رمان", "تخیلی", "تاریخی", "سفرنامه", "بیوگرافی", "طنز", "آموزشی", "سیاسی", "مذهبی", "شعر", "معاصر", "معمایی", "کودک", "تجربی", "داستان کوتاه", "جنایی", "عاشقانه", "اجتماعی", "اقتصادی", "ترسناک", "کلاسیک", "فانتزی", "خودیاری"];

interface GenreModalProps {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
    closeModal: () => void;
}

export default function EditGenreModal({ selectedGenres, setSelectedGenres, closeModal }: GenreModalProps) {
    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>ویرایش ژانرها</h2>
                <div className={styles.genreList}>
                    {genresList.map((genre) => (
                        <button
                            key={genre}
                            className={`${styles.genreButton} ${selectedGenres.includes(genre) ? styles.selected : ""}`}
                            onClick={() => toggleGenre(genre)}
                        >
                            <img
                                src={selectedGenres.includes(genre) ? deleteIcon : addIcon}
                                alt={selectedGenres.includes(genre) ? "حذف" : "اضافه"}
                                className={styles.icon}
                            />
                            {genre}
                        </button>
                    ))}
                </div>
                <button className={styles.closeButton} onClick={closeModal}>تایید</button>
            </div>
        </div>
    );
}
