import React from 'react';

function CategoryButton({ value, onClick }) {
  return (
    <button className="categoryButton" value={value} onClick={onClick}>{value}</button>
  );
}

export default CategoryButton;
