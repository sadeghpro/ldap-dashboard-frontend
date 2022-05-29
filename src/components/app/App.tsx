import { Routes, Route } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../login/Login'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import RTL from './RTL';


export default function App() {

    const theme = createTheme({
        direction: 'rtl',
    });

    return (
        <ThemeProvider theme={theme}>
            <RTL rtl>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </RTL>
        </ThemeProvider>
    )
}
