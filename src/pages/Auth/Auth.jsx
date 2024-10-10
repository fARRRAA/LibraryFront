import { useState } from 'react';
import './Auth.css'
import Input from '@mui/joy/Input';
import { CssVarsProvider } from '@mui/joy/styles';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
export function Login() {
    const [token, setToken] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function Login(e) {
        if (login.length < 1 || password.length < 1) {
            return alert('fill in all fields');
        }
        e.preventDefault();
        const request = await fetch(`https://localhost:7000/loginReader?login=${login}&password=${password}`);
        const data = await request.json();
        document.cookie=`token=${data.token}`;
        
        navigate("/");
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
        </>
    )
}

