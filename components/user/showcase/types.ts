import { LucideIcon } from 'lucide-react';

export interface PortfolioItem {
  id: string | number;
  name?: string;
  title: string;
  image: string; // This will be the gambar field from backend
  category: string;
  status: string;
  tags: string[];
  date: string;
  tahun: string;
  subtitle: string;
  description: string | string[];
  links?: {
    title: string;
    url: string;
  }[];
  teamMembers?: {
    name: string;
    role: string;
    nim: string;
  }[];
  contact?: {
    name: string;
    id: string;
  };
  creator?: {
    user_id: string;
    nim: string;
    name: string;
    role: string;
    noHandphone: string;
    linkedin: string;
    instagram: string;
    email: string;
    github: string;
  };
}

export interface SocialIcon {
  icon: LucideIcon;
  name: string;
} 