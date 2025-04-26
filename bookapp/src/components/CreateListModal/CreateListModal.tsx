import React from "react";
import styles from "./CreateListModal.module.scss";
import { ReactComponent as Plus } from "./icons/Plus.svg";

interface Props {
    onClose: () => void;
}

export default function CreateListModal({ onClose }: Props) {

    const [privateList, setPrivateList] = React.useState(false);

    return (
        <div>
            <div
                className={styles.overlay}
                onClick={onClose}
            >
            </div>

            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.listPhoto}>
                        <Plus
                            className={styles.plusIcon}
                        />
                    </div>
                    <div className={styles.listInfo}>
                        <div>
                            <input
                                className={styles.listNameInput}
                                type="text"
                                name="listName"
                                placeholder="نام لیست شما"
                            />
                        </div>
                        <div className={styles.listNameMode}>
                            <div className={styles.privateListSection}>
                                لیست خصوصی
                                <button
                                    className={`${styles.privateBtn} ${privateList ? styles.selected : ""}`}
                                    onClick={() => {setPrivateList(!privateList)}}
                                >
                                    <div className={`${styles.circleInBtn} ${privateList ? styles.selected : ""}`}></div>
                                </button>
                            </div>
                            <div>
                                <button className={styles.submitListBtn}>
                                    ساخت لیست
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
