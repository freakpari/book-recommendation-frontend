import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditGenreModal.module.scss";
import addIcon from "./icons/Plus.svg";
import deleteIcon from "./icons/Trash.svg";
import eventEmitter from "../../utils/eventEmitter";
import {AnimatePresence, motion} from "framer-motion";

interface Genre {
    genreid: number;
    title: string;
}

interface GenreModalProps {
    selectedGenres: string[];
    setSelectedGenres: (genres: string[]) => void;
    closeModal: () => void;
}

interface NotificationModalProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);
    return (
        <motion.div
            className={`${styles.notificationModal} ${type === 'success' ? styles.success : styles.error}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.notificationContent}>
                {message}
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
        </motion.div>
    );
};

const EditGenreModal = ({ selectedGenres, setSelectedGenres, closeModal }: GenreModalProps) => {
    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [selectedGenresTitles, setSelectedGenresTitles] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
    const showNotificationMessage = (message: string, type: 'success' | 'error') => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
    };


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

            const response = await axios.put(
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

            closeModal();
            eventEmitter.emit();

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
