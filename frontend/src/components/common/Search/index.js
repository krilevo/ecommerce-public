import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import SuggestionList from './SuggestionList';
import { searchProducts } from '../../../utils/services/api';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Search.css';

// Define a debounced fetchSuggestions function
const fetchSuggestions = debounce((searchQuery, setSuggestions) => {
  searchProducts(searchQuery)
    .then((data) => {
      setSuggestions(data);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}, 500);

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const productListRef = useRef(null); // Reference to the product list container

  useEffect(() => {
    // Add event listener for clicks outside the product list
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
    }, [])
    
  useEffect(() => {
    // Fetch product suggestions from the backend when the search query changes
    if (searchQuery) {
      fetchSuggestions(searchQuery, setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSelectSuggestion = (selectedProduct) => {
    setSearchQuery('');
    setSuggestions([]);
  };

  // Reset search field
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle click outside the product list
  const handleClickOutside = (event) => {
    if (productListRef.current && !productListRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  const handleSearchInputClick = () => {
    // Show the product list when the search input is clicked
    if (suggestions.length > 0) {
      setSuggestions([]);
    }
  };

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search for products..."
        maxLength={75}
        value={searchQuery}
        onChange={handleChange}
        onClick={handleSearchInputClick}
      />
      {searchQuery && (
        <span className="clear-icon" onClick={handleClearSearch}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      )}
      {suggestions.length > 0 && (
        <SuggestionList ref={productListRef} suggestions={suggestions} handleSelectSuggestion={handleSelectSuggestion} />
      )}
    </div>
  );
};

export default SearchProducts;
