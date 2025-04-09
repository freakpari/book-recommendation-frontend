import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./PopularBook.module.scss"; 
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import not from "./icon/not.png";

interface Book {
  bookid: string;
  title: string;
  author: string;
  avgrate: number;
  imageUrl: string;
}

export default function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchBookImage = async (bookid: string) => {
    try {
      const response = await axios.get(
        `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${bookid}`,
        { responseType: 'blob' } 
      );

      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(response.data); 
        return imageUrl;
      }
    } catch (error) {
      console.error("Error fetching book image:", error);
    }
    return not; 
  };

  const fetchPopularBooks = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/popularBooks`,
        {
          params: { pagenum: page }
        }
      );

      if (response.status === 200) {
        const fetchedBooks = await Promise.all(
          response.data.map(async (book: Book) => {
            const imageUrl = await fetchBookImage(book.bookid); 
            return { ...book, imageUrl };
          })
        );
        if (fetchedBooks.length > 0) {
          setBooks((prevBooks) => [...prevBooks, ...fetchedBooks]);
        } else {
          setHasMore(false); 
        }
      }
    } catch (error) {
      console.error("Error fetching popular books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularBooks(pageNum);
  }, [pageNum]);

  const loadMoreBooks = () => {
    if (!loading && hasMore) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  return (
    <>
      <SearchNav />
      <div className={Styles.popularbooks}>
        <h2>محبوب‌ترین‌ها</h2>
        <div className={Styles.bookgrid}>
          {books.slice(0, 20).map((book) => (
            <div key={book.bookid} className={Styles.bookitem}>
              
              <img src={book.imageUrl || not} alt={book.title} /> 
              <div className={Styles.booktext} >
              <h3>{book.title}</h3>
              <p className={Styles.para}>{book.author}</p>
              <p className={Styles.avgrate}>امتیاز: {book.avgrate}</p> 
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <button className={Styles.loadmore} onClick={loadMoreBooks} disabled={loading}>
            {loading ? "در حال بارگذاری..." : "نمایش بیشتر"}
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
