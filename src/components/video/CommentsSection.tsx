import { useEffect, useState } from "react";
import axios from "axios";

  const [text, setText] = useState("");
  const [timestamp, setTimestamp] = useState("");

  
    setComments(res.data);
  };

  
    await axios.post("/api/comments", {
      videoId,
      text,
      timestamp,
    }, {
      headers: {
        Authorization: "Bearer " + typeof window !== "undefined" && localStorage.getItem("token")
      }
    });
    setText(""); setTimestamp("");
    fetchComments();
  };

  
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          required
          className="border px-2 py-1 w-full"
        />
        <input
          value={timestamp}
          onChange={e => setTimestamp(e.target.value)}
          placeholder="Timestamp (e.g. 01:23)"
          className="border px-2 py-1 w-32"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1">Post</button>
      </form>
      {comments.map(c => (
        <div key={c.id} className="border-b py-2">
          <p><span className="font-semibold">{c.user}</span> <span className="text-xs text-gray-400">{c.timestamp}</span></p>
          <p>{c.text}</p>
          <div className="flex gap-2 mt-1">
            {emojiOptions.map(e => (
              <button key={e} onClick={() => reactToComment(c.id, e)}>{e} {c.reactions?.[e] || 0}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;