import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import styles from "./EditProfile.module.scss";
import Footer from "../../components/Footer/Footer";
import SideProfile from "../../components/SideProfile/SideProfile";
import SearchNav from "../../components/SearchNav/SearchNav";
import { motion, AnimatePresence } from "framer-motion";
import {ChevronDown} from "lucide-react";
import axios from "axios";
import eventEmitter from "../../utils/eventEmitter";
import Eye from "./icons/visibility.svg";
import CloseEye from "./icons/visibilityoff.svg"

interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    bio: string;
    gender: string;
    birthday: string;
    phone_number: string;
    email: string;
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

export default function EditProfile() {

    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
    const showNotificationMessage = (message: string, type: 'success' | 'error') => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
    };
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
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [modal, setModal] = React.useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState(""); // yyyy-mm-dd
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("توکن یافت نشد"); // فقط در کنسول نمایش داده می‌شود
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                eventEmitter.emit();
                const user = response.data.user;
                setProfile(user);
                const birthDate = user.birthday ? new Date(user.birthday) : new Date();
                setDaySelectedValue((birthDate.getDate() + 1).toString()); // اینجا مقدار صحیح است
                setMonthSelectedValue((birthDate.getMonth() + 1).toString());
                setYearSelectedValue(birthDate.getFullYear().toString());
                setFirstName(user.first_name || "");
                setLastName(user.last_name || "");
                setUserName(user.user_name || "");
                setBio(user.bio || "");
                setGender(user.gender || "");
                setBirthday(user.birthday || "");
                setPhoneNumber(user.phone_number || "");
                setEmail(user.email || "");
                setSelectedGender(
                    user.gender === "M"
                        ? "مرد"
                        : user.gender === "F"
                            ? "زن"
                            : "ترجیح می‌دهم نگویم"
                );

            } catch (err: any) {
                if (err.response?.status === 401) {
                    console.error("دسترسی غیرمجاز");
                } else {
                    showNotificationMessage("خطا در دریافت اطلاعات کاربر", "error");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن یافت نشد");
            return;
        }

        setIsUpdatingProfile(true);

        try {
            const formattedBirthday = `${yearSelectedValue}-${monthSelectedValue.padStart(2, '0')}-${daySelectedValue.padStart(2, '0')}`;
            const updatedProfileData = {
                new_firstName: firstName,
                new_lastName: lastName,
                new_userName: userName,
                new_bio: bio,
                new_gender: selectedGender === "مرد" ? "M" : "F",
                new_birthday: formattedBirthday,
                new_phoneNumber: phoneNumber,
            };
            const response = await axios.put(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/updateProfile",
                updatedProfileData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            localStorage.setItem("userData", JSON.stringify(response.data.user));
            eventEmitter.emit();
            showNotificationMessage("پروفایل با موفقیت به‌روزرسانی شد", 'success');
        } catch (err) {
            showNotificationMessage("خطا در به‌روزرسانی پروفایل", 'error');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== repeatPassword) {
            showNotificationMessage("رمزهای عبور جدید مطابقت ندارند", "error");
            return;
        }
        if (newPassword.length < 8) {
            showNotificationMessage("رمز عبور جدید باید حداقل ۸ کاراکتر باشد", "error");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن یافت نشد");
            return;
        }

        setIsChangingPassword(true);

        try {
            const response = await axios.put(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/newPassword",
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            showNotificationMessage("رمز عبور با موفقیت تغییر یافت", 'success');
            setPasswordError(null);
            setOldPassword("");
            setNewPassword("");
            setRepeatPassword("");
            setModal(false);
            setPasswordSuccess(null);
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        } catch (err: any) {
            const errorMessage = err.response?.status === 404
                ? "رمز عبور فعلی اشتباه است"
                : "خطا در تغییر رمز عبور";
            showNotificationMessage(errorMessage, 'error');
        } finally {
            setIsChangingPassword(false);
        }
    };

    useEffect(() => {
        if (modal) {
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
    }, [modal]);

    return (
        <div className={styles.container}>
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>

            <SearchNav/>

            <div className={styles.editSide}>
                <SideProfile/>
                <div className={styles.update}>
                    <form action="" onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.EditProfilefield}>
                            <div className={styles.userEmailName}>
                                <input className={styles.userName}
                                       type="text"
                                       name="userName"
                                       id="userName"
                                       placeholder="نام کاربری"
                                       value={userName}
                                       onChange={(e) => setUserName(e.target.value)}
                                />
                                <input className={styles.userEmail}
                                       type="email"
                                       name="email"
                                       id="email"
                                       placeholder="ایمیل"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       readOnly={true}
                                />
                            </div>

                            <div className={styles.userFNameBirth}>
                                <input className={styles.firstName}
                                       type="text"
                                       name="firstName"
                                       id="firstName"
                                       placeholder="نام"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                />
                                <div className={styles.Birth}>
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
                                </div>
                            </div>

                            <div className={styles.userLNameBio}>
                                <input className={styles.lastName}
                                       type="text"
                                       name="lastName"
                                       id="lastName"
                                       placeholder="نام خانوادگی"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                />

                                <input className={styles.bio}
                                       type="text"
                                       name="bio"
                                       id="bio"
                                       maxLength={40}
                                       placeholder="یه چیزی درمورد خودت بنویس!"
                                       value={bio}
                                       onChange={(e) => setBio(e.target.value)}
                                />
                            </div>

                            <div className={styles.userGenderNumber}>
                                {modal && (
                                    <button
                                        className={styles.disableGender}
                                    >
                                        {selectedGender ? selectedGender : "جنسیت"}
                                        <ChevronDown />
                                    </button>

                                )}

                                {!modal && (
                                    <div>

                                        {isGenderOpen && (
                                            <div className={styles.genderoverlay}
                                                 onClick={() => {setIsGenderOpen(false)}}>
                                            </div>
                                        )}
                                        <div className={styles.dropdown}>
                                            <button
                                                type="button"
                                                className={`${styles.gender} ${selectedGender ? styles.selected : ""}`}
                                                onClick={() => setIsGenderOpen(!isGenderOpen)}
                                            >
                                                {selectedGender ? selectedGender : "جنسیت"}
                                                <motion.div
                                                    animate={{ rotate: isGenderOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    className={styles.iconWrapper}
                                                >
                                                    <ChevronDown />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isGenderOpen && (
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
                                                                            setGender("F");
                                                                            setIsGenderOpen(false);
                                                                        }}
                                                                    >
                                                                        زن
                                                                    </button>
                                                                    { selectedGender ==="ترجیح می‌دهم نگویم" && <hr className={styles.hr} />}
                                                                </>
                                                            )}

                                                            {selectedGender !== "مرد" && (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        className={styles.option}
                                                                        onClick={() => {
                                                                            setSelectedGender("مرد");
                                                                            setGender("M");
                                                                            setIsGenderOpen(false);
                                                                        }}
                                                                    >
                                                                        مرد
                                                                    </button>
                                                                    {/*{selectedGender !== "ترجیح می‌دهم نگویم" && <hr className={styles.hr} />}*/}
                                                                </>
                                                            )}

                                                            {/*{selectedGender !== "ترجیح می‌دهم نگویم" && (*/}
                                                            {/*    <button*/}
                                                            {/*        type="button"*/}
                                                            {/*        className={styles.option}*/}
                                                            {/*        onClick={() => {*/}
                                                            {/*            setSelectedGender("ترجیح می‌دهم نگویم");*/}
                                                            {/*            setGender("N");*/}
                                                            {/*            setIsOpen(false);*/}
                                                            {/*        }}*/}
                                                            {/*    >*/}
                                                            {/*        ترجیح می‌دهم نگویم*/}
                                                            {/*    </button>*/}
                                                            {/*)}*/}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                    </div>
                                )}

                                {modal && (
                                    <input
                                        className={styles.disablePhoneNumber}
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="۰۹۱۳۹۸۶۳۰۵۶"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                )}

                                {!modal && (
                                    <input
                                        className={styles.phoneNumber}
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="۰۹۱۳۹۸۶۳۰۵۶"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                )}
                            </div>

                            <div className={styles.Btns}>
                                <button
                                    type="button"
                                    className={styles.changePassBtn}
                                    onClick={() => setModal(true)}
                                >
                                    تغییر رمز
                                </button>

                                {modal && (
                                    <div>
                                        <div className={styles.overlay} onClick={() => {
                                            setModal(false);
                                            setPasswordError(null);
                                            setPasswordSuccess(null);
                                        }}>

                                        </div>
                                        <div className={styles.modalcontent}>
                                            <div className={styles.changePassPara}>
                                                تغییر رمز عبور
                                            </div>

                                            {passwordError && <div className={styles.error}>{passwordError}</div>}
                                            {passwordSuccess && <div className={styles.success}>{passwordSuccess}</div>}

                                            <div className={styles.changePassInputs}>
                                                <input
                                                    className={styles.password}
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    name="oldPassword"
                                                    id="oldPassword"
                                                    minLength={8}
                                                    placeholder="رمز عبور فعلی"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                />
                                                <span className={styles.eyeIcon} onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                                    <img
                                                        src={!showCurrentPassword ? Eye : CloseEye}
                                                        alt="showPass"
                                                    />
                                                </span>
                                            </div>
                                            <div className={styles.changePassInputs}>
                                                <input
                                                    className={styles.password}
                                                    type={showNewPassword ? "text" : "password"}
                                                    name="newPassword"
                                                    id="newPassword"
                                                    minLength={8}
                                                    placeholder="رمز عبور جدید"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                                <span className={styles.eyeIcon} onClick={() => setShowNewPassword(!showNewPassword)}>
                                                    <img
                                                        src={!showNewPassword ? Eye : CloseEye}
                                                        alt="showPass"
                                                    />
                                                </span>
                                            </div>

                                            <div className={styles.changePassInputs}>
                                                <input
                                                    className={styles.password}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="repeatPassword"
                                                    id="repeatPassword"
                                                    minLength={8}
                                                    placeholder="تکرار رمز عبور جدید"
                                                    value={repeatPassword}
                                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                                />

                                                <span className={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    <img
                                                        src={!showConfirmPassword ? Eye : CloseEye}
                                                        alt="showPass"
                                                    />
                                                </span>
                                            </div>
                                            <button
                                                className={styles.updatePasswordBtn}
                                                onClick={handlePasswordChange}
                                            >
                                                {isChangingPassword ? (
                                                    <span className={styles.loadingText}>در حال تغییر</span>
                                                ) : (
                                                    "ثبت"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    className={styles.updateProfileBtn}
                                    onClick={handleProfileUpdate}
                                    type="button"
                                    disabled={isUpdatingProfile}
                                >
                                    {isUpdatingProfile ? (
                                        <span className={styles.loadingText}>در حال ذخیره...</span>
                                    ) : (
                                        "به‌روزرسانی"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}