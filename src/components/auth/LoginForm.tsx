import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

  const [name, setName] = useState("");

  
    axios.post("/api/login", { username: name }).then(res => {
      login(name);
      typeof window !== "undefined" && localStorage.setItem("username", name);
      typeof window !== "undefined" && localStorage.setItem("token", res.data.token);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        ="Enter your name"
        className="border px-2 py-1 rounded mr-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
    </form>
  );
};

export default LoginForm;