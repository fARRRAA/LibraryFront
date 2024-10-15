import { useEffect, useState } from 'react'
import './Books.css'
import { Button, CircularProgress, CssVarsProvider, Input, Option, Select, selectClasses } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { BookCard } from './BookCard/BookCard';
import { getGenres } from './getGenres';
import { getBooks, booksCount } from './getBooks';
export function Books() {
    const [books, setBooks] = useState();
    const [error, setError] = useState();
    const [token, setToken] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [genreSelect, setGenreSelect] = useState('');
    const [authorSelect, setAuthorSelect] = useState('');
    const [yearSelect, setYearSelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [searched, setSearched] = useState(false);
    const genres = getGenres().map(g => g.name);
    const authors = books && [...new Set(books.map(b => b.author))];
    const years = books && [...new Set(books.map(b => new Date(b.year).getFullYear()))];
    const booksCopy = books && structuredClone(books);
    let pageSize = 9;
    let allPages = Math.round((booksCount&& booksCount / pageSize) + 1);
    const allPagesArray =Array(allPages).fill(0).map((_, index) => index + 1);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };
    async function Filter() {
        let responce = await fetch(`https://localhost:7000/api/Books/getAllBooks?author=${authorSelect}&genre=${genreSelect}&year=${yearSelect}`);
        let data = await responce.json();
        setBooks(data.books);
    }
    async function Search() {
        let responce = await fetch(`https://localhost:7000/api/Books/getBooksByName/${nameSelect}`);
        let data = await responce.json();
        setBooks(data.books);
        setSearched(!searched);
    }
    function booksChange() {
        setSearched(!searched);
        let books = getBooks();
        setBooks(books);
        setNameSelect('');
    }
    async function changePage(page) {
        let books = await getBooks(page, pageSize);
        setBooks(books);
    }
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
            setToken(document.cookie);
        }
        GetBooks();
    }, []);
    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`}></div>
            <div className="books">
                <p className='books_title'>Список Книг</p>
                <div className="catalog_filter">
                    <div className={isOpen ? 'search hidden' : 'search'}>
                        <label htmlFor="select-category">Поиск:</label>
                        <CssVarsProvider>
                            <Input value={nameSelect} variant='soft' placeholder='Поиск' onChange={(e) => setNameSelect(e.target.value)} color="neutral" />
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Button variant='soft' onClick={Search}>Поиск</Button>
                        </CssVarsProvider>
                        {
                            searched &&
                            <CssVarsProvider>
                                <Button variant='solid' onClick={booksChange}>Отменить поиск</Button>
                            </CssVarsProvider>
                        }

                    </div>
                    <button onClick={toggleSidebar}>
                        <div className='filters_btn'>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.5 9.787H7.145M2.784 9.787H1M2.784 9.787C2.784 9.20883 3.01368 8.65434 3.42251 8.24551C3.83134 7.83668 4.38583 7.607 4.964 7.607C5.54217 7.607 6.09666 7.83668 6.50549 8.24551C6.91432 8.65434 7.144 9.20883 7.144 9.787C7.144 10.3652 6.91432 10.9197 6.50549 11.3285C6.09666 11.7373 5.54217 11.967 4.964 11.967C4.38583 11.967 3.83134 11.7373 3.42251 11.3285C3.01368 10.9197 2.784 10.3652 2.784 9.787ZM19.5 16.394H13.752M13.752 16.394C13.752 16.9723 13.5218 17.5274 13.1128 17.9363C12.7039 18.3453 12.1493 18.575 11.571 18.575C10.9928 18.575 10.4383 18.3443 10.0295 17.9355C9.62068 17.5267 9.391 16.9722 9.391 16.394M13.752 16.394C13.752 15.8157 13.5218 15.2616 13.1128 14.8527C12.7039 14.4437 12.1493 14.214 11.571 14.214C10.9928 14.214 10.4383 14.4437 10.0295 14.8525C9.62068 15.2613 9.391 15.8158 9.391 16.394M9.391 16.394H1M19.5 3.18H16.395M12.034 3.18H1M12.034 3.18C12.034 2.60183 12.2637 2.04734 12.6725 1.63851C13.0813 1.22968 13.6358 1 14.214 1C14.5003 1 14.7838 1.05639 15.0483 1.16594C15.3127 1.2755 15.5531 1.43608 15.7555 1.63851C15.9579 1.84094 16.1185 2.08126 16.2281 2.34575C16.3376 2.61024 16.394 2.89372 16.394 3.18C16.394 3.46628 16.3376 3.74976 16.2281 4.01425C16.1185 4.27874 15.9579 4.51906 15.7555 4.72149C15.5531 4.92392 15.3127 5.0845 15.0483 5.19406C14.7838 5.30361 14.5003 5.36 14.214 5.36C13.6358 5.36 13.0813 5.13032 12.6725 4.72149C12.2637 4.31266 12.034 3.75817 12.034 3.18Z" stroke="black" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" />
                            </svg>
                            <p>Фильтры</p>
                        </div>
                    </button>
                    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                        <button className='sidebar_close' onClick={toggleSidebar}>×</button>
                        <h2 className='filter_title'>Фильтры</h2>
                        <div className="sidebar_filters">
                            <CssVarsProvider>
                                <Select placeholder="Выберите категорию..." indicator={<KeyboardArrowDown />} sx={{ width: 310, [`& .${selectClasses.indicator}`]: { transition: '0.2s', [`&.${selectClasses.expanded}`]: { transform: 'rotate(-180deg)', }, }, }}>
                                    <Option value='Выберите категорию...' onClick={() => { setGenreSelect('') }}>Выберите категорию...</Option>
                                    {
                                        genres && genres.map(genre => {
                                            return <Option value={(genre)} onClick={() => { setGenreSelect(genre) }}>{genre}</Option>
                                        })
                                    }
                                </Select>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Select placeholder="Выберите автора..." indicator={<KeyboardArrowDown />} sx={{ width: 310, [`& .${selectClasses.indicator}`]: { transition: '0.2s', [`&.${selectClasses.expanded}`]: { transform: 'rotate(-180deg)', }, }, }}>
                                    <Option value='Выберите автора...' onClick={() => { setGenreSelect('') }}>Выберите автора...</Option>
                                    {
                                        authors && authors.map(author => {
                                            return <Option value={(author)} onClick={() => { setAuthorSelectSelect(author) }}>{author}</Option>
                                        })
                                    }
                                </Select>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Select placeholder="Выберите год..." indicator={<KeyboardArrowDown />} sx={{ width: 310, [`& .${selectClasses.indicator}`]: { transition: '0.2s', [`&.${selectClasses.expanded}`]: { transform: 'rotate(-180deg)', }, }, }}>
                                    <Option value='Выберите год...' onClick={() => { setYearSelectelect('') }}>Выберите год...</Option>
                                    {
                                        years && years.sort((a, b) => a - b).map(year => {
                                            return <Option value={(year)} onClick={() => { setYearsSelectSelect(year) }}>{year}</Option>
                                        })
                                    }
                                </Select>
                            </CssVarsProvider>
                            <CssVarsProvider>
                                <Button variant='soft' className='filter_btn' onClick={Filter}>Фильтровать</Button>
                            </CssVarsProvider>
                        </div>

                    </div>
                </div>
                {
                    books && Array.isArray(books) ?
                        <div className="books_wrapper">
                            {
                                books ? books.map(book => {
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
                        : <p>{books && books.length == 0 ? 'книг не найдено' : `Произошла ошибка: ${error && error.value}, код: ${error && error.statusCode}`}</p>
                }
                <div className="pagination">
                    <div className="pagination_wrapper">
                        {
                            allPagesArray.map(i => {
                                return (
                                    <div className="pagination_elem" onClick={() => changePage(i)}>{i}</div>

                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div >
        </>
    )
}