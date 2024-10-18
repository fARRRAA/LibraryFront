import b from './BookCard.module.css';
import { getGenres } from '../getGenres';
import { useAuth } from '../../../hooks/useAuth';
import { updateBook } from '../../AdminPage/actions/updateBook'
import { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { Button, CssVarsProvider, Option, Select, selectClasses } from '@mui/joy';
import { ToastContainer, toast } from "react-toastify";
import { getBooks } from '../getBooks';
import { deleteBook } from '../../AdminPage/actions/deleteBooks';


export function BookCard({book,setBooks}) {
    const currentUser = useAuth();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const changeBookObj = (e) => {
        setBookObj({ ...bookObj, [e.target.name]: e.target.value });
    }
    const [bookObj, setBookObj] = useState({
        Author: book.author,
        Id_Genre: book.id_Genre,
        Title: book.title,
        Description: book.description,
        Year: book.year
    });
    let genres = getGenres();
    let pageSize=9;
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getDate(date) {
        let data = new Date(date);
        const day = data.getDate();
        const year = data.getFullYear();
        const monthNames = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        const month = monthNames[data.getMonth()];
        const formattedDate = `${day} ${month} ${year} года`;
        return formattedDate;
    }

    return (
        <>
            <div className={b.card}>
                <p className={b.title}>Название: {book.title}</p>
                <p className={b.author}>Автор: {book.author}</p>
                <p className={b.genre}>Жанр: {book.genre.name} </p>
                <p className={b.description}>Описание: {book.description}</p>
                <p className={b.date}>{getDate(book.year)}</p>
                {
                    currentUser.role === "admin" &&
                    <div className={b.admin_btns} >
                        <div className={b.delete} onClick={()=>setOpenDelete(!openDelete)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.78571 14.8819V14.3614V1.79581V1.29581H2.28571H13.7143H14.2143V1.79581V14.3597L1.78571 14.8819ZM1.78571 14.8819C1.68736 14.7234 1.64286 14.552 1.64286 14.3614V1.79581V1.29581H1.14286H0.5V1.28123H4.57143H5.07143V0.78123V0.5H10.9286V0.78123V1.28123H11.4286H15.5V1.29581H14.8571H14.3571V1.79581V14.3614C14.3571 14.6839 14.2433 14.9384 13.9968 15.1577C13.7476 15.3794 13.4311 15.5005 13.0109 15.5H13.0103H2.98971C2.59144 15.5 2.27611 15.3797 2.01423 15.1472C1.95493 15.0946 1.90335 15.0407 1.85907 14.9854H1.97489L1.78571 14.8819ZM6.13771 4.32498V12.4562H5.99486V4.32498H6.13771ZM10.0051 4.32498V12.4562H9.86229V4.32498H10.0051Z" stroke="#0B6BCB" />
                            </svg>
                        </div>
                        <div className={b.update} onClick={() => setOpenUpdate(!openUpdate)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.58042 1.83917H2.68454C2.23777 1.83917 1.8093 2.01665 1.49339 2.33256C1.17748 2.64847 1 3.07694 1 3.52371V15.3155C1 15.7622 1.17748 16.1907 1.49339 16.5066C1.8093 16.8225 2.23777 17 2.68454 17H14.4763C14.9231 17 15.3515 16.8225 15.6674 16.5066C15.9834 16.1907 16.1608 15.7622 16.1608 15.3155V9.41959" stroke="#0B6BCB" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.9499 1.52332C14.285 1.18824 14.7394 1 15.2133 1C15.6872 1 16.1416 1.18824 16.4767 1.52332C16.8118 1.85839 17 2.31285 17 2.78672C17 3.26059 16.8118 3.71505 16.4767 4.05012L8.88535 11.6423C8.68535 11.8422 8.43828 11.9884 8.1669 12.0677L5.74706 12.7752C5.67458 12.7963 5.59776 12.7976 5.52462 12.7789C5.45149 12.7601 5.38474 12.7221 5.33136 12.6687C5.27797 12.6153 5.23992 12.5485 5.22118 12.4754C5.20245 12.4023 5.20371 12.3255 5.22485 12.253L5.93236 9.83314C6.01198 9.56197 6.15854 9.31519 6.35855 9.11553L13.9499 1.52332Z" stroke="#0B6BCB" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                }
                <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={openUpdate} onClose={() => setOpenUpdate(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Sheet variant="outlined" sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <div className={b.add_book}>
                            <p className={b.add_book_title}>Редактирование книги</p>
                            <form action="" name="addBook">
                                <CssVarsProvider>
                                    <Input type='text' name='Author' placeholder='Автор' value={bookObj.Author} onChange={changeBookObj} />
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
                                    <Input type='text' placeholder='Название' name='Title' value={bookObj.Title} onChange={changeBookObj} />
                                    <Input type="date" name="Year" id="" placeholder="date" value={formatDate(bookObj.Year)} onChange={changeBookObj} />
                                    <Input type='text' placeholder='Описание' name='Description' value={bookObj.Description} onChange={changeBookObj} />
                                    <Button variant='soft' onClick={async () =>{ await updateBook(book.id_Book, bookObj,setBooks,setOpenUpdate)}}>Редактировать </Button>
                                </CssVarsProvider>
                            </form>
                        </div>
                    </Sheet>
                </Modal>
                <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={openDelete} onClose={() => setOpenDelete(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Sheet variant="outlined" sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <div className={b.add_book}>
                            <p className={b.add_book_title}>Удаление книги</p>
                            <form action="" name="addBook">
                                <CssVarsProvider>
                                    <Button variant='soft' onClick={() =>{  deleteBook(book.id_Book,setBooks,setOpenDelete)}}>вы точно хотите удалить? </Button>
                                </CssVarsProvider>
                            </form>
                        </div>
                    </Sheet>
                </Modal>
            </div>
        </>
    )
}