import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

const Watches = () => {
    return (
        <div>
            <Navbar />
            <ProductGrid categoryEndpoint="https://www.nuevestore.org/api/watches" categoryType="Watches" />
        </div>
        
    );
};

export default Watches;
