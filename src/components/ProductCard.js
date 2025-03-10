// ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onSizeChange }) => {
    const { imageUrl, brand, modelName, selectedOption, details, sizeOptions, id } = product;

    return (
        <div className="product-card">
        <img
            src={imageUrl}
            alt={brand}
            className="product-image"
        />
        <div className="product-info">
            <h3>
            {brand} - {modelName}
            </h3>
            {details && <p>{details}</p>}
            <p>$ {selectedOption.price}</p>
            {sizeOptions.length > 0 && (
            <>
                <label htmlFor={`size-${id}`}>Select Size: </label>
                <select
                id={`size-${id}`}
                value={selectedOption.size}
                onChange={(e) => onSizeChange(id, e.target.value)}
                >
                {sizeOptions.map((option, index) => (
                    <option key={index} value={option.size}>
                    {option.size}
                    </option>
                ))}
                </select>
            </>
            )}
        </div>
        </div>
    );
};

export default ProductCard;
