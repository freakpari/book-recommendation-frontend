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








//
// import React from "react";
// import styles from "./SideProfile.module.scss";
//
// const UserProfile: React.FC = () => {
//     return (
//         <div className={styles.profileContainer}>
//             <div className={styles.profileHeader}>
//                 <div className={styles.profilePicture}>
//                     <img src={user} alt="علی محمدی" />
//                     <div className={styles.editIcon}>
//                         <i className="fas fa-pencil-alt"></i>
//                     </div>
//                 </div>
//                 <h2 className={styles.profileName}>علی محمدی</h2>
//                 <p className={styles.profileBio}>یه عاشق کتاب که مهندسه</p>
//             </div>
//
//             <div className={styles.profileOptions}>
//                 <div className={styles.option}>
//                     <i className="fas fa-edit"></i>
//                     <span>ویرایش حساب کاربری</span>
//                 </div>
//                 <div className={styles.option}>
//                     <i className="fas fa-heart"></i>
//                     <span>مورد علاقه‌ها</span>
//                 </div>
//                 <div className={styles.option}>
//                     <i className="fas fa-history"></i>
//                     <span>تاریخچه</span>
//                 </div>
//                 <div className={styles.option}>
//                     <i className="fas fa-book"></i>
//                     <span>لیست کتاب</span>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default UserProfile;
