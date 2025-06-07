import React, {useState} from 'react';
import styles from './MbtiResult.module.scss';
import Footer from '../../components/Footer/Footer';
import SearchNav from "../../components/SearchNav/SearchNav";
import Background from "./icons/background.svg";
import {AnimatePresence, motion} from "framer-motion";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function MbtiResult() {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [loading, setLoading] = useState(false);
    const [selectedType1, setSelectedType1] = useState<"I" | "E" |null>(null);
    const [selectedType2, setSelectedType2] = useState<"N" | "S" |null>(null);
    const [selectedType3, setSelectedType3] = useState<"T" | "F" |null>(null);
    const [selectedType4, setSelectedType4] = useState<"J" | "P" |null>(null);
    const navigate = useNavigate();
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const handleSendUserType = async () => {
        const token  = localStorage.getItem("token");
        if(!token){
            console.log("توکن یافت نشد.");
            return;
        }

        if (selectedType1 && selectedType2 && selectedType3 && selectedType4) {
            const newMBTI = selectedType1 + selectedType2 + selectedType3 + selectedType4;
            try {
                setLoading(true);
                await axios.put(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/MBTI-update`,
                    {new_MBTI: newMBTI},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        timeout: 10000
                    },
                );

                showNotificationMessage("تایپت با موفقیت اضافه شد",'success');
                setTimeout(() => {
                    navigate("/suggestionBook");
                }, 1200);

            } catch (error: any) {
                if (error.code === 'ECONNREFUSED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                } else {
                    showNotificationMessage("خطا در ثبت تایپ کاربر", 'error');
                }
            } finally {
                setLoading(false);
            }
        } else {
            showNotificationMessage("لطفاً همه فیلدها را پر کنید","error");
            return;
        }


    }

    return (
        <div className={styles.container}>
            <SearchNav />
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>
            <div className={styles.container}>

                <img src={Background} alt='background' className={styles.background}/>


                <div className={styles.overlay}>
                    <div className={styles.header}>
                        خیلی خب! حالا که تست رو انجام دادی نتیجه‌اش رو اینجا وارد کن
                    </div>

                    <div className={styles.enterType}>

                        <div>
                            {isOpen4 && (
                                <div
                                    onClick={() => {setIsOpen4(false)}}>
                                </div>
                            )}
                            <div className={styles.dropdown}>
                                <button
                                    type="button"
                                    className={`${styles.gender} ${selectedType4 ? styles.selected : ""}`}
                                    onClick={() => setIsOpen4(!isOpen4)}
                                >
                                    {selectedType4 ? selectedType4 : "-"}
                                </button>

                                <AnimatePresence>
                                    {isOpen4 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "backInOut" }}
                                        >
                                            <div className={styles.dropDownMenu}>
                                                {selectedType4 !== "J" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType4("J");
                                                                setIsOpen4(false);
                                                            }}
                                                        >
                                                            J
                                                        </button>
                                                        {(selectedType4 !== "P") && <hr className={styles.hr} /> }
                                                    </>
                                                )}

                                                {selectedType4 !== "P" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType4("P");
                                                                setIsOpen4(false);
                                                            }}
                                                        >
                                                            P
                                                        </button>
                                                    </>
                                                )}


                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div>
                            {isOpen3 && (
                                <div
                                    onClick={() => {setIsOpen3(false)}}>
                                </div>
                            )}
                            <div className={styles.dropdown}>
                                <button
                                    type="button"
                                    className={`${styles.gender} ${selectedType3 ? styles.selected : ""}`}
                                    onClick={() => setIsOpen3(!isOpen3)}
                                >
                                    {selectedType3 ? selectedType3 : "-"}
                                </button>

                                <AnimatePresence>
                                    {isOpen3 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "backInOut" }}
                                        >
                                            <div className={styles.dropDownMenu}>
                                                {selectedType3 !== "T" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType3("T");
                                                                setIsOpen3(false);
                                                            }}
                                                        >
                                                            T
                                                        </button>
                                                        {(selectedType3 !== "F") && <hr className={styles.hr} /> }
                                                    </>
                                                )}

                                                {selectedType3 !== "F" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType3("F");
                                                                setIsOpen3(false);
                                                            }}
                                                        >
                                                            F
                                                        </button>
                                                    </>
                                                )}


                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div>
                            {isOpen2 && (
                                <div
                                    onClick={() => {setIsOpen2(false)}}>
                                </div>
                            )}
                            <div className={styles.dropdown}>
                                <button
                                    type="button"
                                    className={`${styles.gender} ${selectedType2 ? styles.selected : ""}`}
                                    onClick={() => setIsOpen2(!isOpen2)}
                                >
                                    {selectedType2 ? selectedType2 : "-"}
                                </button>

                                <AnimatePresence>
                                    {isOpen2 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "backInOut" }}
                                        >
                                            <div className={styles.dropDownMenu}>
                                                {selectedType2 !== "N" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType2("N");
                                                                setIsOpen2(false);
                                                            }}
                                                        >
                                                            N
                                                        </button>
                                                        {(selectedType2 !== "S") && <hr className={styles.hr} /> }
                                                    </>
                                                )}

                                                {selectedType2 !== "S" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType2("S");
                                                                setIsOpen2(false);
                                                            }}
                                                        >
                                                            S
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div>
                            {isOpen1 && (
                                <div
                                    onClick={() => {setIsOpen1(false)}}>
                                </div>
                            )}
                            <div className={styles.dropdown}>
                                <button
                                    type="button"
                                    className={`${styles.gender} ${selectedType1 ? styles.selected : ""}`}
                                    onClick={() => setIsOpen1(!isOpen1)}
                                >
                                    {selectedType1 ? selectedType1 : "-"}
                                </button>

                                <AnimatePresence>
                                    {isOpen1 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "backInOut" }}
                                        >
                                            <div className={styles.dropDownMenu}>
                                                {selectedType1 !== "I" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType1("I");
                                                                setIsOpen1(false);
                                                            }}
                                                        >
                                                            I
                                                        </button>
                                                        {(selectedType1 !== "E") && <hr className={styles.hr} /> }
                                                    </>
                                                )}

                                                {selectedType1 !== "E" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className={styles.option}
                                                            onClick={() => {
                                                                setSelectedType1("E");
                                                                setIsOpen1(false);
                                                            }}
                                                        >
                                                            E
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>

                    <button
                        className={styles.submitBtn}
                        onClick={handleSendUserType}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className={styles.loadingText}>در حال ارسال</span>
                        ) : (
                                "ثبت"
                            )}
                    </button>

                    <p className={styles.testAgain}>
                        اگه دوست داری دوباره تست بدی بری برو <a href="https://www.16personalities.com/fa/%D8%A2%D8%B2%D9%85%D9%88%D9%86-%D8%B4%D8%AE%D8%B5%DB%8C%D8%AA">اینجا</a>
                    </p>
                </div>

            </div>

            <div>
                <Footer />
            </div>

        </div>
    )
}