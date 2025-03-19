import React from "react";
import styles from "./SearchNav.module.scss";
import menu from "./icons/menu.svg"
import user from "./icons/AliMohamadi.svg"
import logo from "./icons/logo.svg"
import searchIcon from "./icons/searchButton.svg"

export default function SearchNav (){
    return (
        <div className={styles.container}>

            <img className={styles.menu} src={menu} alt="menu" />

            <img className={styles.userIcon} src={user} alt="user icon" />

            <div className={styles.searchBar}>
                <input type="search" placeholder="جستجو" />
                <img src={searchIcon} alt="search button" />
            </div>

            <img className={styles.logoIcon} src={logo} alt="logo icon"/>

        </div>
    )
}