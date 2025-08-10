import React from 'react';
import { InfoIcon, AlertCircleIcon } from 'lucide-react';

interface BudgetBreakdownProps {
  budget: number;
  allocation: {
    transport: number;
    food: number;
    activities: number;
    emergency: number;
  };
  onChange: (category: string, value: number) => void;
}

const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  budget,
  allocation,
  onChange
}) => {
  const categories = [{
    id: 'transport',
    label: 'Transport',
    gradient: 'from-[#0055CC] to-[#0077DD]',
    color: '#0066CC',
    description: 'Flights, trains, buses, local transport',
    priority: 'High'
  }, {
    id: 'food',
    label: 'Food',
    gradient: 'from-[#FFAA00] to-[#FFDD33]',
    color: '#FFAA00',
    description: 'Meals, snacks, drinks',
    priority: 'High'
  }, {
    id: 'activities',
    label: 'Activities',
    gradient: 'from-[#AA0000] to-[#FF4D4D]',
    color: '#CC4444',
    description: 'Tours, attractions, entertainment',
    priority: 'Medium'
  }, {
    id: 'emergency',
    label: 'Emergency',
    gradient: 'from-[#007722] to-[#00BB44]',
    color: '#009933',
    description: 'Unexpected expenses, medical',
    priority: 'Essential'
  }];

  // Calculate totals and validation
  const totalAllocated = Object.values(allocation).reduce((sum, value) => sum + value, 0);
  const unallocated = 100 - totalAllocated;
  const isFullyAllocated = Math.abs(unallocated) < 0.1; // Allow for small rounding errors

  const handleSliderChange = (category: string, value: number) => {
    // Ensure minimum allocation
    const minValue = 5;
    const maxValue = 70;
    const clampedValue = Math.max(minValue, Math.min(maxValue, value));
    
    onChange(category, clampedValue);
    
    // Auto-adjust if total exceeds 100%
    const otherCategories = Object.keys(allocation).filter(key => key !== category);
    const newTotal = clampedValue + otherCategories.reduce((sum, key) => sum + allocation[key as keyof typeof allocation], 0);
    
    if (newTotal > 100) {
      const excess = newTotal - 100;
      const otherTotal = otherCategories.reduce((sum, key) => sum + allocation[key as keyof typeof allocation], 0);
      
      if (otherTotal > 0) {
        otherCategories.forEach(key => {
          const proportion = allocation[key as keyof typeof allocation] / otherTotal;
          const reduction = excess * proportion;
          const newValue = Math.max(5, allocation[key as keyof typeof allocation] - reduction);
          onChange(key, Math.round(newValue));
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Total Budget Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Budget</h3>
          <p className="text-3xl font-bold text-[#0066CC]">₱{budget.toLocaleString('en-PH')}</p>
        </div>
      </div>

      {/* Allocation Status - Persistent Display */}
      <div className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
        isFullyAllocated 
          ? 'bg-green-50 border-green-200 text-green-700' 
          : unallocated > 0
            ? 'bg-orange-50 border-orange-200 text-orange-700'
            : 'bg-red-50 border-red-200 text-red-700'
      }`}>
        <div className="flex items-center gap-2">
          {isFullyAllocated ? (
            <>
              <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium">Budget fully allocated</span>
            </>
          ) : (
            <>
              <AlertCircleIcon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">
                {unallocated > 0 
                  ? `${unallocated.toFixed(1)}% unallocated` 
                  : `Exceeded by ${Math.abs(unallocated).toFixed(1)}%`
                }
              </span>
            </>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Status</div>
          <div className={`text-sm font-semibold ${
            isFullyAllocated ? 'text-green-600' : 'text-current'
          }`}>
            {totalAllocated.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
        <InfoIcon className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Slider Instructions:</p>
          <ul className="space-y-1 text-xs">
            <li>• Drag sliders to adjust allocation (5% minimum, 70% maximum)</li>
            <li>• Values automatically adjust to maintain 100% total</li>
            <li>• Each 1% increment = ₱{(budget / 100).toLocaleString('en-PH')}</li>
          </ul>
        </div>
      </div>

      {/* Budget Sliders */}
      <div className="space-y-5">
        {categories.map(category => {
          const value = allocation[category.id as keyof typeof allocation];
          const amount = (budget * value / 100);
          // Calculate the correct percentage for bar alignment: (current_value - min_value) / (max_value - min_value) * 100
          const percentage = ((value - 5) / (70 - 5)) * 100;
          
          return (
            <div key={category.id} className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor={category.id} className="text-sm font-semibold text-gray-800">
                      {category.label}
                    </label>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      category.priority === 'Essential' ? 'bg-red-100 text-red-700' :
                      category.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {category.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">
                    ₱{amount.toLocaleString('en-PH')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {value}%
                  </div>
                </div>
              </div>
              
              {/* Custom Slider */}
              <div className="relative">
                {/* Slider Track */}
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  {/* Progress Bar */}
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-200 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                  
                  {/* Slider Input */}
                  <input
                    id={category.id}
                    type="range"
                    min="5"
                    max="70"
                    step="1"
                    value={value}
                    onChange={(e) => handleSliderChange(category.id, parseInt(e.target.value))}
                    className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-grab active:cursor-grabbing slider-clean"
                  />
                </div>
                
                {/* Slider Labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5%</span>
                  <span className="text-xs text-gray-600 font-medium">
                    {value}% (₱{amount.toLocaleString('en-PH')})
                  </span>
                  <span>70%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Allocation Summary</h4>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(category => {
            const value = allocation[category.id as keyof typeof allocation];
            const amount = (budget * value / 100);
            return (
              <div key={category.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs text-gray-600">
                  {category.label}: ₱{amount.toLocaleString('en-PH')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetBreakdown;