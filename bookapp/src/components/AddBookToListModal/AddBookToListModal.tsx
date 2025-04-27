import React from "react";
import styles from "./AddBookToListModal.module.scss";
import Tehran from "./icons/Tehran.svg"
import { ReactComponent as Plus } from "./icons/Plus.svg";

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

    const [isCreateListModalOpen, setIsCreateListModalOpen] = React.useState(false);
    const [privateList, setPrivateList] = React.useState(false);

    return (
        <div>
            <div
                className={styles.overlay}
                onClick={onClose}
            >
            </div>

            {!isCreateListModalOpen && (
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
                                    onClick={() => {setIsCreateListModalOpen(true);}}
                                >
                                    ساخت لیست جدید
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCreateListModalOpen && (
                <div className={styles.clModalOverlay}>
                    <div className={styles.clModalContent}>
                        <div className={styles.clListPhoto}>
                            <Plus
                                className={styles.clPlusIcon}
                            />
                        </div>
                        <div className={styles.clListInfo}>
                            <div>
                                <input
                                    className={styles.clListNameInput}
                                    type="text"
                                    name="listName"
                                    placeholder="نام لیست شما"
                                />
                            </div>
                            <div className={styles.clListNameMode}>
                                <div className={styles.clPrivateListSection}>
                                    لیست خصوصی
                                    <button
                                        className={`${styles.clPrivateBtn} ${privateList ? styles.selected : ""}`}
                                        onClick={() => {setPrivateList(!privateList)}}
                                    >
                                        <div className={`${styles.clCircleInBtn} ${privateList ? styles.selected : ""}`}></div>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={styles.clSubmitListBtn}
                                        onClick={() => {setIsCreateListModalOpen(false);}}
                                    >
                                        ساخت لیست
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}
