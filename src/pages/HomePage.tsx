import React, { useEffect, useState } from "react";

interface DataItem {
  id: string;
  title: string;
  description?: string;
  src?: string;
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch("/api/videos");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to load videos.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            {item.description && <p>{item.description}</p>}
            {item.src && <video src={item.src} controls width="300" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
