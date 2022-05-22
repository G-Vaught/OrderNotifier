import React, { useEffect, useState } from 'react'
import * as MenuService from '../../services/MenuService'
import Item from './Item';
function MenuItems() {

    const [menuItems, setMenuItems] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            let items = await MenuService.getMenuItems();
            setMenuItems(items);
        }
        fetch();
    }, []);

    const display = () => {
        if (menuItems) {
            return (
                menuItems.map(item => {
                    return <Item item={item} key={item._id}></Item>
                })
            );
        }
        return "No Menu Items..."
    }

    return (
        <div>
            <div className="has-text-centered is-size-4">Menu Items</div>
            <hr className='mb-5 mt-1'></hr>
            <div className='columns is-multiline'>{display()}</div>
        </div>
    )
}

export default MenuItems