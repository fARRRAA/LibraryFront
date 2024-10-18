import a from './Admin.module.css'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { getBooks, booksCount, getAllBooks } from '../Books/getBooks';
import { useEffect, useState } from 'react';
import { Button, CircularProgress, CssVarsProvider, Option, Select, selectClasses } from '@mui/joy';
import { BookCard } from '../Books/BookCard/BookCard';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { getGenres } from '../Books/getGenres';
import { Css, KeyboardArrowDown, Label } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import { addNewBook } from './actions/addNewBook.js';
export { messageSuccess, messageError, messageWarning } from '../../messages.js'

export function Admin() {
    const [books, setBooks] = useState();
    const [error, setError] = useState();
    const [openAdd, setOpenAdd] = useState(false);
    const [genreSelect, setGenreSelect] = useState(0);
    const [token,setToken]=useState('');
    const [bookObj, setBookObj] = useState({
        Author: '',
        Id_Genre: 0,
        Title: '',
        Description: '',
        Year: new Date()
    });
    let genres = getGenres();
    let pageSize = 9;
    let allPages = Math.round((booksCount && booksCount / pageSize));
    const allPagesArray = Array(allPages).fill(0).map((_, index) => index + 1);
    let navigate = useNavigate();
    const currentUser = useAuth();

    useEffect(() => {
        if (currentUser.role == "user") {
            navigate("/");
        }
    }, [currentUser]);

    const messageError = (error) => {
        toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            draggable: true
        });
    };
    const messageWarning = (error) => {
        toast.warning(error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            draggable: true
        });
    };
    const messageSuccess = (error) => {
        toast.success(error, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            draggable: true
        });
    };

    const changeBookObj = (e) => {
        setBookObj({ ...bookObj, [e.target.name]: e.target.value });
    }
    // useEffect(() => {
    //     console.log("Книги обновлены:", books);
    // }, [books]);
    useEffect(() => {
        async function GetBooks() {
            let responce = await fetch(`https://localhost:7000/api/Books/getAllBooks?page=1&pageSize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Authorization": document.cookie
                }
            });
            if (responce.status >= 200 && responce.status <= 300) {
                let data = await responce.json();
                setBooks(data.books);
            }
            else {
                setError(data.error);
            }
        }
        setToken(document.cookie);
        GetBooks();
    }, []);

    async function changePage(page) {
        let books = await getBooks(page, pageSize);
        setBooks(books);
    }

    return (
        <>
            <div className={a.admin_panel}>
                <p className={a.admin_title}>Админ Панель</p>
                <div className={a.admin_wrapper}>
                    <Tabs
                        aria-label="Vertical tabs"
                        orientation="vertical"
                        sx={{ minWidth: 300, height: 160 }}
                    >
                        <TabList>
                            <Tab variant='outlined'>Книги</Tab>
                            <Tab variant='outlined'>Пользователи</Tab>
                            <Tab variant='outlined'>Жанры</Tab>
                            <Tab variant='outlined'>Аренды</Tab>
                            <Tab variant='outlined'>Экземпляры</Tab>
                        </TabList>
                        <TabPanel value={0}>
                            <div className={a.tabs_books}>
                                <p className={a.books_title}>Все книги</p>
                                <Button onClick={() => setOpenAdd(true)}>Добавить книгу</Button>
                                <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={openAdd} onClose={() => setOpenAdd(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Sheet variant="outlined" sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                                        <ModalClose variant="plain" sx={{ m: 1 }} />
                                        <div className={a.add_book}>
                                            <p className={a.add_book_title}>Добавление книги</p>
                                            <form action="" name="addBook">
                                                <CssVarsProvider>
                                                    <Input type='text' name='Author' placeholder='Автор' onChange={changeBookObj} />
                                                </CssVarsProvider>
                                                <select name="Id_Genre" onChange={changeBookObj}>
                                                    <option disabled value="Выберите категорию" >Выберите категорию</option>
                                                    {
                                                        genres && genres.map(genre => {
                                                            return <option value={genre.id_Genre}>{genre.name}</option>
                                                        })
                                                    }
                                                </select>
                                                <CssVarsProvider>
                                                    <Input type='text' placeholder='Название' name='Title' onChange={changeBookObj} />
                                                    <Input type="date" name="Year" id="" placeholder="date" onChange={changeBookObj} />
                                                    <Input type='text' placeholder='Описание' name='Description' onChange={changeBookObj} />
                                                    <Button variant='soft' onClick={()=>addNewBook(bookObj,setBooks,setOpenAdd)}>Добавить </Button>
                                                </CssVarsProvider>
                                            </form>
                                        </div>
                                    </Sheet>
                                </Modal>
                                <div className={a.allbooks_wrapper}>
                                    {
                                        books && Array.isArray(books) ?
                                            <div className="books_wrapper">
                                                {
                                                    books ? books.map(book => {
                                                        return (
                                                            <BookCard book={book} setBooks={setBooks} key={book.id_Book} />
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
                                            : <p>{books && books.length == 0 ? 'книг не найдено' : `Произошла ошибка: ${error && error.value}, код: ${error && error.statusCode}`}</p>
                                    }
                                </div>
                                <div className={a.pagination}>
                                    <div className={a.pagination_wrapper}>
                                        {
                                            allPagesArray.map(i => {
                                                return (
                                                    <div className={a.pagination_elem} onClick={() => changePage(i)}>{i}</div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={1}>
                        </TabPanel>
                        <TabPanel value={2}>
                        </TabPanel>
                        <TabPanel value={3}>
                        </TabPanel>
                        <TabPanel value={4}>
                        </TabPanel>
                    </Tabs>
                </div>
                <ToastContainer/>
            </div>
        </>)
}