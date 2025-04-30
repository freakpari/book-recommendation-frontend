import React from "react";
import styles from "./UserProfileModal.module.scss";
import Maryam from "./icons/Maryam.svg"
import Tehran from "../../pages/MyBookList/icons/Tehran.svg";
import Koodak from "../../pages/MyBookList/icons/Koodak.svg";
import {ReactComponent as Send} from "./icons/Send.svg";
import { ReactComponent as PlusCircle } from  "./icons/PlusCircle.svg";

interface Props {
    onClose: () => void;
}

const userList = [
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
    { title: "تهرانم", includes: "سری کتاب‌های هری پاتر، سری کتاب‌های ارباب حلقه‌ها، سری کتاب‌های بازی تاج و تخت", image: Tehran },
    { title: "کودک", includes: "شامل: سری کتاب‌های کودک ۱ ٬ اتل متل توتوله گاو حسن چجوره٬ نه شیر داره نه پستون یک زن هندی بسون", image: Koodak },
];

function BookListCard({ title, includes, image }: { title: string, includes: string, image: string }) {
    return (
        <div className={styles.listContent}>
            <div className={styles.listPic}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.listDescription}>
                <div className={styles.titlePlusIcon}>
                <div className={styles.listTitle}>
                    {title}
                </div>
                    <PlusCircle className={styles.plusCircleIcon} />
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
                <div className={styles.halfBorderCircle}>
                    <div className={styles.circle}>
                        <div className={styles.hideMainBorder}></div>
                        <img src={Maryam} alt="" />
                    </div>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.profile}>
                        <div className={styles.userInfo}>
                            <div className={styles.userId}>@marybooklover</div>
                            <div className={styles.userNameType}>
                                <div className={styles.userName}>مریم ساداتی</div>
                                <div>ENFP</div>
                            </div>
                            <div className={styles.userBio}>مری جون هستم کسی که منریدنیستردنتسیذرنتلذسبنتلرذ</div>
                        </div>
                        <div className={styles.sendMessageBtn}>
                            <p>ارسال پیام</p>
                            <Send className={styles.sendIcon} />
                        </div>
                    </div>
                    <div className={styles.listHeader}>لیست‌های ساخته شده</div>
                    <div className={styles.bookListContainer}>
                        <div className={styles.userListDrawer}>
                            {/*<div className={styles.noList}>هیچ لیستی توسط این کاربر ساخته نشده است</div>*/}

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
                </div>
            </div>
        </div>

    );
}
