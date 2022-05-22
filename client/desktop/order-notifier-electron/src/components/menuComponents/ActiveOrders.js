import axios from 'axios';
import React, { useEffect } from 'react'
import ActiveOrder from './ActiveOrder';

function ActiveOrders({ updateActiveOrders }) {

    let activeOrders = null;

    useEffect(() => {
        fetchActiveOrders();
    }, [updateActiveOrders]);

    const fetchActiveOrders = async () => {
        let res = await axios.get("http://localhost:5000/orders");
        activeOrders = res.data;
        console.log("Active Orders: ", activeOrders);
    }

    return (
        <div>
            <div className="has-text-centered is-size-4">Active Orders</div>
            <hr className='mb-5 mt-1'></hr>
            {activeOrders && activeOrders.map(order => <ActiveOrder order={order}></ActiveOrder>)}
        </div>
    )
}

export default ActiveOrders