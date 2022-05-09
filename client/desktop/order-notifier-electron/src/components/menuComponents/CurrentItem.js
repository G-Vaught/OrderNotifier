import React, { useContext } from 'react'
import CurrentOrderContext from '../../contexts/CurrentOrderContext';

function CurrentItem(props) {

    const item = props.item;

    const { currentOrderState, setCurrentOrderState } = useContext(CurrentOrderContext);

    const deleteItem = () => {
        let items = [...currentOrderState];
        for (let orderItem of items) {
            if (orderItem.id === item.id) {
                orderItem.quantity -= 1;
                if (orderItem.quantity <= 0) {
                    items = items.filter(idx => idx.id !== orderItem.id);
                }
            }
        }
        setCurrentOrderState(items);
    }

    const deleteAllItems = () => {
        let items = [...currentOrderState];
        setCurrentOrderState(items.filter(orderItem => orderItem.id !== item.id))
    }

    return (
        <tr>
            <td>{item.name}</td>
            <td className='has-text-centered'>{item.quantity}</td>
            <td>
                <div className='buttons'>
                    <button className='button is-small is-warning' onClick={deleteItem}>Delete 1 Item</button>
                    <button className='button is-small is-danger' onClick={deleteAllItems}>Delete All Items</button>
                </div>
            </td>
        </tr>
    )
}

export default CurrentItem