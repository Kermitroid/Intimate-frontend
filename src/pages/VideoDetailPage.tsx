import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById } from '../lib/api/videos';

const VideoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(id!);
        setVideo(data);
      } catch (err) {
        console.error('Failed to fetch video', err);
      }
    };
    if (id) fetchVideo();
  }, [id]);

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <video controls className="w-full rounded">
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-600 mt-2">{video.description}</p>
      <p className="text-sm text-gray-400 mt-1">Uploaded by {video.creator?.username} on {new Date(video.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default VideoDetailPage;