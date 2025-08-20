// import { useEffect, useState } from "react"

// function App() {


//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   console.log(suggestions)

//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return
//     }
//     fetch(`http://localhost:3333/products?search=${query}`)
//       .then(res => res.json())
//       .then(data => setSuggestions(data))
//       .catch(e => console.error(e));
//   }, [query]);



//   return (
//     <>
//       <div>
//         <input type="text"
//           placeholder="Search..."
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//         />
//         {suggestions.length > 0 && (
//           <div>
//             {suggestions.map((product) => (
//               <p key={product.id}>{product.name}</p>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default App

import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setSuggestions(data))
      .catch(e => console.error("Errore nel fetch dei dati:", e));
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