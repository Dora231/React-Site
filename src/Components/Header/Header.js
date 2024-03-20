import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='Header'>
            <div className='HeaderPagination'>
                <Link to={'/'}>
                    <div>Статистика</div>
                </Link>
                <div className='stickHeaderPagination'></div>
                <Link to={'expense'}>
                    <div>Расходы</div>
                </Link>
                <div className='stickHeaderPagination'></div>
                <Link to={'income'}>
                    <div>Доходы</div>
                </Link>
            </div>
        </div>
    )
}
