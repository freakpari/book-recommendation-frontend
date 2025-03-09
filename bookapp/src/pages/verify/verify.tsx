import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./verify.module.scss";

export default function Verify() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]); 
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index > 0) inputsRef.current[index - 1]?.focus();
};
const verifyOtp = () => {
    const enteredCode = otp.join(""); 
    if (enteredCode !== "123456") {     
        setErrorMessage("کد وارد شده اشتباه است، دوباره تلاش کنید.");
        return false;
    }
        setErrorMessage(""); 
        return true;
};
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !otp[index] && index < 5 ) {
    inputsRef.current[index + 1]?.focus();
    }
    
};


const isOtpComplete = otp.every((digit) => digit !== "");

const handleSubmit = () => {
  // If all OTP fields are filled and OTP is valid, navigate to dashboard
  if (isOtpComplete && verifyOtp()) {
    console.log("OTP Entered:", otp.join(""));
    navigate("/dashboard");
  } else {
    setErrorMessage("لطفا تمام فیلدها را پر کنید.");
  }
};

return (
    <div className={styles.container}>
        <h2>کد ارسال شده به ایمیل خود را وارد کنید</h2>
    <div className={styles.otpContainer}>
        {otp.map((digit, index) => (
        <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
            inputsRef.current[index] = el;   
            }}
            className={styles.otpInput}
        />
        ))}
    </div>
    {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        <button className={styles.confirmButton} onClick={handleSubmit}>تأیید</button>
        <p className={styles.resendText}>کد هنوز نیومده؟ <span className={styles.resendLink}>ارسال مجدد کد</span></p>
    </div>
);
}
