import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

const Glasses = () => {
    return (
        <div>
            <Navbar />
            <ProductGrid categoryEndpoint="http://34.30.241.199:5000/api/glasses" categoryType="Glasses" />
        </div>
        
    );
};

export default Glasses;
