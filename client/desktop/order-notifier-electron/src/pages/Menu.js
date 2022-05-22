import React, { useState } from 'react';
import CurrentOrder from '../components/CurrentOrder';
import ActiveOrders from '../components/menuComponents/ActiveOrders';
import MenuItems from '../components/menuComponents/MenuItems';

export default function Menu() {

    //used to signal to update orders when new order is added
    const [updateActiveOrders, setUpdateActiveOrders] = useState(false);

    return (
        <div className='mt-6'>
            <div className='columns'>
                <div className='column box is-half mr-3'>
                    <CurrentOrder setUpdateActiveOrders={setUpdateActiveOrders}></CurrentOrder>
                </div>
                <div className='column box is-half'>
                    <ActiveOrders updateActiveOrders={updateActiveOrders}></ActiveOrders>
                </div>
            </div>
            <div className='column box'>
                <MenuItems></MenuItems>
            </div>
        </div>
    )
}