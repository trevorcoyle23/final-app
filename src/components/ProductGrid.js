import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css'

const ProductGrid = ({ categoryEndpoint, categoryType}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(categoryEndpoint)
            .then((res) => res.json())
            .then((data) => {
                const normailzedProducts = data.map(item => {
                    let product = {
                        id: item.product_id,
                        brand: item.brand,
                        modelName: item.model_name,
                        imageUrl: item.image_url,
                        price: item.price,
                        details: categoryType === 'Cologne' ? item.fragrance_notes : null,
                        sizeOptions: item.size ? [item.size] : []
                    };

                    return product;
                });
                setProducts(normailzedProducts);
            })
            .catch((err) => console.error('Error fetching products:', err));
    }, [categoryEndpoint, categoryType]);

    return (
        <div className='product-grid'>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;