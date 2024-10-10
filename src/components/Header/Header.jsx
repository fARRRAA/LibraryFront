import { Link } from 'react-router-dom'
import './Header.css'
export function Header() {
    return (
        <>
            <div className="header">
                <Link to="/"><p className="header_logo">Library322</p></Link>
                <nav className="header_nav">
                    <Link to="/">
                    <p className="nav_item">Главная</p>
                    </Link>
                    <Link to='/books'>
                    <p className="nav_item">Книги</p>
                    </Link>
                    <Link>
                    <p className="nav_item">Профиль</p>
                    </Link>
                    <Link to="/login">
                    <p className="nav_item">Войти</p>
                    </Link>
                    <Link>
                    <p className="nav_item">Зарегистрироваться</p>
                    </Link>
                </nav>
            </div>
        </>
    )
}