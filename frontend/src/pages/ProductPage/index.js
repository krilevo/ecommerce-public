import React, { useEffect, useState } from 'react';
import Product from '../../components/Product';
import EditProduct from '../../components/Product/EditProduct';
import { useAuth } from '../../utils/AuthContext';
import { useParams } from 'react-router';
import { fetchProduct } from '../../utils/services/api';
import '../../components/Product/Product.css';

const ProductPage = () => {
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
    <div className="product-page">
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
    </div>
  )
}

export default ProductPage;
