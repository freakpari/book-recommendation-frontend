import Styles from "./PopularBook.module.scss";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/footer/footer";
import Book1 from "./icon/kimiagar.svg";
import Book2 from "./icon/berda.svg";
import Book3 from "./icon/payambar.svg";

interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
}

const baseBooks: Book[] = [
    { id: 1, title: "کیمیاگر", author: "پائولو کوئیلو", image: Book1},
    { id: 2, title: " پیامبر ", author: " جبران خلیل جبران", image: Book3 },
    { id: 3, title: "بریدا", author: "پائولو کوئیلو", image: Book2 },
];
const books: Book[] = Array.from({ length: 18}, (_, i) => ({
    ...baseBooks[i % baseBooks.length],
    id: i + 1,
}));

export default function PopularBooks ()  {
    return (
        <>
    <SearchNav />
    <div className={Styles.popularbooks}>
        <h2>محبوب‌ترین‌ها</h2>
        <div className={Styles.bookgrid}>
        {books.map((book) => (
        <div key={book.id} className={Styles.bookitem}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
        </div>
        ))}
    </div>
        <button className={Styles.loadmore}>نمایش بیشتر</button>
    </div>
    <Footer />
    </>
);
};

