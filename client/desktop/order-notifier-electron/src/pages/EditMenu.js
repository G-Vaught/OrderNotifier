import React, { createRef, useEffect, useState } from 'react';
import * as MenuService from '../services/MenuService'
import axios from 'axios'

export default function EditMenu() {

    const [menuItems, setMenuItems] = useState(null);

    const nameInput = createRef();
    const priceInput = createRef();
    const categoryInput = createRef();

    const mapMenuRows = () => {
        if (!menuItems) return;
        return menuItems.map(item => {
            return <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td className="has-text-centered">{item.inStock ? "True" : "False"}</td>
                <td className="has-text-centered"><button className='button is-warning' onClick={event => deleteItem(item, event.target)}>Delete Item</button></td>
            </tr>
        })
    }


    const deleteItem = async (item, button) => {
        console.log(item, button);
        button.classList.add("is-loading");

        const data = {
            id: item._id
        }

        try {
            await axios.post("http://127.0.0.1:5000/menuItems/delete", data);
        } catch (err) {
            console.error(err);
        }

        await updateMenuItems();

        button.classList.remove("is-loading");
    }

    const addItem = async button => {
        button.classList.add("is-loading");
        const data = {
            name: nameInput.current.value,
            price: priceInput.current.value,
            category: categoryInput.current.value
        }

        try {
            let response = await axios.post("http://127.0.0.1:5000/menuItems/add", data);
            console.log(response);
        } catch (err) {
            console.error(err);
        }

        await updateMenuItems();

        nameInput.current.value = "";
        priceInput.current.value = "";
        categoryInput.current.value = "";

        button.classList.remove("is-loading");
    }

    const updateMenuItems = async () => {
        let response = await MenuService.getMenuItems();
        setMenuItems(response);
    }

    useEffect(() => {
        updateMenuItems();
    }, []);

    return (
        <div className='box'>
            <div className='is-size-2 has-text-centered has-text-primary'>
                Edit Menu Items
            </div>

            <hr className='mb-6 mt-1'></hr>

            <table className='table is-bordered is-fullwidth is-hoverable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>In Stock?</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems && mapMenuRows()}
                    <tr>
                        <td>
                            <input id="nameInput" ref={nameInput} className="input" type="text" placeholder="Name" />
                        </td>
                        <td>
                            <input id="priceInput" ref={priceInput} className="input" type="text" placeholder="Price" />
                        </td>
                        <td>
                            <input id="categoryInput" ref={categoryInput} className="input" type="text" placeholder="Category" />
                        </td>
                        <td colSpan={2} className="has-text-centered">
                            <button id="addItemButton" className='button is-primary' onClick={e => addItem(e.target)}>Add Item</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}