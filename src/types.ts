export type ThemeMode = 'light' | 'dark';

export interface User {
  id: string | number;
  displayName: string;
  avatar?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  uploadDate?: string;
  creator?: User;
  stats?: {
    views?: number;
    likes?: number;
  };
  videoType?: 'regular' | 'short' | 'livestream' | 'immersive';
}