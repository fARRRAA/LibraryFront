import './BookCard.css'
import { getGenres } from '../getGenres';

export function BookCard(book) {
    const allGenres = getGenres();
    console.log(allGenres)
    function getGenreName(id) {
        const genre = allGenres && allGenres.find(g => g.id_Genre === id);
        const name = genre.name;
        return name;
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
            <div className="book_card">
                <p className="book_title">Название: {book.title}</p>
                <p className="book_author">Автор: {book.author}</p>
                <p className="book_genre">Жанр: {book.id_Genre} </p>
                <p className="book_description">Описание: {book.description}</p>
                <p className="book_date">{getDate(book.year)}</p>
            </div>
        </>
    )
}