import { create } from 'zustand';

interface ProjectLink {
  title: string;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  nim: string;
  angkatan: string;
  userId: string;
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
  currentPortfolioId: string | null;
  setPortfolioData: (data: Partial<PortfolioStore>) => void;
  resetStore: () => void;
  setCurrentPortfolioId: (id: string) => void;
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
  currentPortfolioId: null,
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
    },
    currentPortfolioId: null
  }),
  setCurrentPortfolioId: (id: string) => set({ currentPortfolioId: id })
}));

export { usePortfolioStore }; 