'use client';

import { useRef, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface SideMenuProps {
  activeSection: string;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>, sectionName: string) => void;
  sections: {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
  menuItems: Section[];
  getButtonClass?: (sectionName: string) => string;
}

export function SideMenu({ activeSection, scrollToSection, sections, menuItems, getButtonClass }: SideMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      const activeButton = menuRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [activeSection]);

  const defaultGetButtonClass = (sectionName: string) => {
    return `w-full text-left px-4 py-2 rounded-lg transition-colors ${
      activeSection === sectionName
        ? 'text-white bg-blue-500'
        : 'text-gray-300 hover:bg-white/5'
    }`;
  };

  const buttonClass = getButtonClass || defaultGetButtonClass;

  return (
    <div className="w-64 flex-shrink-0">
      <div ref={menuRef} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h2 className="text-white font-semibold mb-4">Side Menu</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(sections[item.id], item.id)}
              className={buttonClass(item.id)}
              data-section={item.id}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
} 