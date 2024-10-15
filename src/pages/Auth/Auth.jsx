import { useEffect, useState } from 'react';
import './Auth.css'
import Input from '@mui/joy/Input';
import { CssVarsProvider } from '@mui/joy/styles';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { messageError, messageSuccess } from '../Register/messages';
import { ToastContainer } from "react-toastify";


export function Login() {
    const [token, setToken] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const currentUser = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser.id) {
            navigate("/");
        }
    }, [])
    async function Login(e) {
        e.preventDefault();
        if (login.length < 1 || password.length < 1) {
            return messageError("fill in all fields");
        }
        let request = await fetch(`https://localhost:7000/loginReader?login=${login}&password=${password}`);
        if (request.status >= 200 && request.status <= 300) {
            let data = await request.json();
            document.cookie = `${data.token}`;
            request = await fetch(`https://localhost:7000/userData/${document.cookie}`);
            data = await request.json();
            dispatch(setUser({
                id: data.user.id,
                role: data.user.role
            }));
            messageSuccess('Добро пожаловать');
            navigate("/");
        }
        else {
            let  data  = await request.json();
            let {error} = data;
            messageError(error.value);
        }
    }
    return (
        <>
            <div className="auth">
                <p className='auth_title'>Вход</p>
                <div className='auth_form'>
                    <form name="login" id='login'>
                        <CssVarsProvider>
                            <Input type="text" name="login" id="" placeholder="login" onChange={(e) => { setLogin(e.target.value) }} />
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Input type="text" name="password" id="" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Button onClick={Login} type="submit">Войти</Button>
                        </CssVarsProvider>
                    </form>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}

