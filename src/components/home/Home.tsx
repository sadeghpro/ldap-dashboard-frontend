import axios from 'axios'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import IResponse from '../../interfaces/IResponse'

export default function Home() {
    const { t } = useTranslation()

    useEffect(() => {
        axios.request<IResponse<any>>({
            url: '/'
        }).then(res => {
            if (res.data.status) {
                
            }
        }).catch(err => {

        })
    }, [])
    return (
        <div>{t('welcome')}</div>
    )
}
