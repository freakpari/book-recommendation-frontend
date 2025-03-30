import React, { useState } from "react";
import styles from "./SearchNav.module.scss";
import menu from "./icons/menu.svg"
import user from "./icons/AliMohamadi.svg"
import logo from "./icons/logo.svg"
import searchIcon from "./icons/searchButton.svg"
import account from "./icons/account.svg";
import inbox from "./icons/Inbox.svg";
import pointer from "./icons/pointer.svg";
import explore from "./icons/explore.svg";
import signout from "./icons/Signout.svg";
import Book from "./icons/Book.svg";
import instagram from "./icons/Instagram.svg";
import linkdine from "./icons/linkdine.svg";


export default function SearchNav (){
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleLogout = () => {
        console.log("خروج انجام شد");
        setShowModal(false);
    };

    return (
        <div className={styles.container}>

            <img className={styles.menu} src={menu} alt="menu"   onClick={() => setIsOpen(!isOpen)}  />

            <img className={styles.userIcon} src={user} alt="user icon" />

            <div className={styles.searchBar}>
                <input type="search" placeholder="جستجو" />
                <img  src={searchIcon} alt="search button" />
            </div>

            <img className={styles.logoIcon} src={logo} alt="logo icon"/>
            <div className={`${styles.drawerMenu} ${isOpen ? styles.open : ""}`}>
        <ul>
            <li><img src={account} alt="account" />حساب کاربری  </li>
            <li><img src={inbox} alt="inbox"  /> صندوق ورودی </li>
            <li><img src={pointer} alt="pointer" />نتیجه تستMBTI</li>
            <li><img src={explore} alt="explore" />BookTalk</li>
            <li><img src={Book} alt="book" />لیست کتاب ها </li>
            <li onClick={() => setShowModal(true)}><img src={signout} alt="signout" />خروج از حساب کاربری</li>
            <div className={styles.icons} >
            <img  style={{height:"28px"}} src={linkdine} alt="linkdine" />
            <img style={{height:"32px"}} src={instagram} alt="instagram" />
            </div>
        </ul>
    </div>


    {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
    {showModal && (
        <div className={styles.modalOverlay}>
            <h3>واقعاً مطمئنی که می‌خوای بری؟</h3>
            <div className={styles.modalButtons}>
            <button className={styles.cancel} onClick={() => setShowModal(false)}>نه قطعا</button>
            <button className={styles.confirm} onClick={handleLogout}>آره بای</button>



        </div>
        </div>
        )}

        </div>
    )
}