import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import BudgetInput from '../components/BudgetInput';

const HomePage = () => {
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateBudget = (value: string): string[] => {
    const newErrors: string[] = [];
    
    if (!value || value.trim() === '') {
      newErrors.push('Budget amount is required');
    } else {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        newErrors.push('Please enter a valid number');
      } else if (numValue <= 0) {
        newErrors.push('Budget must be greater than ₱0');
      } else if (numValue < 100) {
        newErrors.push('Budget must be at least ₱100');
      } else if (numValue > 1000000) {
        newErrors.push('Budget cannot exceed ₱1,000,000');
      }
    }
    
    return newErrors;
  };

  const handleBudgetChange = (value: string) => {
    setBudget(value);
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateBudget(budget);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      navigate('/preferences', {
        state: {
          budget: Number(budget)
        }
      });
    }, 300);
  };

  const handleQuickBudget = (amount: string) => {
    setBudget(amount);
    setErrors([]); // Clear any existing errors
    // Remove automatic navigation - let user click the button instead
  };

  const hasErrors = errors.length > 0;
  const isFormValid = budget.trim() !== '' && !hasErrors;

  return (
    <div 
      className="h-screen bg-gradient-to-b from-[#0055CC] via-[#0066CC] to-[#004C99] text-white overflow-hidden relative"
      style={{ overflow: 'hidden', userSelect: 'none' }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 30px 30px',
          backgroundPosition: '0 0, 25px 25px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col h-full relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <img 
              src="/src/assets/images/saan-punta.svg" 
              alt="Saan tayo pupunta today?" 
              className="h-24 md:h-32 w-auto drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-gray-900 max-w-md mx-auto w-full transform transition-all border border-white/20"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="budget" className="block text-lg font-medium text-gray-700 mb-2">
                Magkano ang budget mo?
              </label>
              <BudgetInput 
                value={budget} 
                onChange={handleBudgetChange}
                hasError={hasErrors}
              />
              
              {/* Error Messages */}
              {hasErrors && (
                <div className="mt-2 space-y-1">
                  {errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
            
            <motion.button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className={`w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-medium text-white transition-all duration-200 ${
                isFormValid && !isSubmitting
                  ? 'bg-gradient-to-r from-[#CC0000] to-[#FF4D4D] hover:from-[#AA0000] hover:to-[#CC0000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC0000]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Planning...
                </>
              ) : (
                <>
                  Mag-plan na!{' '}
                  <ArrowRightIcon className="ml-2 h-5 w-5" strokeWidth={2} />
                </>
              )}
            </motion.button>
          </form>
          
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Popular budget ranges:</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.button 
                onClick={() => handleQuickBudget('500')} 
                className="py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-50 transition-all duration-200 active:bg-gray-100"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                ₱500
              </motion.button>
              <motion.button 
                onClick={() => handleQuickBudget('1000')} 
                className="py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-50 transition-all duration-200 active:bg-gray-100"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                ₱1,000
              </motion.button>
              <motion.button 
                onClick={() => handleQuickBudget('2000')} 
                className="py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-50 transition-all duration-200 active:bg-gray-100"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                ₱2,000
              </motion.button>
              <motion.button 
                onClick={() => handleQuickBudget('5000')} 
                className="py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:ring-opacity-50 transition-all duration-200 active:bg-gray-100"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                ₱5,000+
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-blue-100 text-opacity-90 text-sm">
            Plan your perfect trip within your budget
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;