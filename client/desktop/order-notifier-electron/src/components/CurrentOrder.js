import React, { useContext, useRef } from "react"
import CurrentOrderContext from "../contexts/CurrentOrderContext";
import CurrentItem from "./menuComponents/CurrentItem";
import axios from 'axios'


export default function CurrentOrder(props) {

    const { currentOrderState, setCurrentOrderState } = useContext(CurrentOrderContext);
    const deviceIdRef = useRef();

    const parseOrders = () => {
        return (
            currentOrderState.map(item => {
                return (
                    <CurrentItem item={item}></CurrentItem>
                );
            })
        );
    }

    const displayOrders = () => {
        let orders = parseOrders();
        if (orders) {
            return orders;
        } else {
            return "No current items in order..."
        }
    }

    const confirmOrder = async () => {
        //TODO: Fix post request
        //  send data
        //  clear current order context
        //  fetch active orders

        const data = {
            user_id: deviceIdRef.current.value,
            items: currentOrderState.flatMap(orderItem => {
                return [...Array(orderItem.quantity)].map(item => {
                    return {
                        item_id: orderItem.id
                    }
                })
            })

        }
        console.log("Adding order: ", data);
        let response = await axios.post("http://127.0.0.1:5000/orders/addOrder", data).catch(err => console.error(err));
        console.log("Add order response: ", response);

        setCurrentOrderState([]);
        props.setUpdateActiveOrders(true);
    }

    return (
        <div>
            <div className="has-text-centered is-size-4">Current Order</div>
            <hr className='mb-5 mt-1'></hr>
            <div>
                {currentOrderState.length > 0 &&
                    <div>
                        <table className='table is-bordered is-fullwidth is-hoverable is-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {displayOrders()}
                            </tbody>
                        </table>

                        <div className="mb-5 has-text-centered">
                            <div className=" field has-addons">
                                <p className="control">
                                    <input className="input" type="text" placeholder="Enter Device ID" ref={deviceIdRef} />
                                </p>
                                <p className="control">
                                    <button className='button is-primary' onClick={confirmOrder}>Confim Order</button>
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}