import { useEffect, useState } from 'react';
import { getAllVideos } from '../lib/api/videos';
import VideoGrid from '../components/video/VideoGrid';

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Videos</h1>
      <VideoGrid videos={videos} />
    </div>
  );
};

export default HomePage;