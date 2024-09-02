import React, { useState, useEffect } from 'react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/supplies'); // For Pet Supplies
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Logic to update a product
  const handleUpdate = async (productId) => {
    const updatedProduct = products.find((product) => product.supply_id === productId);
    // Modify updatedProduct with the new details
    updatedProduct.quantity = 10; // Example update

    try {
      const response = await fetch(`http://localhost:8080/supplies/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.supply_id === productId ? updatedData : product
          )
        );
        console.log('Product updated successfully');
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Logic to delete a product
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/supplies/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.supply_id !== productId)
        );
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.supply_id}>
            {product.supply_name} - {product.quantity}
            <button onClick={() => handleUpdate(product.supply_id)}>Update</button>
            <button onClick={() => handleDelete(product.supply_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
