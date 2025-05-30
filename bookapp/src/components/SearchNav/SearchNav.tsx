import  {useRef, useEffect, useState,useCallback  } from "react";
import styles from "./SearchNav.module.scss";
import menu from "./icons/menu.svg";
import user from "./icons/defaultUser.svg";
import logo from "./icons/logo.svg";
import searchIcon from "./icons/searchButton.svg";
import account from "./icons/account.svg";
import inbox from "./icons/Inbox.svg";
import pointer from "./icons/pointer.svg";
import explore from "./icons/explore.svg";
import signout from "./icons/Signout.svg";
import Book1 from "./icons/Book.svg";
import logout from "./icons/logout.svg";
import instagram from "./icons/Instagram.svg";
import linkdine from "./icons/linkdine.svg";
import {href, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import eventEmitter from "../../utils/eventEmitter";

interface Book {
  id: string;
  title: string;
  firstname?: string;
  lastname?: string;
    image?: string;
}

export default function SearchNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setShowModal(false);
    };
    const handleSearch = useCallback(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
    
      setIsSearching(true);
      try {
        const url = `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/searchurl?query=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json();
    
        const filtered = (data.bookData || []).filter(
          (book: any) =>
            book.title.trim().toLowerCase().includes(query.trim().toLowerCase())
        ).slice(0, 5);
        
    
        setResults(filtered);
      } catch (error) {
        console.error("خطا در دریافت نتایج:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, [query]);
    
  
      useEffect(() => {
      if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
      }
  
      debounceTimeout.current = setTimeout(() => {
        if (query.trim()) {
          handleSearch();
        } else {
          setResults([]);
        }
      }, 300); 
  
      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }, [query]);
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    }

    const [hasToken, setHasToken] = useState<boolean>();
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        } else setHasToken(true);

        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("دسترسی غیرمجاز");
                return;
            }
            try {
                const response = await axios.get(
                    "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePicToken", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: "blob"

                    });
                const imageBlob = response.data;
                const imageURL = URL.createObjectURL(imageBlob);

                console.log(response);
                setProfileImage(imageURL);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    console.error("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.");
                }
                else {
                    console.error("خطا در دریافت پروفایل کاربر");
                }
            }
        }

        fetchUserProfile();
        const unsubscribe = eventEmitter.subscribe(fetchUserProfile);

        return () => {
            unsubscribe();
        };

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.searchNavigasion}>
                <img
                    className={styles.menu}
                    src={menu}
                    alt="menu"
                    onClick={() => setIsOpen(!isOpen)}
                />

                {hasToken ? (
                    <Link className={styles.linkToProfile} to="/editProfile">
                        <img className={styles.userIcon} src={profileImage || user} alt="" onClick={() => href("/editProfile")} />
                    </Link>
                ) : (
                    <Link className={styles.loginLink} to="/login">
                        ورود | ثبت‌نام
                    </Link>
                )}

                <div className={styles.searchBar}>
                    <input type="search" placeholder="جستجو"
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           onKeyDown={handleKeyDown}/>

                    <img src={searchIcon} alt="search button"
                         onClick={handleSearch}
                         style={{ cursor: "pointer" }} />

                    {isSearching && (
                        <div className={styles.searchResults}></div>
                    )}

                    {!isSearching && results.length > 0 && (
                        <div className={styles.searchResults}>
                            {results.map((book, index) => (
                                <div
                                    key={index}
                                    className={styles.resultItem}
                                    onClick={() => navigate(`/book/${book.id}`)}
                                >
                                    <img
                                        className={styles.bookcover}
                                        src={book.image }
                                        alt={book.title}
                                    />

                                    <div className={styles.bookdetail}>
                                        <p className={styles.bookTitle}>{book.title}</p>
                                        <p className={styles.bookAuthor}>
                                            {book.firstname && book.lastname
                                                ? `${book.firstname} ${book.lastname}`
                                                : "نویسنده نامشخص"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isSearching && query && results.length === 0 && (
                        <div className={styles.searchResults}>
                            <p>نتیجه‌ای یافت نشد</p>
                        </div>
                    )}
                </div>

                <Link to="/Homepage" >
                    <img className={styles.logoIcon} src={logo} alt="logo icon"/>
                </Link>

            </div>



            <div className={`${styles.drawerMenu} ${isOpen ? styles.open : ""}`}>
                <ul>
                    <li onClick={() => navigate('/editprofile')} ><img src={account} alt="account" />حساب کاربری</li>
                    <li><img src={inbox} alt="inbox" />صندوق ورودی</li>
                    <li><img src={pointer} alt="pointer" />نتیجه تست MBTI</li>
                    <li><img src={explore} alt="explore" />BookTalk</li>
                    <li><img src={Book1} alt="book" />لیست کتاب ها</li>
                    <li onClick={() => setShowModal(true)}>
                        <img src={signout} alt="signout" />خروج از حساب کاربری
                    </li>
                    <div className={styles.icons}>
                        <img style={{height:"28px"}} src={linkdine} alt="linkdine" />
                        <img style={{height:"32px"}} src={instagram} alt="instagram" />
                    </div>
                </ul>
            </div>

            {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <img src={logout} alt="logout"  />
                        <h3>واقعاً مطمئنی که می‌خوای بری؟</h3>
                        <div className={styles.modalButtons}>
                            <button
                                className={styles.confirm}
                                onClick={handleLogout}
                            >
                                آره بای
                            </button>
                            <button
                                className={styles.cancel}
                                onClick={() => setShowModal(false)}
                            >
                                نه فعلا
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}