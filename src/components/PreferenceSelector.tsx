import React, { useRef } from 'react';
import { CheckIcon } from 'lucide-react';
interface PreferenceOption {
  id: string;
  label: string;
  icon: string;
}
interface PreferenceSelectorProps {
  title: string;
  options: PreferenceOption[];
  selected: string;
  onSelect: (value: string) => void;
}
const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  title,
  options,
  selected,
  onSelect
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-medium mb-3 text-gray-800">{title}</h3>
      <div ref={scrollContainerRef} className="flex overflow-x-auto pb-2 space-x-3 scrollbar-hide snap-x">
        {options.map(option => <button key={option.id} onClick={() => onSelect(option.id)} className={`flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 transition-all duration-300 snap-start ${selected === option.id ? 'border-[#0066CC] bg-blue-50 shadow-inner' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}>
            <div className="text-2xl mb-1">{option.icon}</div>
            <div className="text-sm font-medium">{option.label}</div>
            {selected === option.id && <div className="absolute top-1 right-1 bg-[#0066CC] rounded-full p-0.5 shadow-md">
                <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />
              </div>}
          </button>)}
      </div>
    </div>;
};
export default PreferenceSelector;