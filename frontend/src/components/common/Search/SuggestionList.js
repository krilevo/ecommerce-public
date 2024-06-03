import React from 'react';
import { Link } from 'react-router-dom';
import { s3ImageUrl } from '../../../config';

const SuggestionList = React.forwardRef(({ suggestions, handleSelectSuggestion }, ref) => {
  return (
    <ul className="suggestion-list" ref={ref}>
      {suggestions.map((product) => (
        <li key={product._id} onClick={() => handleSelectSuggestion(product)}>
          <Link className="suggestion-list-product" to={`/product/${product._id}/${product.name.replace(" ", "-")}`}>
            <img className="suggestion-list-image" src={`${s3ImageUrl}/${product.imageName}`} alt={product.name} />
            <div className="suggestion-list-info">
              <p className="suggestion-list-info-name">{product.name}</p>
              <div>
                {product.discountAmount ?
                <div className="suggestion-list-price-container">
                  <p className="suggestion-list-info-price suggestion-list-info-original-price">${product.price}</p>
                  <p className="suggestion-list-info-price">${product.price - product.price * (product.discountAmount / 100)}</p>
                </div>:
                  <p className="suggestion-list-info-price">${product.price}</p>
                }
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
});

export default SuggestionList;
