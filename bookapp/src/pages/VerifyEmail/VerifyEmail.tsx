import React from "react";
import styles from "./VerifyEmail.module.scss";
import Logo from "../SetNewPassword/icons/logo.svg";
import MainPic from "../SetNewPassword/icons/mainPic.svg";
import {Link} from "react-router-dom";


export default function VerifyEmail() {
    return (
        <div className={styles.VerifyEmailContainer}>
            <div className={styles.header}>
                <img src={Logo} alt="Logo" />
                <div className={styles.title}>فراموشی رمز عبور</div>
            </div>

            <div className={styles.content}>
                <div>
                    <img src={MainPic} alt="" />
                </div>

                <div className={styles.emailForm}>
                    <div className={styles.hintPara}>ایمیل خود را جهت دریافت کد تایید وارد کنید</div>

                    <form action="">
                        <div className={styles.form}>
                            <input
                                className={styles.emailInput}
                                type='email'
                                name="email"
                                id="email"
                                placeholder="ایمیل"
                            />

                            <div>
                                <Link className={styles.linkToVerifyPassword} to="/verifyPass">
                                    <button className={styles.submitBtn}>
                                        ادامه
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </form>

                    <div className={styles.rememberPass}>
                        رمزت یادت اومد؟ <Link to="/login" className={styles.backToLogin}>بازگشت به صفحه ورود</Link>
                    </div>
                </div>

            </div>

        </div>
    )
}