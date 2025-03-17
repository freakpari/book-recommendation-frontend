import React from "react";
import styles from "./SearchNav.module.scss";
import menu from "./icons/menu.svg"
import user from "../SideProfile/icons/AliMohamadi.svg"
import logo from "./icons/logo.svg"
import searchIcon from "./icons/searchButton.svg"

export default function searchNav (){
    return (
        <div className={styles.container}>

            <div className={styles.menu}>
                <img src={menu} alt="menu" />
            </div>

            <div className={styles.userIcon}>
                <img src={user} alt="user icon" />
            </div>

            <div className={styles.searchBar}>
                <input type="search" placeholder="جستجو" />
                <img src={searchIcon} alt="search button" />
            </div>

            <div className={styles.logoIcon}>
                <img  src={logo} alt="logo icon"/>
            </div>

        </div>
    )
}