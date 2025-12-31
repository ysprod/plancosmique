import React from 'react';
import { Filter } from 'lucide-react';
import { filterOptions } from '@/hooks/notifications/useNotificationFilter';

interface NotificationFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
}

const NotificationFilterBar: React.FC<NotificationFilterBarProps> = ({ filter, setFilter }) => (
  <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
    <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
    {filterOptions.map((option) => (
      <button
        key={option.value}
        onClick={() => setFilter(option.value)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${filter === option.value
          ? 'bg-purple-500 text-white'
          : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default NotificationFilterBar;
