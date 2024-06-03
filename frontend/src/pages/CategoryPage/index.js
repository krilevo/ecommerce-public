import React from 'react';
import CategoryView from '../../components/CategoryView';
import { useParams } from 'react-router';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div className="category-page">
      <h1 className="category-page-name">{capitalizeFirstLetter(category)}</h1>
      <CategoryView category={category}/>
    </div>
  );
};

export default CategoryPage;
