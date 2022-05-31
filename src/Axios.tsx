import React, { useState } from "react";
import axios from "axios";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, Alert,
    DialogTitle, Snackbar, AlertColor
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


declare module "axios" {
    export interface AxiosRequestConfig {
        loading?: boolean;
        errorButtons?: IButtons;
    }
}

interface ISnackbar {
    open: boolean;
    type?: AlertColor;
    message?: string;
}

interface IButton {
    name: string;
    action?: () => void;
}

interface IButtons {
    ok?: IButton;
    cancel?: IButton;
}

interface IError {
    open: boolean;
    code?: number;
    message?: string;
}

export default function Axios() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<IError>({ open: false });
    const [btn, setBtn] = useState<IButtons>({});
    const [snackbar, setSnackbar] = useState<ISnackbar>({ open: false });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleCloseDialog = () => {
        setError({ ...error, open: false });
    }

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    }

    axios.defaults.baseURL = process.env.REACT_APP_URL;

    axios.interceptors.request.use(request => {
        if (request.loading) {
            setLoading(true);
        }
        return request;
    })
    axios.interceptors.response.use(response => {
        setLoading(false);
        if (!response.data.status) {
            if (response.data.snackbar) {
                setSnackbar({ ...response.data.snackbar, open: true });
            } else {
                if (response.config.errorButtons) setBtn(response.config.errorButtons);
                if (response.data.error) setError(response.data.error);
            }
        } else {
            if (response.data.snackbar) {
                setSnackbar({ ...response.data.snackbar, open: true });
            }
        }
        return response;
    }, async error => {
        if (!error.response) {
            setError({
                open: true,
                code: 10600,
                message: t('internt_error'),
            });
            setBtn({
                ok: {
                    name: t('try_again'),
                    action: async () => {
                        try {
                            return await axios.request(error.config);
                        } catch (e) {
                            return null;
                        }
                    }
                },
                cancel: {
                    name: t('close'),
                    action: handleCloseDialog
                }
            });
        } else if (error.response.status === 401) {
            navigate('/login');
        } else if (error.response.status === 403) {
            setError({
                open: true,
                code: 10403,
                message: t('403'),
            });
            setBtn({
                ok: {
                    name: t('understand'),
                    action: handleCloseDialog
                },
            });
        } else {
            setError({
                open: true,
                code: +`10${error.response.status}`,
                message: t('unknown_error'),
            });
            setBtn({
                ok: {
                    name: t('ok'),
                    action: handleCloseDialog
                },
            });
        }
        setLoading(false);
        return Promise.reject(error);
    });
    return (
        <>
            <Dialog open={error.open} onClose={handleCloseDialog}>
                <DialogTitle>{t('error_code')} {error.code}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {error.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        btn.cancel &&
                        <Button onClick={handleCloseDialog}>{btn.cancel.name}</Button>
                    }
                    {
                        btn.ok &&
                        <Button onClick={() => {
                            handleCloseDialog();
                            if (btn.ok?.action) {
                                btn.ok.action();
                            }
                        }}>{btn.ok.name}</Button>
                    }
                </DialogActions>
            </Dialog>
            <Backdrop style={{ zIndex: 1400 }} open={loading}>
                <CircularProgress color='primary' />
            </Backdrop>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbar.open} onClose={handleSnackbarClose}
                autoHideDuration={6000}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.type}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}