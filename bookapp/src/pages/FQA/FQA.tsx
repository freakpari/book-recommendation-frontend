import React from "react";
import styles from "./FQA.module.scss"
import Footer from "../../components/footer/footer"
import FQAContainer from "../../components/FQAContainer/FQAContainer";
import logo from "../../logo.svg";

export default function FAQ(){
    return (

        <div>
            <div className={styles.container}>

                <img src={logo} alt={"logo icon"} />

                <h3>سوالات متداول</h3>

                <FQAContainer />
            </div>
            <div>
                <Footer />
            </div>
        </div>

    );
}