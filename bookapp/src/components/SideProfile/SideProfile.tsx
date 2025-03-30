import React from "react";
import styles from "./SideProfile.module.scss";
import pencil from "./icons/Pencil.svg"
import heart from "./icons/Heart.svg"
import history from "./icons/History.svg"
import list from "./icons/list.svg"
import user from "./icons/AliMohamadi.svg"
import editPen from "./icons/editPen.svg"

export default function SideProfile () {
    return (
        <div className={styles.container}>

            <div className={styles.head}>
                <button>
                    <img src={editPen} alt="edit profile"/>
                </button>
                <img src={user} alt="user image" />

                <h2>علی محمدی</h2>
                <h6>یه عاشق کتاب که مهندسه</h6>
            </div>

            <div className={styles.options}>
                <button>
                    <img src={pencil} alt="pencil logo" />
                    <p>ویرایش حساب کاربری</p>
                </button>
                <hr className={styles.hr}/>
                <button>
                    <img src={heart} alt="heart logo" />
                    <p>مورد علاقه‌ها</p>
                </button>
                <hr className={styles.hr}/>
                <button>
                    <img src={history} alt="history logo" />
                    <p>تاریخچه</p>
                </button>
                <hr className={styles.hr}/>
                <button>
                    <img src={list} alt="list logo" />
                    <p>لیست کتاب ها</p>
                </button>

            </div>
        </div>
    )
}