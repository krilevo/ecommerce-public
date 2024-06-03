import React, { useState } from 'react';
import Modal from '../../common/Modal/Index';
import DeleteProduct from '../../common/DeleteProduct/DeleteProduct';
import { Link } from 'react-router-dom';
import './ProductTable.css';

const ProductTable = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState('');

  const handleActionModal= () => {
    DeleteProduct(id);
  }
  
  const handleOpenModal= (id) => {
    setId(id);
    setIsModalOpen(true);
  }

  const handleCloseModal= () => {
    setIsModalOpen(false);
  }

  return (
    <>
    <table className="product-management-table">
      <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sold</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td><Link to={`/product/${product._id}/${product.name.replace(" ", "-")}`}>{product.name}</Link></td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.sold}</td>
              <td>{product.discountAmount}%</td>
              <td><button className="product-management-table-btn" onClick={() => handleOpenModal(product._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
    </table>
    <Modal
      isOpen={isModalOpen} 
      action='Delete'
      onAction={handleActionModal} 
      onClose={handleCloseModal} 
      title='Delete'
      message='Are you sure?'
    />
    </>
  );
};

export default ProductTable;