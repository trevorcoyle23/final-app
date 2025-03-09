import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

const Watches = () => {
    return (
        <div>
            <Navbar />
            <ProductGrid categoryEndpoint="http://34.174.232.200:5000/api/watches" categoryType="Watches" />
        </div>
        
    );
};

export default Watches;