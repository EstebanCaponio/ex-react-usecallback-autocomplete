const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value)
    }, delay);
  };
};

import { useCallback, useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error)
    }
  }


  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500), []
  );

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  const fetchProdDetails = async (id) => {
    const res = await fetch(`http://localhost:3333/products/${id}`)
    const data = await res.json();
    setSelected(data);
    setQuery('');
    setSuggestions([]);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Cerca un prodotto..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((product) => (
            <p
              key={product.id}
              onClick={() => fetchProdDetails(product.id)}
            >{product.name}</p>
          ))}
        </div>
      )}
      {selected && (
        <div className="product-card">
          <img src={selected.image} alt={selected.name} className="product-image" />
          <h2 className="product-name">{selected.name}</h2>
          <p className="product-description">{selected.description}</p>
          <p className="product-price">prezzo: {selected.price}€</p>
        </div>
      )}
    </div>
  );
}

export default App;