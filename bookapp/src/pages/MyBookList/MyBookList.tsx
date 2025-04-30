import React, { useEffect } from "react";
import styles from "./MyBookList.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import SideProfile from "../../components/SideProfile/SideProfile";
import eventEmitter from "../../utils/eventEmitter";
import Tehran from "./icons/Tehran.svg";
import Koodak from "./icons/Koodak.svg";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import { useState } from "react";
import CreateListModal from "../../components/CreateListModal/CreateListModal";


const myList = [
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
];

const mySavedList = [
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
];

function BookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.listTitle}>{title}</div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

function SavedBookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.listTitle}>{title}</div>
                <div className={styles.listIncludes}>{includes}</div>
            </div>
        </div>
    );
}

export default function MyBookList() {

    const [isModalOpen, setIsModalOpen] = useState(false);


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

    return (
        <div className={styles.container}>
            <div>
                <SearchNav />
            </div>
            <div className={styles.listSide}>
                <SideProfile />
                <div className={styles.bookList}>
                    <div className={styles.myListHeader}>لیست‌های من</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.myListDrawer}>
                            {myList.map((list, index) => (
                                <BookListCard
                                    key={`my-list-${index}`}
                                    title={list.title}
                                    includes={list.includes}
                                    image={list.image}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.mySavedListHeader}>لیست‌های ذخیره‌شده</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.myListDrawer}>
                            {mySavedList.map((list, index) => (
                                <SavedBookListCard
                                    key={`saved-list-${index}`}
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
                            onClick={() => setIsModalOpen(true)}
                        >
                            <div className={styles.btnContent}>
                                ساخت لیست
                                <Plus className={styles.plusIcon} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            {isModalOpen && (
                <CreateListModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
