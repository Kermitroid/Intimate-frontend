import { useState } from "react";

  if (!angles?.length) return <p>No video angles available.</p>;

  return (
    <div className="mb-4">
      <video src={angles[current]} controls className="w-full mb-2" />
      <div className="flex gap-2">
        {angles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={\`px-2 py-1 text-sm rounded \${idx === current ? 'bg-blue-600 text-white' : 'bg-gray-300'}\`}
          >
            Angle {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiAnglePlayer;