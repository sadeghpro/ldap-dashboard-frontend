import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import IErrorResponse from '../../interfaces/IErrorResponse';
import IResponse from '../../interfaces/IResponse';

export default function Login() {
    const [username, setUsername] = useState('');
    const [dn, setDn] = useState('');
    const [error, setError] = useState<IErrorResponse>({ code: 0, message: '' });
    const txtPassword = useRef<HTMLInputElement>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleCloseDialog = () => {
        setError({ code: 0, message: error.message });
    }

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setDn(`cn=${e.target.value},${process.env.REACT_APP_BASEDN}`);
    }

    const handleChangeDN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDn(e.target.value);
    }

    const handleClick = () => {
        axios.request<IResponse<any>>({
            url: '/auth',
            method: 'POST',
            loading: true,
            data: {
                DN: dn,
                CN: username,
                password: txtPassword.current!.value,
            }
        }).then(res => {
            if (res.data.status) {
                navigate('/', { state: { data: res.data.data } });
            } else {
                setError(res.data.error!);
            }
        }).catch(err => {

        })
    }

    return (
        <Card className="center">
            <CardContent className="flex flex-col space-y-6 p-4">
                <Typography className='text-center'>{t('app_name')}</Typography>
                <TextField size="small" label={t('username')} fullWidth value={username} onChange={handleChangeUsername} />
                <TextField size="small" label={t('DN')} fullWidth value={dn} onChange={handleChangeDN} />
                <TextField size="small" label={t('password')} fullWidth inputRef={txtPassword} type="password" />
                <Button variant="contained" onClick={handleClick}>{t('signin')}</Button>
            </CardContent>
            <Dialog open={error.code > 0} onClose={handleCloseDialog}>
                <DialogTitle>{t('error_code')} {error.code}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>{t('close')}</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}
