import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import BudgetBreakdown from '../components/BudgetBreakdown';
import PreferenceSelector from '../components/PreferenceSelector';
interface LocationState {
  budget: number;
}
const PreferencesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    budget = 0
  } = location.state as LocationState || {};
  const [allocation, setAllocation] = useState({
    transport: 30,
    food: 40,
    activities: 25,
    emergency: 5
  });
  const [preferences, setPreferences] = useState({
    travelStyle: '',
    companions: '',
    locationType: '',
    duration: '',
    transportMode: ''
  });
  const handleAllocationChange = (category: keyof typeof allocation, value: number) => {
    setAllocation(prev => ({
      ...prev,
      [category]: value
    }));
  };
  const handlePreferenceSelect = (category: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };
  const handleContinue = () => {
    navigate('/location', {
      state: {
        budget,
        allocation,
        preferences
      }
    });
  };
  const isComplete = Object.values(preferences).every(val => val !== '');
  return <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Customize Your Trip
      </h1>
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
        <BudgetBreakdown budget={budget} allocation={allocation} onChange={handleAllocationChange} />
      </div>
      <div className="space-y-5 mb-8">
        <PreferenceSelector title="Travel Style" options={[{
        id: 'adventure',
        label: 'Adventure',
        icon: '🧗‍♂️'
      }, {
        id: 'relaxing',
        label: 'Relaxing',
        icon: '🏖️'
      }, {
        id: 'cultural',
        label: 'Cultural',
        icon: '🏛️'
      }, {
        id: 'foodtrip',
        label: 'Food Trip',
        icon: '🍜'
      }, {
        id: 'nature',
        label: 'Nature',
        icon: '🌿'
      }]} selected={preferences.travelStyle} onSelect={value => handlePreferenceSelect('travelStyle', value)} />
        <PreferenceSelector title="Companions" options={[{
        id: 'solo',
        label: 'Solo',
        icon: '🧍'
      }, {
        id: 'couple',
        label: 'Couple',
        icon: '👫'
      }, {
        id: 'barkada',
        label: 'Barkada',
        icon: '👥'
      }, {
        id: 'family',
        label: 'Family',
        icon: '👨‍👩‍👧‍👦'
      }, {
        id: 'kids',
        label: 'With Kids',
        icon: '👶'
      }]} selected={preferences.companions} onSelect={value => handlePreferenceSelect('companions', value)} />
        <PreferenceSelector title="Location Type" options={[{
        id: 'metro',
        label: 'Metro Manila',
        icon: '🏙️'
      }, {
        id: 'provinces',
        label: 'Nearby Provinces',
        icon: '🏞️'
      }, {
        id: 'beach',
        label: 'Beach',
        icon: '🏝️'
      }, {
        id: 'mountains',
        label: 'Mountains',
        icon: '⛰️'
      }, {
        id: 'city',
        label: 'City',
        icon: '🌆'
      }]} selected={preferences.locationType} onSelect={value => handlePreferenceSelect('locationType', value)} />
        <PreferenceSelector title="Duration" options={[{
        id: 'halfday',
        label: 'Half-day',
        icon: '🕛'
      }, {
        id: 'fullday',
        label: 'Full day',
        icon: '🌞'
      }, {
        id: 'weekend',
        label: 'Weekend',
        icon: '📅'
      }, {
        id: '3-5days',
        label: '3-5 days',
        icon: '📆'
      }]} selected={preferences.duration} onSelect={value => handlePreferenceSelect('duration', value)} />
        <PreferenceSelector title="Transport Mode" options={[{
        id: 'commute',
        label: 'Commute',
        icon: '🚌'
      }, {
        id: 'car',
        label: 'Car',
        icon: '🚗'
      }, {
        id: 'motorcycle',
        label: 'Motorcycle',
        icon: '🏍️'
      }]} selected={preferences.transportMode} onSelect={value => handlePreferenceSelect('transportMode', value)} />
      </div>
      <div className="fixed bottom-20 md:relative md:bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:border-0 md:bg-transparent shadow-lg md:shadow-none">
        <button onClick={handleContinue} disabled={!isComplete} className={`w-full flex items-center justify-center py-4 px-4 rounded-xl shadow-md text-lg font-medium text-white transition-all duration-300 ${isComplete ? 'bg-gradient-to-r from-[#0055CC] to-[#0077DD] hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed'}`}>
          Continue <ChevronRightIcon className="ml-2 h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      <div className="h-16 md:hidden"></div> {/* Spacer for mobile */}
    </div>;
};
export default PreferencesPage;