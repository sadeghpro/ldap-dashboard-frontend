import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { BrowserRouter } from "react-router-dom";
import './style.scss';
import './locale/i18n';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

