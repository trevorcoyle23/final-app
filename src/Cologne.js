import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';

const Cologne = () => {
    return (
        <div>
            <Navbar />
            <ProductGrid categoryEndpoint="https://www.nuevestore.org/api/colognes" categoryType="Cologne" />
        </div>
        
    );
};

export default Cologne;
