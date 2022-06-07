import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Hidden, Drawer, Box, Toolbar, Typography } from '@mui/material';
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import drawerBackground from './drawerBackground.jpeg';

export const width = 240;
export const closeWidth = 50;


interface IProps {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ drawerOpen, setDrawerOpen }: IProps) {
    const { t } = useTranslation();

    const handleClose = () => {
        setDrawerOpen(false);
    }

    const list = <List>
        <ListItem disablePadding onClick={handleClose}>
            <NavLink className={({ isActive }) => 'w-full' + (isActive ? ' text-blue-600' : '')} to="/">
                <ListItemButton style={{ color: 'inherit' }}>
                    <ListItemIcon style={{ color: 'inherit' }}>
                        <DashboardIcon color='inherit' />
                    </ListItemIcon>
                    <ListItemText primary={t('dashboard')} className='h-6 overflow-hidden' />
                </ListItemButton>
            </NavLink>
        </ListItem>
        <Divider />
    </List>

    return (
        <>
            <Hidden smDown>
                <Drawer variant="permanent" open={drawerOpen} >
                    <Box sx={{ width: drawerOpen ? width : closeWidth }} className='transition-all overflow-hidden' >
                        <Toolbar />
                        {list}
                    </Box>
                </Drawer>
            </Hidden>
            <Hidden smUp>
                <Drawer onClose={handleClose} open={drawerOpen}>
                    <Box sx={{ width }}>
                        <div className='px-6'
                            style={{
                                backgroundImage: `linear-gradient(#333a,#333a),url(${drawerBackground})`,
                                backgroundSize: `${width}px ${width * 450 / 800}px`,
                                height: width * 450 / 800, width: width
                            }}>
                            <Link to='/profile' onClick={handleClose}>
                                <AccountCircleIcon className='w-16 h-16 text-white mt-4' />
                                <Typography style={{ minHeight: '24px' }} className='text-white font-bold'>{localStorage.getItem('name')}</Typography>
                            </Link>
                        </div>
                        {list}
                    </Box>
                </Drawer>
            </Hidden>
        </>
    )
}
