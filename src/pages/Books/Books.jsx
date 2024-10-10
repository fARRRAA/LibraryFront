import { useEffect, useState } from 'react'
import './Books.css'
import { CircularProgress, CssVarsProvider } from '@mui/joy';
import { BookCard } from './BookCard/BookCard';
export function Books() {
    const [books, setBooks] = useState([]);
    const [token, setToken] = useState('');
    
    useEffect(() => {
        async function GetBooks() {
            let responce = await fetch("https://localhost:7000/api/Books/getAllBooks", {
                method: "GET",
                authorization: document.cookie
            });
            let data = await responce.json();
            setBooks(data.books);
            setToken(document.cookie);
        }
        GetBooks();
    }, []);
    books&& console.log(books)
    return (
        <>
            <div className="books">
                <p className='books_title'>Список Книг</p>
                <div className="books_wrapper">
                    {
                    books.length>0 ? books.map(book => {
                        return (
                            <BookCard {...book} key={book.id_Book} />
                        )
                    })
                        :
                        <div className="">
                            <CssVarsProvider>
                                <CircularProgress color='success' />
                            </CssVarsProvider>
                            <br />
                            <p style={{ marginTop: 15 }}>загрузка данных...</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}