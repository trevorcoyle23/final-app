import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

const Glasses = () => {
    return (
        <div>
            <Navbar />
            <ProductGrid categoryEndpoint="https://www.nuevestore.org/api/glasses" categoryType="Glasses" />
        </div>
        
    );
};

export default Glasses;
