import React, { useEffect, useState } from "react";

interface DataItem {
  id: number;
  title: string;
  description?: string;
}

const RegisterPage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/register-info"); // Replace with actual API
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Register</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisterPage;
