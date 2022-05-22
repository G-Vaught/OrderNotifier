/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <nav className='navbar box pt-0 pb-0'>
            <div className='navbar-brand'>
                <button className='button is-primary is-large is-inverted'>Order Notifier</button>
            </div>
            <div className='navbar-menu'>
                <div className='navbar-start'>
                    <a className='navbar-item' onClick={() => { navigate("/") }}>Menu</a>
                    <a className='navbar-item' onClick={() => { navigate("/editMenu") }}>Edit Menu Items</a>
                </div>
            </div>
        </nav>
    )
}