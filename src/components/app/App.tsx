import { Routes, Route } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../login/Login'

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </>
    )
}
