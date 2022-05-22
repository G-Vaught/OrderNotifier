import React, { useContext } from 'react'
import CurrentOrderContext from '../../contexts/CurrentOrderContext';

function Item(props) {

    const item = props.item;
    const { currentOrderState, setCurrentOrderState } = useContext(CurrentOrderContext);

    const addItem = () => {
        let data = {
            id: item._id,
            name: item.name,
            quantity: 1
        }
        let orders = [...currentOrderState];
        let isFound = updateOrders(orders, data);
        if (!isFound) {
            orders.push(data);
        }
        setCurrentOrderState(orders);
    }

    const updateOrders = (orders, newOrder) => {
        for (const order of orders) {
            if (order.id === newOrder.id) {
                order.quantity += 1;
                return true;
            }
        }
        return false;
    }

    return (
        <div className='column is-3'>
            <div className='card'>
                <header className='card-header' >
                    <div className='card-header-title' style={{ justifyContent: "space-between" }} >
                        <div className='has-text-left'>
                            {item.name} - ${item.price}
                        </div>
                        {item.inStock ?
                            <span className='is-pulled-right' style={{ color: "green" }}>
                                In Stock
                            </span>
                            :
                            <div className='has-text-right' style={{ color: "red" }}>
                                Out of Stock
                            </div>
                        }
                    </div>
                </header>
                <div className='card-content'>
                    <div className='has-text-centered'>
                        <button className='button is-primary' onClick={addItem}>Add Item</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Item