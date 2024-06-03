import React from 'react';
import { Link } from 'react-router-dom';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

const BreadCrumb = ({ categoryPath }) => {
  const categories = categoryPath.split('/');

  return (
    <div className="breadcrumb">
    {categories.map((category, index) => (
      <span key={category}>
        <Link className="breadcrumb-link" to={`/category/${category}`}>{capitalizeFirstLetter(category)}</Link>
        {index < categories.length - 1 && <span> / </span>}
      </span>
    ))}
  </div>
  );
};

export default BreadCrumb;