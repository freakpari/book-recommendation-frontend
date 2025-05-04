import React from "react";
import styles from "./SetNewPassword.module.scss";
import MainPic from "./icons/mainPic.svg"
import Logo from "./icons/logo.svg"
import Eye from "./icons/visibility.svg";
import CloseEye from "./icons/visibilityoff.svg"
import {Link} from "react-router-dom";

export default function SetNewPassword() {

    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    return (
        <div className={styles.ForgetPasswordContainer}>
            <div className={styles.header}>
                <img src={Logo} alt="Logo" />
                <div className={styles.title}>فراموشی رمز عبور</div>
            </div>
            <div className={styles.content}>
                <div>
                    <img src={MainPic} alt="" />
                </div>
                <form action="">

                    <div className={styles.form}>
                        <div className={styles.fields}>

                            <div className={styles.passwordField}>
                                <input
                                    className={styles.inputs}
                                    type={showNewPassword ? "text" : "password"}
                                    name="NewPass"
                                    id="NewPass"
                                    minLength={8}
                                    placeholder="رمز عبور جدید"
                                />
                                <span className={styles.eyeIcon} onClick={() => setShowNewPassword(!showNewPassword)}>
                                    <img
                                        src={!showNewPassword ? Eye : CloseEye}
                                        alt="showPass"
                                    />
                                </span>
                            </div>
                            <div className={styles.passwordField}>
                                <input
                                    className={styles.inputs}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="ReNewPass"
                                    id="ReNewPass"
                                    minLength={8}
                                    placeholder="تکرار رمز عبور جدید"
                                />
                                <span className={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <img
                                    src={!showConfirmPassword ? Eye : CloseEye}
                                    alt="showPass"
                                />
                            </span>
                            </div>

                        </div>
                        <div>
                            <Link className={styles.linkToVerifyEmail} to="/login">
                                <button className={styles.submitBtn}>
                                    ثبت
                                </button>
                            </Link>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    )
}