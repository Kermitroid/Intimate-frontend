import { useNavigate } from "react-router-dom";

  return (
    <div className="flex gap-3 px-4 py-2 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => navigate(`/category/${category.toLowerCase()}`)}
          className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;