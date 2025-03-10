// ProductGrid.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ categoryEndpoint, categoryType }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(categoryEndpoint)
        .then((res) => res.json())
        .then((data) => {
            // Group items by product_id
            const grouped = data.reduce((acc, item) => {
            if (!acc[item.product_id]) {
                acc[item.product_id] = {
                id: item.product_id,
                brand: item.brand,
                modelName: item.model_name,
                imageUrl: item.image_url,
                details: categoryType === 'Cologne' ? item.fragrance_notes : null,
                sizeOptions: [],
                selectedOption: null,
                };
            }
            // Add size option to the product
            acc[item.product_id].sizeOptions.push({
                reference_id: item.reference_id,
                size: item.size,
                price: item.price,
                quantity: item.quantity,
            });
            // Set the default selected option if not already set (choose the first one)
            if (!acc[item.product_id].selectedOption) {
                acc[item.product_id].selectedOption = {
                reference_id: item.reference_id,
                size: item.size,
                price: item.price,
                quantity: item.quantity,
                };
            }
            return acc;
            }, {});

            const normalizedProducts = Object.values(grouped);
            setProducts(normalizedProducts);
        })
        .catch((err) => console.error('Error fetching products:', err));
    }, [categoryEndpoint, categoryType]);

    // Update the selected option when a different size is chosen
    const handleSizeChange = (productId, selectedSize) => {
        setProducts((prevProducts) =>
        prevProducts.map((product) => {
            if (product.id === productId) {
            const newSelected = product.sizeOptions.find(
                (option) => option.size === selectedSize
            );
            return { ...product, selectedOption: newSelected };
            }
            return product;
        })
        );
    };

    return (
        <div className="product-grid">
        {products.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            onSizeChange={handleSizeChange}
            />
        ))}
        </div>
    );
};

export default ProductGrid;
