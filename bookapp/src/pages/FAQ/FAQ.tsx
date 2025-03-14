import React from "react";
import styles from "./FAQ.module.scss"
import Footer from "../../components/footer/footer"
import FAQContainer from "../../components/FAQContainer/FAQContainer";
import logo from "../../logo.svg";

export default function FAQ(){
    return (

        <div>
            <div className={styles.container}>

                <img src={logo} alt={"logo icon"} />

                <h3>سوالات متداول</h3>

                <FAQContainer />
            </div>
            <div>
                <Footer />
            </div>
        </div>

    );
}