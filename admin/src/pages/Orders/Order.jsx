import React, { useEffect, useState } from "react";
import "./Order.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      // console.log(response.data.data);
    } else {
      toast.error("Error Getting All Orders From Database");
    }
  };

  const statushandler = async (e, orderId) => {
    // console.log(e, orderId)
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });
    if (response.data.status) {
      toast.success(response.data.message);
      await fetchAllOrders();
    }
    window.location.reload(true); //? Need to add this as the select is not updating automatically , need to refresh page value={order.status}
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <Toaster position="top-right" reverseOrder={false} />
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, i) => (
          <div key={i} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => statushandler(e, order._id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Food Is Delivered">Food Is Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
