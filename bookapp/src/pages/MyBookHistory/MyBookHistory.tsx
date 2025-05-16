import React, {useEffect} from 'react';
import styles from './MyBookHistory.module.scss';
import Footer from '../../components/Footer/Footer';
import SideProfile from "../../components/SideProfile/SideProfile";
import SearchNav from "../../components/SearchNav/SearchNav";
import BlackHourse from "./icons/blackHourse.svg"
import eventEmitter from "../../utils/eventEmitter";

export default function MyBookHistory() {

    useEffect(() => {
        eventEmitter.emit();
    }, []);

    return (
        <div className={styles.container}>
            <SearchNav />

            <div className={styles.historySide}>
                <SideProfile />
                <div className={styles.MyBookHistory}>

                    <h1 className={styles.header}>تاریخچه کتاب‌های من</h1>

                    <div className={styles.scrollbar}>
                        <div className={styles.myBookCards}>
                            <button className={styles.bookCard}>
                                <img src={BlackHourse} alt="Black Hourse" />
                                <h4>اسب سیاه</h4>
                                <p>تاد رز واگی راس</p>
                            </button>
                            <button className={styles.bookCard}>
                                <img src={BlackHourse} alt="Black Hourse" />
                                <h4>اسب سیاه</h4>
                                <p>تاد رز واگی راس</p>
                            </button>
                            <button className={styles.bookCard}>
                                <img src={BlackHourse} alt="Black Hourse" />
                                <h4>اسب سیاه</h4>
                                <p>تاد رز واگی راس</p>
                            </button>
                            <button className={styles.bookCard}>
                                <img src={BlackHourse} alt="Black Hourse" />
                                <h4>اسب سیاه</h4>
                                <p>تاد رز واگی راس</p>
                            </button>
                            <button className={styles.bookCard}>
                                <img src={BlackHourse} alt="Black Hourse" />
                                <h4>اسب سیاه</h4>
                                <p>تاد رز واگی راس</p>
                            </button>
                            <button className={styles.bookCard}>
                                <img src={BlackHourse} alt="Black Hourse" />
                                <h4>اسب سیاه</h4>
                                <p>تاد رز واگی راس</p>
                            </button>
                        </div>
                    </div>

                </div>

            </div>


            <div>
                <Footer />
            </div>

        </div>
    )
}