import React from 'react';
import CurrentOrder from '../components/CurrentOrder';
import ActiveOrders from '../components/menuComponents/ActiveOrders';
import MenuItems from '../components/menuComponents/MenuItems';

export default function Menu() {
    return (
        <div>
            <div className='box mb-5'>
                <CurrentOrder></CurrentOrder>
            </div>

            <div className='columns'>
                <div className='column box is-three-quarters'>
                    <MenuItems></MenuItems>
                </div>
                <div className='column box ml-3'>
                    <ActiveOrders></ActiveOrders>
                </div>
            </div>
        </div>
    )
}