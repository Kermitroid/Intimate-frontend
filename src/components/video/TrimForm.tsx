import { useState } from "react";
import axios from "axios";

  const [duration, setDuration] = useState("00:00:10");

  
    
    await axios.post(`/api/videos/${videoId}/trim`, { start, duration }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Trim complete. Refresh to see new video.");
  };

  return (
    <form onSubmit={handleTrim} className="mt-4 p-3 border">
      <h4 className="font-bold mb-2">Trim Video</h4>
      <div className="flex gap-2 mb-2">
        <input value={start} onChange={e => setStart(e.target.value)} aria-label="Start (hh:mm:ss)" placeholder="Start (hh:mm:ss)" className="border px-2 py-1" />
        <input value={duration} onChange={e => setDuration(e.target.value)} aria-label="Duration (hh:mm:ss)" placeholder="Duration (hh:mm:ss)" className="border px-2 py-1" />
        <button type="submit" type="submit" className="bg-blue-600 text-white px-3 py-1">Trim</button>
      </div>
    </form>
  );
};

export default TrimForm;