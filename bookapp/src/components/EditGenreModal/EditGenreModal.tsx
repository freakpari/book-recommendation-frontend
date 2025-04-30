import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditGenreModal.module.scss";
import addIcon from "./icons/Plus.svg";
import deleteIcon from "./icons/Trash.svg";
import eventEmitter from "../../utils/eventEmitter";

interface Genre {
    genreid: number;
    title: string;
}

interface GenreModalProps {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
    closeModal: () => void;
}

const EditGenreModal = ({ selectedGenres, setSelectedGenres, closeModal }: GenreModalProps) => {
    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [selectedGenresTitles, setSelectedGenresTitles] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const [allGenresRes, selectedGenresRes] = await Promise.all([
                    axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/allgenres"),
                    axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/genres", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }),
                ]);

                setAllGenres(allGenresRes.data);
                setSelectedGenresTitles(selectedGenresRes.data);

            } catch (err) {
                console.error("خطا در گرفتن ژانرها:", err);
            }
        };

        fetchGenres();
    }, []);

    const toggleGenre = (genreTitle: string) => {
        if (selectedGenresTitles.includes(genreTitle)) {
            setSelectedGenresTitles(selectedGenresTitles.filter((g) => g !== genreTitle));
        } else {
            setSelectedGenresTitles([...selectedGenresTitles, genreTitle]);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("توکن یافت نشد");
            return;
        }

        setIsSaving(true);

        try {
            const selectedGenreIds = allGenres
                .filter((genre) => selectedGenresTitles.includes(genre.title))
                .map((genre) => genre.genreid);

            const res = await axios.put(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/genres",
                {
                    userid: token,
                    genres: selectedGenreIds,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("آپدیت موفق:", res.data);
            closeModal();
            eventEmitter.emit();
        } catch (err) {
            console.error("خطا در ذخیره ژانرها:", err);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <div
            className={styles.modalOverlay}
            // onClick={closeModal}
        >
            <div className={styles.modalContent}>
                <h2>ویرایش ژانرها</h2>
                <div className={styles.genreList}>
                    {allGenres.map((genre) => (
                        <button
                            key={genre.genreid}
                            className={`${styles.genreButton} ${selectedGenresTitles.includes(genre.title) ? styles.selected : ""}`}
                            onClick={() => toggleGenre(genre.title)}
                        >
                            <img
                                src={selectedGenresTitles.includes(genre.title) ? deleteIcon : addIcon}
                                alt={selectedGenresTitles.includes(genre.title) ? "حذف" : "اضافه"}
                                className={styles.icon}
                            />
                            {genre.title}
                        </button>
                    ))}
                </div>

                <button className={styles.closeButton} onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                        <div className={styles.loadingText}>در حال ذخیره</div>
                    ) : (
                        "ذخیره"
                    )}
                </button>

            </div>
        </div>
    );
};

export default EditGenreModal;
