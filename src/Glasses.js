import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

const Glasses = () => {
    return (
        <div>
            <Navbar />
            <ProductGrid categoryEndpoint="http://34.42.46.130:5000/api/glasses" categoryType="Glasses" />
        </div>
        
    );
};

export default Glasses;
