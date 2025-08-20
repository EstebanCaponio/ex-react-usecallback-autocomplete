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
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;