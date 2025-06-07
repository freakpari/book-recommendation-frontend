import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditGenreModal.module.scss";
import addIcon from "./icons/Plus.svg";
import deleteIcon from "./icons/Trash.svg";
import eventEmitter from "../../utils/eventEmitter";
import {AnimatePresence} from "framer-motion";
import { useNotification, NotificationModal } from "../NotificationManager/NotificationManager";

interface Genre {
    genreid: number;
    title: string;
}

interface GenreModalProps {
    closeModal: () => void;
}

const EditGenreModal = ({ closeModal }: GenreModalProps) => {
    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [selectedGenresTitles, setSelectedGenresTitles] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        const fetchGenres = async () => {
            try {
                const [allGenresRes, selectedGenresRes] = await Promise.all([
                    axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/allgenres"),
                    axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/genres", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        timeout: 10000
                    }),
                ]);

                setAllGenres(allGenresRes.data);
                setSelectedGenresTitles(selectedGenresRes.data);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
                }
                else {
                    showNotificationMessage("خطا در دریافت ژانرها",'error')
                }
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

            await axios.put(
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
                    timeout: 10000
                }
            );

            showNotificationMessage("ژانرهای کاربر با موفقیت ثبت شد",'success')
            setTimeout(() => {
                closeModal();
                eventEmitter.emit();
            }, 1200);

        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
            }
            else {
                showNotificationMessage("خطا در ذخیره ژانرها",'error')
            }
        } finally {
            setIsSaving(false);
        }
    };


    return (

        <div
            className={styles.modalOverlay}
        >
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>

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

                <button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
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
