import React, { useEffect, useState } from 'react';

interface BudgetInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  value,
  onChange,
  hasError = false
}) => {
  const [displayValue, setDisplayValue] = useState('');
  
  useEffect(() => {
    // Format the display value when the actual value changes
    if (value) {
      const numValue = parseFloat(value);
      setDisplayValue(numValue.toLocaleString('en-PH'));
    } else {
      setDisplayValue('');
    }
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    // Update the actual value (without formatting)
    onChange(rawValue);
  };

  return (
    <div className="relative mt-1 rounded-xl shadow-sm overflow-hidden transition-all duration-200">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <span className="text-gray-500 sm:text-lg font-medium">₱</span>
      </div>
      <input 
        type="text" 
        name="budget" 
        id="budget" 
        className={`block w-full h-16 rounded-xl pl-10 pr-12 focus:ring-opacity-50 text-xl font-medium transition-all duration-300 ${
          hasError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-4' 
            : 'border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC] focus:ring-4 focus:shadow-lg'
        }`}
        placeholder="0.00" 
        value={displayValue} 
        onChange={handleChange} 
        inputMode="numeric" 
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <span className="text-gray-400 sm:text-base">PHP</span>
      </div>
    </div>
  );
};

export default BudgetInput;