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

export interface EditPortfolioStore {
  title: string;
  category: string;
  year: string;
  description: string;
  projectImage: string;
  teamMembers: TeamMember[];
  projectLinks: ProjectLink[];
  tags: string[];
  contact: Contact;
  currentPortfolioId: string | null;
  setPortfolioData: (data: Partial<EditPortfolioStore>) => void;
  setCurrentPortfolioId: (id: string) => void;
  resetStore: () => void;
}

const initialState = {
  title: '',
  category: '',
  year: '',
  description: '',
  projectImage: '',
  teamMembers: [],
  projectLinks: [],
  tags: [],
  contact: {
    name: '',
    id: ''
  },
  currentPortfolioId: null
};

export const useEditPortfolioStore = create<EditPortfolioStore>((set) => ({
  ...initialState,
  setPortfolioData: (data) => set((state) => ({ ...state, ...data })),
  setCurrentPortfolioId: (id) => set({ currentPortfolioId: id }),
  resetStore: () => set(initialState)
})); 