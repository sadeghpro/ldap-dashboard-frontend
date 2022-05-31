import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import IResponse from '../../interfaces/IResponse';

export default function Login() {
    const [username, setUsername] = useState('');
    const [dn, setDn] = useState('');
    const txtPassword = useRef<HTMLInputElement>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setDn(`cn=${e.target.value},${process.env.REACT_APP_BASEDN}`);
    }

    const handleClick = () => {
        axios.request<IResponse<any>>({
            url: '/auth',
            method: 'POST',
            loading: true,
            data: {
                DN: dn,
                password: txtPassword.current!.value,
            }
        }).then(res => {
            if (res.data.status) {
                navigate('/', { state: { data: res.data.data } });
            } else {
                // TODO must show error message in dialog
            }
        }).catch(err => {

        })
    }

    return (
        <Card className="center">
            <CardContent className="flex flex-col space-y-6 p-4">
                <Typography className='text-center'>{t('app_name')}</Typography>
                <TextField size="small" label={t('username')} fullWidth value={username} onChange={handleChangeUsername}/>
                <TextField size="small" label={t('DN')} fullWidth value={dn}/>
                <TextField size="small" label={t('password')} fullWidth inputRef={txtPassword} type="password"/>
                <Button variant="contained" onClick={handleClick}>{t('signin')}</Button>
            </CardContent>
        </Card>
    )
}
