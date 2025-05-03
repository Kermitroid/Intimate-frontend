export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  subscribers: number;
  isVerified: boolean;
}

export interface VideoStats {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // Duration in seconds
  uploadDate: string;
  creator: User;
  videoUrl: string;
  videoType: 'short' | 'standard' | 'livestream' | 'immersive';
  stats: VideoStats;
  tags: string[];
  category: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: number; // Timestamp in seconds for pinned/timed comments
  user: User;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export type ThemeMode = 'light' | 'dark' | 'auto';
