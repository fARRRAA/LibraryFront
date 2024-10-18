import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
export function Header() {
    const currentUser = useAuth();
    const dispatch = useDispatch();
    let navigate= useNavigate();
    const LogOut=()=>{
        dispatch(removeUser());
        navigate("/");
    }
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
                    <Link to={currentUser.id? '/profile' : 'login'}>
                    <p className="nav_item">Профиль</p>
                    </Link>
                    <Link to={!currentUser.id&& '/login'}>
                    <p className="nav_item" onClick={currentUser.id&&LogOut}>{currentUser.id?'Выйти':'Войти'}</p>
                    </Link>
                    <Link to={currentUser.role==="user"?'/signup':'/admin'}>
                    <p className="nav_item">{currentUser.id? 'Админ панель':'Зарегистрироваться'}</p>
                    </Link>
                    <p className="nav_item">{currentUser.id&&currentUser.id}</p>
                </nav>
            </div>
        </>
    )
}