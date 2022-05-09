import React, { useContext } from "react"
import CurrentOrderContext from "../contexts/CurrentOrderContext";
import CurrentItem from "./menuComponents/CurrentItem";


export default function CurrentOrder() {

    const { currentOrderState, setCurrentOrderState } = useContext(CurrentOrderContext);

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

    const confirmOrder = () => {
        //TODO: Fix post request
        //  send data
        //  clear current order context
        //  fetch active orders
    }

    return (
        <div>
            <div className="has-text-centered is-size-4">Current Order</div>
            <hr className='mb-5 mt-1'></hr>
            <div className="columns is-centered">
                {currentOrderState.length > 0 &&
                    <div>
                        <table className='table is-bordered  is-hoverable is-striped'>
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

                        <div className="columns is-centered mb-5">
                            <div className="is-centered">
                                <button className='button is-primary' onClick={confirmOrder}>Confim Order</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}