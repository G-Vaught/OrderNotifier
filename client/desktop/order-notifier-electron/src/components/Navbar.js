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
                    <div className='navbar-item'>
                        <button className='button is-ghost' onClick={() => { navigate("/") }}>Menu</button>
                    </div>
                    <div className='navbar-item'>
                        <button className='button is-ghost' onClick={() => { navigate("/editMenu") }}>Edit Menu Items</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}