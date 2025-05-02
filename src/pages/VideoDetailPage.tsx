import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ThumbsUp, ThumbsDown, Share, Bookmark, MessageCircle,
  Flag, Clock, CheckCircle, MoreHorizontal, BarChart2, Send,
} from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadedAt: string;
}

const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`); // Replace with your real endpoint
        const data = await response.json();
        setVideo(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load video.");
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!video) return <div>No video found.</div>;

  return (
    <div className="p-4">
      <motion.h1 className="text-2xl font-bold mb-2">{video.title}</motion.h1>
      <p className="mb-4 text-gray-600">{video.description}</p>

      <div style={{ margin: "20px 0" }}>
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2488178052505143"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      <div className="flex items-center space-x-4 text-gray-700 mb-4">
        <ThumbsUp /> {video.likes}
        <ThumbsDown /> {video.dislikes}
        <MessageCircle />
        <Share />
        <Bookmark />
      </div>

      <div className="text-sm text-gray-500">
        Views: {video.views} • Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default VideoDetailPage;
