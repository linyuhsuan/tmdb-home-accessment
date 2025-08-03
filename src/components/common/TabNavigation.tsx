import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  children?: (activeTab: string) => React.ReactNode;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <>
      <div className="flex">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-6 py-4 font-medium transition-colors cursor-pointer rounded-t-lg ${
              activeTab === tab.id
                ? 'text-white bg-gray-800 border-b-2 border-gray-800'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {children?.(activeTab)}
    </>
  );
};

export default TabNavigation;
