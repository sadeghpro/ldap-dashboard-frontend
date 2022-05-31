import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import IResponse from '../../interfaces/IResponse'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Home() {
    const [open, setOpen] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { t } = useTranslation()
    const txtPassword = useRef<HTMLInputElement>();

    useEffect(() => {
        axios.request<IResponse<any>>({
            url: '/'
        }).then(res => {
            if (res.data.status) {

            }
        }).catch(err => {

        })
    }, [])

    const handleClickChangePassowrd = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const handleSavePassword = () => {
        handleClose();
        axios.request<IResponse<any>>({
            url: "/auth/change",
            method: "POST",
            loading: true,
            data: {
                password: txtPassword.current!.value
            }
        }).then(res => {

        }).catch(err => {

        })
    }

    return (
        <div className="p-4">
            <Typography>{t('welcome')}</Typography>
            <br/>
            <Button variant='outlined' onClick={handleClickChangePassowrd}>{t('change_password')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('change_password')}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-4">{t('change_password_description')}</DialogContentText>
                    <FormControl size="small">
                        <InputLabel htmlFor="password">{t('password')}</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            inputRef={txtPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>{t('cancel')}</Button>
                    <Button variant='contained' onClick={handleSavePassword}>{t('save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
