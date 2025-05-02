import { useState } from "react";
import axios from "axios";

  const [password, setPassword] = useState("");

  
    try {
      await axios.post("/api/register", { username, password });
      alert("Signup successful! You can now log in.");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} className="mb-4">
      <input value={username} onChange={e => setUsername(e.target.value)} ="Username" required className="border px-2 py-1 mr-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} ="Password" required className="border px-2 py-1 mr-2" />
      <button type="submit" className="bg-green-600 text-white px-3 py-1">Sign Up</button>
    </form>
  );
};

export default SignupForm;