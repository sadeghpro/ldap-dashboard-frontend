import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

interface IProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ drawerOpen, setDrawerOpen }: IProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClickMenu = () => {
        setDrawerOpen(!drawerOpen);
    }

    const handleOpenProfile = () => {
        navigate('/profile');
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: { sm: 1201 } }}>
            <Toolbar>
                <IconButton
                    onClick={handleClickMenu}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className='mr-1'
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" className="grow">
                    {t('app_name')}
                </Typography>
                <IconButton color="inherit" onClick={handleOpenProfile}>
                    <AccountCircleIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
