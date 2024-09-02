import React, { useState, useEffect } from 'react';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from API and setOrders
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    // Logic to update order status
  };

  return (
    <div>
      <h2>View Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>User: {order.userName}</p>
            <p>Products: {order.products.map(p => p.name).join(', ')}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => handleStatusUpdate(order.id, 'Shipped')}>Mark as Shipped</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrders;
