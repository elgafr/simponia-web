import { LucideIcon } from 'lucide-react';

export interface PortfolioItem {
  id: string | number;
  name?: string;
  title: string;
  image: string;
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
  }[];
  contact?: {
    name: string;
    id: string;
  };
}

export interface SocialIcon {
  icon: LucideIcon;
  name: string;
} 