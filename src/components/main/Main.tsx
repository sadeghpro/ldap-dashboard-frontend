import { useMediaQuery, Toolbar, Theme } from '@mui/material';
import { t } from 'i18next';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar, { closeWidth, width } from './Sidebar';

export default function Main() {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {
        noSsr: true
    });
    const [drawerOpen, setDrawerOpen] = useState(matches);
    const style: any = {
        width: `calc(100% - ${drawerOpen ? width : closeWidth}px`,
    }
    if (t('_dir') === 'rlt') {
        style.marginRight = `${drawerOpen ? width : closeWidth}px`
    } else {
        style.marginLeft = `${drawerOpen ? width : closeWidth}px`
    }
    return (
        <>
            <Header setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
            <Sidebar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
            <div className="flex flex-col h-full">
                <Toolbar />
                {
                    matches ?
                        <div style={style} className="transition-all grow">
                            <Outlet />
                        </div>
                        :
                        <div className="grow flex">
                            <div className="h-auto grow">
                                <Outlet />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
