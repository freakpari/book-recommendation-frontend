import React, {useRef, useState} from "react";
import styles from "./VerifyForgetPasswordCode.module.scss";
import Logo from "../SetNewPassword/icons/logo.svg";
import MainPic from "../SetNewPassword/icons/mainPic.svg";
import {Link} from "react-router-dom";

export default function VerifyForgetPasswordCode() {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);

        if (value && index < 6) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (index < 5) {
                inputsRef.current[index - 1]?.focus();
            }
        } else if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div className={styles.VerifyPasswordContainer}>

            <div className={styles.header}>
                <img src={Logo} alt="Logo" />
                <div className={styles.title}>فراموشی رمز عبور</div>
            </div>

            <div className={styles.content}>
                <div>
                    <img src={MainPic} alt="" />
                </div>
                <div className={styles.codeForm}>
                    <div className={styles.hintPara}>کد ارسال شده به ایمیل خود را وارد کنید</div>
                    <div className={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                className={`${styles.otpInput} ${digit ? styles.filled : ""}`}
                                autoFocus={index === 0 && otp.every(digit => digit === "")}
                            />

                        ))}
                    </div>
                    <div>
                        <Link className={styles.linkToLogin} to="/setNewPass">
                            <button className={styles.submitBtn}>
                                تائید
                            </button>
                        </Link>
                    </div>
                    <div className={styles.notRecieved}>
                        کد هنوز نیومده؟ <span className={styles.reSend}>ارسال مجدد کد</span>
                    </div>
                </div>

            </div>

        </div>
    )
}