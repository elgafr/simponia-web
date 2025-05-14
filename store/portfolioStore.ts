import { create } from 'zustand';

interface ProjectLink {
  title: string;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  nim: string;
}

interface Contact {
  name: string;
  id: string;
}

export interface PortfolioStore {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  projectLinks: ProjectLink[];
  teamMembers: TeamMember[];
  projectImage: string;
  contact: Contact;
  setPortfolioData: (data: Partial<PortfolioStore>) => void;
  resetStore: () => void;
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
  title: '',
  category: '',
  year: '',
  description: '',
  tags: [],
  projectLinks: [],
  teamMembers: [],
  projectImage: '',
  contact: {
    name: '',
    id: ''
  },
  setPortfolioData: (data: Partial<PortfolioStore>) => set((state) => ({ ...state, ...data })),
  resetStore: () => set({
    title: '',
    category: '',
    year: '',
    description: '',
    tags: [],
    projectLinks: [],
    teamMembers: [],
    projectImage: '',
    contact: {
      name: '',
      id: ''
    }
  })
}));

export { usePortfolioStore }; 