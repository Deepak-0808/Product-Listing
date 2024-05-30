import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border rounded"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition" onClick={() => setSelectedProduct(product)}>
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover mb-4" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="h-48 w-full object-cover mb-4" />
            <p className="text-gray-600 mb-4">${selectedProduct.price}</p>
            <p>{selectedProduct.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
