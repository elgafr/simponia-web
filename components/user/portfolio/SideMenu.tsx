import { useRef } from 'react';

interface SideMenuProps {
  activeSection: string;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>, sectionName: string) => void;
  sections: {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
}

export function SideMenu({ activeSection, scrollToSection, sections }: SideMenuProps) {
  const getButtonClass = (sectionName: string) => {
    return `w-full text-left px-4 py-2 rounded-lg transition-colors ${
      activeSection === sectionName
        ? 'text-white bg-blue-500'
        : 'text-gray-300 hover:bg-white/5'
    }`;
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sticky top-24">
        <h2 className="text-white font-semibold mb-4">Side Menu</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => scrollToSection(sections.projectName, 'projectName')}
            className={getButtonClass('projectName')}
          >
            Nama Project
          </button>
          <button 
            onClick={() => scrollToSection(sections.category, 'category')}
            className={getButtonClass('category')}
          >
            Kategori
          </button>
          <button 
            onClick={() => scrollToSection(sections.profile, 'profile')}
            className={getButtonClass('profile')}
          >
            Profile
          </button>
          <button 
            onClick={() => scrollToSection(sections.teamProject, 'teamProject')}
            className={getButtonClass('teamProject')}
          >
            Team Project
          </button>
          <button 
            onClick={() => scrollToSection(sections.detailProject, 'detailProject')}
            className={getButtonClass('detailProject')}
          >
            Detail Project
          </button>
        </nav>
      </div>
    </div>
  );
} 