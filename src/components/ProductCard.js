import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { imageUrl, brand, modelName, price, details, sizeOptions } = product;
    return (
        <div className='product-card'>
            <img 
                src={imageUrl}
                alt={brand}
                className='product-image'
            />
            <div className='product-info'>
                <h3>{brand} - {modelName}</h3>
                {details && <p>{details}</p>}
                <p>$ {price}</p>
                {sizeOptions.length > 0 && (
                    <>
                        <label htmlFor={`size-${product.id}`}>Select Size: </label>
                        <select id={`size-${product.id}`}>
                            {sizeOptions.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;