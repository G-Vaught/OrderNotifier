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
        <div className='columns  is-multiline'>{display()}</div>
    )
}

export default MenuItems