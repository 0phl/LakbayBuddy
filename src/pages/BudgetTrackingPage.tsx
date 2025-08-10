import React, { useState } from 'react';
import { PlusIcon, CameraIcon } from 'lucide-react';
// Sample categories for expenses
const expenseCategories = [{
  id: 'transport',
  name: 'Transport',
  gradient: 'from-[#0055CC] to-[#0077DD]',
  icon: '🚌'
}, {
  id: 'food',
  name: 'Food & Drinks',
  gradient: 'from-[#FFAA00] to-[#FFDD33]',
  icon: '🍜'
}, {
  id: 'activities',
  name: 'Activities',
  gradient: 'from-[#AA0000] to-[#FF4D4D]',
  icon: '🎭'
}, {
  id: 'shopping',
  name: 'Shopping',
  gradient: 'from-[#9933CC] to-[#BB66EE]',
  icon: '🛍️'
}, {
  id: 'other',
  name: 'Other',
  gradient: 'from-[#777777] to-[#AAAAAA]',
  icon: '📝'
}];
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  timestamp: number;
}
const BudgetTrackingPage = () => {
  const [budget, setBudget] = useState(3000); // Sample budget
  const [expenses, setExpenses] = useState<Expense[]>([{
    id: '1',
    amount: 350,
    category: 'activities',
    description: 'Intramuros tour',
    timestamp: Date.now() - 7200000
  }, {
    id: '2',
    amount: 500,
    category: 'food',
    description: 'Lunch at Binondo',
    timestamp: Date.now() - 3600000
  }, {
    id: '3',
    amount: 120,
    category: 'transport',
    description: 'Grab to National Museum',
    timestamp: Date.now() - 1800000
  }]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: ''
  });
  // Calculate total spent
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalSpent;
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};
  expenses.forEach(expense => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0;
    }
    expensesByCategory[expense.category] += expense.amount;
  });
  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category) return;
    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) return;
    const expense: Expense = {
      id: Date.now().toString(),
      amount,
      category: newExpense.category,
      description: newExpense.description || 'No description',
      timestamp: Date.now()
    };
    setExpenses([expense, ...expenses]);
    setNewExpense({
      amount: '',
      category: '',
      description: ''
    });
    setShowAddExpense(false);
  };
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  return <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Budget Tracker</h1>
      <div className="bg-white rounded-xl shadow-md p-5 mb-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="text-xl font-bold text-gray-800">
              ₱{budget.toLocaleString('en-PH')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className={`text-xl font-bold ${remainingBudget < 0 ? 'text-[#FF4D4D]' : 'text-[#00BB44]'}`}>
              ₱{remainingBudget.toLocaleString('en-PH')}
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div className={`h-full transition-all duration-300 ${remainingBudget < 0 ? 'bg-gradient-to-r from-[#AA0000] to-[#FF4D4D]' : 'bg-gradient-to-r from-[#007722] to-[#00BB44]'}`} style={{
          width: `${Math.min(100, totalSpent / budget * 100)}%`
        }}></div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-5 mb-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-lg font-medium mb-5 text-gray-800">
          Spending by Category
        </h2>
        <div className="space-y-4">
          {expenseCategories.map(category => {
          const amount = expensesByCategory[category.id] || 0;
          const percentage = budget > 0 ? amount / budget * 100 : 0;
          return <div key={category.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{category.icon}</span>
                    <span className="font-medium text-gray-800">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-800">
                      ₱{amount.toLocaleString('en-PH')}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full bg-gradient-to-r ${category.gradient} transition-all duration-300`} style={{
                width: `${percentage}%`
              }}></div>
                </div>
              </div>;
        })}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">Recent Expenses</h2>
          <button onClick={() => setShowAddExpense(true)} className="p-2 rounded-full bg-gradient-to-r from-[#0055CC] to-[#0077DD] text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
            <PlusIcon className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {expenses.map(expense => {
          const category = expenseCategories.find(cat => cat.id === expense.category);
          return <div key={expense.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors duration-200">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shadow-sm bg-gradient-to-r ${category?.gradient}`}>
                  {category?.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatTime(expense.timestamp)}
                  </p>
                </div>
                <div className="font-bold text-gray-800">
                  ₱{expense.amount.toLocaleString('en-PH')}
                </div>
              </div>;
        })}
        </div>
      </div>
      {showAddExpense && <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-end justify-center z-50 md:items-center animate-fade-in">
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Add Expense
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₱)
                </label>
                <input type="number" id="amount" value={newExpense.amount} onChange={e => setNewExpense({
              ...newExpense,
              amount: e.target.value
            })} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-[#0066CC] focus:border-[#0066CC] focus:ring-opacity-50 transition-all duration-200" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {expenseCategories.map(category => <button key={category.id} onClick={() => setNewExpense({
                ...newExpense,
                category: category.id
              })} className={`p-3 rounded-xl flex flex-col items-center transition-all duration-200 ${newExpense.category === category.id ? `bg-gradient-to-r ${category.gradient} bg-opacity-10 border-2 border-[#0066CC] shadow-md` : 'bg-white border border-gray-200 hover:border-gray-300'}`}>
                      <span className="text-2xl mb-1">{category.icon}</span>
                      <span className="text-xs font-medium">
                        {category.name}
                      </span>
                    </button>)}
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="flex">
                  <input type="text" id="description" value={newExpense.description} onChange={e => setNewExpense({
                ...newExpense,
                description: e.target.value
              })} className="flex-1 p-3 border border-gray-200 rounded-l-xl focus:ring-[#0066CC] focus:border-[#0066CC] focus:ring-opacity-50 transition-all duration-200" placeholder="What did you spend on?" />
                  <button className="p-3 bg-gray-100 border border-gray-200 border-l-0 hover:bg-gray-200 transition-colors duration-200">
                    <div className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                  </button>
                  <button className="p-3 bg-gray-100 border border-gray-200 border-l-0 rounded-r-xl hover:bg-gray-200 transition-colors duration-200">
                    <CameraIcon className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <button onClick={() => setShowAddExpense(false)} className="flex-1 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200">
                  Cancel
                </button>
                <button onClick={handleAddExpense} className="flex-1 py-3 px-4 bg-gradient-to-r from-[#0055CC] to-[#0077DD] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>}
      <div className="h-16 md:hidden"></div> {/* Spacer for mobile */}
    </div>;
};
export default BudgetTrackingPage;