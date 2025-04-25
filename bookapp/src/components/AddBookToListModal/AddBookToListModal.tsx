import React from "react";
import styles from "./AddBookToListModal.module.scss";
import Tehran from "./icons/Tehran.svg"

interface Props {
    onClose: () => void;
}

const userList = [
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Tehran },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Tehran },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Tehran },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Tehran },
];

function BookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.listTitle}>
                    {title}
                </div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

export default function UserProfileModal ({ onClose }: Props) {
    return (
        <div>
            <div
                className={styles.overlay}
                onClick={onClose}
            >
            </div>

            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.bookListContainer}>
                        <div className={styles.userListDrawer}>
                            {userList.map((list, index) => (
                                <BookListCard
                                    key={`my-list-${index}`}
                                    title={list.title}
                                    includes={list.includes}
                                    image={list.image}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.createListContainer}>
                        <button
                            className={styles.createListBtn}
                        >
                            <div
                                className={styles.btnContent}
                            >
                                ساخت لیست جدید
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
