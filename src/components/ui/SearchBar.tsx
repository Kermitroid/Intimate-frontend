import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  
  
    if (!query.trim()) return null;
    navigate("/search?q=" + encodeURIComponent(query.trim()));
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        className="border px-3 py-1 rounded"
      />
      <button onClick={handleSearch} type="submit" className="bg-blue-600 text-white px-4 rounded">Search</button>
    </form>
  );
};

export default SearchBar;