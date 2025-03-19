import React from "react";
import styles from "./EditProfile.module.scss";
import Footer from "../../components/Footer/footer"
import SideProfile from "../../components/SideProfile/SideProfile"
import SearchNav from "../../components/SearchNav/SearchNav"

export default function EditProfile() {
    return (
        <div className={styles.container}>
            <SearchNav />

            <div className={styles.update}>

                <form action="">

                    <input className={styles.userName} type="text"/>
                    <input className={styles.userEmail} type="email"/>
                    {/*<br/>*/}
                    <input className={styles.fName} type="text"/>
                    <label htmlFor="day"></label>
                    <select className={styles.dayOfBirth} id="day" name="day">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14" selected={true}>14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                    </select>
                    <label htmlFor="month"></label>
                    <select className={styles.monthOfBirth} id="month" name="month">
                        <option value="1">فروردین</option>
                        <option value="2">اردیبهشت</option>
                        <option value="3">خرداد</option>
                        <option value="4">تیر</option>
                        <option value="5" selected={true}>مرداد</option>
                        <option value="6">شهریور</option>
                        <option value="7">مهر</option>
                        <option value="8">آبان</option>
                        <option value="9">آذر</option>
                        <option value="10">دی</option>
                        <option value="11">بهمن</option>
                        <option value="12">اسفند</option>
                    </select>
                    <label htmlFor="year"></label>
                    <select className={styles.yearOfBirth} id="year" name="year">
                        <option value="1383">1383</option>
                        <option value="1382">1382</option>
                        <option value="1381">1381</option>
                    </select>
                    <br/>
                    <input type="text"/>
                    <input type="password"/>
                    <br/>
                    <input type="text"/>
                    <button type="submit">تغییر رمزعبور</button>
                    <label htmlFor="gender"></label>
                    <select id="gender" name="gender">
                        <option value="man">مرد</option>
                        <option value="woman">زن</option>
                        <option value="null">جنسیت</option>
                    </select>
                </form>
            </div>

            <SideProfile/>

            <div>
                <Footer/>
            </div>

        </div>
    )
}