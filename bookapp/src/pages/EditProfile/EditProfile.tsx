import React from "react";
import {useState} from "react";
import styles from "./EditProfile.module.scss";
import Footer from "../../components/Footer/Footer";
import SideProfile from "../../components/SideProfile/SideProfile";
import SearchNav from "../../components/SearchNav/SearchNav";
import { motion, AnimatePresence } from "framer-motion";
import {ChevronDown} from "lucide-react";
import { Eye, EyeOff } from "lucide-react";


export default function EditProfile() {

    const [daySelectedValue, setDaySelectedValue] = React.useState("");
    const dayStartValue = 1;

    const [yearSelectedValue, setYearSelectedValue] = React.useState("");
    const yearStartValue = 1320;

    const [monthSelectedValue, setMonthSelectedValue] = React.useState("");
    const months = [
        { id: 1, name: "فروردین" },
        { id: 2, name: "اردیبهشت" },
        { id: 3, name: "خرداد" },
        { id: 4, name: "تیر" },
        { id: 5, name: "مرداد" },
        { id: 6, name: "شهریور" },
        { id: 7, name: "مهر" },
        { id: 8, name: "آبان" },
        { id: 9, name: "آذر" },
        { id: 10, name: "دی" },
        { id: 11, name: "بهمن" },
        { id: 12, name: "اسفند" },
    ];

    const [selectedGender, setSelectedGender] = useState<"زن" | "مرد" | "ترجیح می‌دهم نگویم" |null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    return (
            <div className={styles.container}>
                <SearchNav/>

                <div className={styles.update}>

                    <form action="">

                        <input className={styles.userName} type="text" name="userName" id="userName"
                               placeholder="نام کاربری"/>
                        <input className={styles.userEmail} type="email" name='email' id="email" placeholder="ایمیل"/>

                        <input className={styles.firstName} type="text" name="firstName" id="firstName"
                               placeholder="نام"/>

                        <select
                            className={`${styles.dayOfBirth} ${daySelectedValue ? styles.selected : ""}`}
                            id="dayOfBirth"
                            name="dayOfBirth"
                            value={daySelectedValue}
                            onChange={(e) => setDaySelectedValue(e.target.value)}

                        >
                            {Array.from({length: 31}, (_, i) => (
                                <option key={i + dayStartValue} value={i + dayStartValue}>
                                    {i + dayStartValue}
                                </option>
                            ))}
                        </select>
                        <select
                            className={`${styles.monthOfBirth} ${monthSelectedValue ? styles.selected : ""}`}
                            id="monthOfBirth"
                            name="monthOfBirth"
                            value={monthSelectedValue}
                            onChange={(e) => setMonthSelectedValue(e.target.value)}
                        >
                            {months.map((month) => (
                                <option key={month.id} value={month.id}>
                                    {month.name}
                                    <ChevronDown/>
                                </option>
                            ))}
                        </select>
                        <select
                            className={`${styles.yearOfBirth} ${yearSelectedValue ? styles.selected : ""}`}
                            id="yearOfBirth"
                            name="yearOfBirth"
                            value={yearSelectedValue}
                            onChange={(e) => setYearSelectedValue(e.target.value)}
                        >
                            {Array.from({length: 81}, (_, i) => (
                                <option key={i + yearStartValue} value={i + yearStartValue}>
                                    {i + yearStartValue}
                                </option>
                            ))}
                        </select>

                        <input className={styles.lastName} type="text" name="lastName" id="lastName"
                               placeholder="نام خانوادگی"/>
                        <>
                            <input
                                className={styles.password}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                minLength={8}
                                placeholder="رمز عبور"
                            />
                            <button
                                type="button"
                                className={styles.showPasswordBtn}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </>





                        <input className={styles.bio} type="text" name="bio" id="bio" maxLength={40}
                               placeholder="یه چیزی درمورد خودت بنویس!"/>
                        <button className={styles.changePassBtn}>تغییر رمز عبور</button>


                        <div className={styles.dropdown}>
                            <button
                                type="button"
                                className={`${styles.gender} ${selectedGender ? styles.selected : ""}`}
                                onClick={() => setIsOpen((prev) => !prev)}
                            >
                                {selectedGender ? selectedGender : "جنسیت"}
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={styles.iconWrapper}
                                >
                                    <ChevronDown />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "backInOut" }}
                                    >
                                        <div className={styles.dropDownMenu}>
                                            {selectedGender !== "زن" && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className={styles.option}
                                                        onClick={() => {
                                                            setSelectedGender("زن");
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        زن
                                                    </button>
                                                    <hr className={styles.hr} />
                                                </>
                                            )}

                                            {selectedGender !== "مرد" && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className={styles.option}
                                                        onClick={() => {
                                                            setSelectedGender("مرد");
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        مرد
                                                    </button>
                                                    {selectedGender !== "ترجیح می‌دهم نگویم" && <hr className={styles.hr} />}
                                                </>
                                            )}

                                            {selectedGender !== "ترجیح می‌دهم نگویم" && (
                                                <button
                                                    type="button"
                                                    className={styles.option}
                                                    onClick={() => {
                                                        setSelectedGender("ترجیح می‌دهم نگویم");
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    ترجیح می‌دهم نگویم
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <input className={styles.phoneNumber} type="number" name="phoneNumber" id="phoneNumber"
                               placeholder="۰۹۱۳۹۸۶۳۰۵۶"/>



                        <input className={styles.updateProfileBtn} type="submit" name="updateProfile" id="updateProfile"
                               value="به‌روزرسانی"/>
                    </form>
                </div>

                <SideProfile/>

                <div>
                    <Footer/>
                </div>

            </div>
    )
}
