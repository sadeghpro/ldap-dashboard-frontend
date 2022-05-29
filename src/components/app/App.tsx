import { Routes, Route } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../login/Login'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import RTL from './RTL';
import { useTranslation } from 'react-i18next';


export default function App() {
    const { t } = useTranslation();
    const theme = createTheme({
        direction: t('_dir'),
    });

    return (
        <ThemeProvider theme={theme}>
            <RTL rtl={t('_dir') === 'rtl'}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </RTL>
        </ThemeProvider>
    )
}
