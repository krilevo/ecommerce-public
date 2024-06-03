import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from './Product';
import EditProduct from './EditProduct';
import { useAuth } from '../../utils/AuthContext';
import { fetchProduct } from '../../utils/services/api';
import './ProductView.css';

function ProductView() {
  const { user } = useAuth();
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [editFormIsVisible, setEditFormIsVisible] = useState(false);

  useEffect(() => {
    fetchProduct(productID)
    .then((response) => setProduct(response))
    .catch((error) => {
      console.log(error);
    })
  }, [productID]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {user?.accessLevel === 'admin' && (
    <button 
      className="edit-product-button" 
      onClick={() => setEditFormIsVisible(true)}
    >
      Edit Product
    </button>
    )}
      
      <Product product={product} />
      <EditProduct product={product} setProduct={setProduct} isVisible={editFormIsVisible} setIsVisible={setEditFormIsVisible}/>
    </>
  );
}

export default ProductView;
