import r from './Register.module.css'
import Input from '@mui/joy/Input';
import { CssVarsProvider } from '@mui/joy/styles';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { messageError, messageSuccess } from './messages.js';
export { messageSuccess, messageError, messageWarning } from './messages.js'
import 'react-toastify/dist/ReactToastify.css';

export function Register() {
    const [token, setToken] = useState('');
    // const [login, setLogin] = useState('');
    // const [password, setPassword] = useState('');
    // const [name,setName] = useState('');
    // const [dateBirth,setDateBirth] = useState(new Date());
    const navigate = useNavigate();
    const currentUser = useAuth();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: '',
        login: '',
        password: '',
        dateBirth: new Date()
    })

    const dataUpdate = (e) => { setData({ ...data, [e.target.name]: e.target.value }) };

    async function Register(e) {
        e.preventDefault();
        if (data.name.length === 0 || data.login.length === 0 || data.password.length === 0 || data.dateBirth.length === 0) {
            return messageError("fill in all fields");
        }
        if (new Date(data.dateBirth).getFullYear() == 0) {
            return messageError("fill normal date");
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://localhost:7000/registerReader', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // const formattedDate = (data.dateBirth instanceof Date) ? data.dateBirth.toISOString() : data.dateBirth;
        const temp = {
            name: data.name,
            date_Birth: data.dateBirth,
            login: data.login,
            password: data.password
        }
        xhr.send(JSON.stringify(temp));
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                messageSuccess("вы успешно зарегистрировались");
                let tokenValue = JSON.parse(xhr.responseText);
                document.cookie = `${tokenValue.token}`;
                setToken(tokenValue.token);
            } else {
                let { error } = JSON.parse(xhr.responseText);
                messageError(error.value);
            }
        };
        let responce = await fetch(`https://localhost:7000/userData/${document.cookie}`);
        if (responce.ok) {
            console.log('ok');
            let responceData = await responce.json();
            dispatch(setUser({
                id: responceData.user.id,
                role: responceData.user.role
            }));
            navigate("/");
        }
        else {
            messageError(responce.status)
        }
    };

    useEffect(() => {
        if (currentUser.id) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <ToastContainer />

            <div className={r.auth}>
                <p className={r.auth_title}>Регистрация</p>
                <div className={r.form}>
                    <form name="register" id='register'>
                        <CssVarsProvider>
                            <Input type="text" name="name" id="" placeholder="name" onChange={dataUpdate} />
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Input type="date" name="dateBirth" id="" placeholder="date birth" onChange={dataUpdate} />
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Input type="text" name="login" id="" placeholder="login" onChange={dataUpdate} />
                        </CssVarsProvider>
                        <CssVarsProvider>
                            <Input type="password" name="password" id="" placeholder="password" onChange={dataUpdate} />
                        </CssVarsProvider>

                        <CssVarsProvider>
                            <Button onClick={Register} type="submit">Войти</Button>
                        </CssVarsProvider>
                    </form>
                </div>
            </div>
        </>
    )
}