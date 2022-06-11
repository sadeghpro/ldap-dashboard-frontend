import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, CardContent, Typography, Grid, CardActions, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import IResponse from '../../interfaces/IResponse';
import IUser from '../../interfaces/IUser';


export default function Profile() {
    const [showPass, setShowPass] = useState(false);
    const [photo, setPhoto] = useState<File>();
    const [profile, setProfile] = useState<IUser>({} as IUser);
    const { t } = useTranslation()
    const txtPassword = useRef<HTMLInputElement>();
    const txtSN = useRef<HTMLInputElement>();
    const txtMail = useRef<HTMLInputElement>();
    const txtMobile = useRef<HTMLInputElement>();
    const inputFile = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        axios.request<IResponse<IUser>>({
            url: '/profile',
            loading: true,
        }).then(res => {
            if (res.data.status) {
                setProfile(res.data.data);
            }
        }).catch(err => {

        })
    }, [])

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const handleSavePassword = () => {
        axios.request<IResponse<any>>({
            url: "/auth/change",
            method: "POST",
            loading: true,
            data: {
                password: txtPassword.current!.value
            }
        }).then(res => {
            if (res.data.status) {
                txtPassword.current!.value = '';
            }
        }).catch(err => {

        })
    }

    const handleSaveProfile = () => {
        axios.request<IResponse<IUser>>({
            url: '/profile',
            method: 'POST',
            loading: true,
            data: {
                sn: txtSN.current!.value,
                mail: txtMail.current!.value,
                mobile: txtMobile.current!.value,
            }
        }).then(res => {

        }).catch(err => {

        })
    }

    const handleSaveImage = () => {
        let reader = new FileReader();
        reader.readAsDataURL(photo!);

        reader.onload = (e) => {
            const image = (e.target!.result as string).replace('data:image/jpeg;base64,', '');
            axios.request<IResponse<boolean>>({
                url: '/profile/photo',
                method: 'POST',
                loading: true,
                data: {
                    photo: image
                }
            }).then(res => {
                if (res.data.status) {
                    setProfile({...profile, jpegPhoto: image})
                }
            }).catch(err => {
    
            })
        }

    }

    const handleChoosePhoto = () => {
        inputFile.current!.click();
    }

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files![0].size > 20480000) {
            // TODO show snackbar
        } else if (!["image/png", "image/jpeg", "image/webp"].includes(event.target.files![0].type)) {
            // TODO show snackbar
        } else {
            setPhoto(event.target.files![0])
        }
    }

    return (
        <>
            <Grid container spacing={2} className='p-3'>
                <Grid item xs={12}>
                    <Card>
                        <CardContent className='flex flex-col space-y-3'>
                            <Typography className='text-lg font-bold'>{t('profile')}</Typography>
                            {
                                profile.cn ?
                                    <>
                                        <TextField size='small' inputRef={txtSN} label={t('name')} defaultValue={profile.sn} />
                                        <TextField size='small' label={t('username')} disabled defaultValue={profile.cn} />
                                        <TextField size='small' inputRef={txtMail} label={t('mail')} defaultValue={profile.mail} />
                                        <TextField size='small' inputRef={txtMobile} label={t('phone')} defaultValue={profile.mobile} />
                                    </>
                                    :
                                    <>
                                        {/* TODO add skelton */}
                                    </>
                            }
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={handleSaveProfile}>{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography className='mb-5 text-lg font-bold'>{t('change_password')}</Typography>
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
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={handleSavePassword}>{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography className='mb-5 text-lg font-bold'>{t('change_photo')}</Typography>
                            <img src={`data:image/jpeg;base64,${profile.jpegPhoto}`} alt={t('profile_photo')} width={100}/>
                            <input type='file' onChange={handleSelectFile} id='file' ref={inputFile} style={{display: 'none'}}/>
                            <Button onClick={handleChoosePhoto}>{t('choose_photo')}</Button>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={handleSaveImage}>{t('save')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
