import b from './BookCard.module.css';
import { getGenres } from '../getGenres';

export function BookCard(book) {
    // const allGenres = getGenres();
    // console.log(allGenres)
    // function getGenreName(id) {
    //     const genre = allGenres && allGenres.find(g => g.id_Genre === id);
    //     const name = genre.name;
    //     return name;
    // }
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
            </div>
        </>
    )
}