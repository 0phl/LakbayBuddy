import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapIcon, ListIcon, CheckIcon, ClockIcon, MapPinIcon, WalletIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
interface TimeBlock {
  id: string;
  time: string;
  location: string;
  activity: string;
  cost: number;
  travelTime: string;
  image: string;
}
interface Itinerary {
  date: string;
  timeBlocks: TimeBlock[];
}
interface LocationState {
  budget: number;
  allocation: {
    transport: number;
    food: number;
    activities: number;
    emergency: number;
  };
  preferences: object;
  location: string;
  itinerary: Itinerary;
}
const ItineraryPage = () => {
  const location = useLocation();
  const {
    budget,
    allocation,
    itinerary
  } = location.state as LocationState || {
    budget: 0,
    allocation: {
      transport: 0,
      food: 0,
      activities: 0,
      emergency: 0
    },
    itinerary: {
      date: '',
      timeBlocks: []
    }
  };
  const [isMapView, setIsMapView] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const handleToggleComplete = (id: string) => {
    setCompletedActivities(prev => prev.includes(id) ? prev.filter(actId => actId !== id) : [...prev, id]);
  };
  // Calculate total spent
  const totalSpent = itinerary.timeBlocks.reduce((sum, block) => sum + block.cost, 0);
  const remainingBudget = budget - totalSpent;
  return <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Itinerary</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setIsMapView(false)} className={`p-2 rounded-md transition-all duration-200 ${!isMapView ? 'bg-white shadow-sm text-[#0066CC]' : 'bg-transparent text-gray-500'}`}>
            <ListIcon className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsMapView(true)} className={`p-2 rounded-md transition-all duration-200 ${isMapView ? 'bg-white shadow-sm text-[#0066CC]' : 'bg-transparent text-gray-500'}`}>
            <MapIcon className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
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
            <p className={`text-xl font-bold ${remainingBudget < 0 ? 'text-gradient-to-r from-[#AA0000] to-[#FF4D4D]' : 'text-gradient-to-r from-[#007722] to-[#00BB44]'}`}>
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
      {!isMapView ? <div className="space-y-5">
          {itinerary.timeBlocks.map(block => <div key={block.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${completedActivities.includes(block.id) ? 'border-l-4 border-green-500' : ''}`}>
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src={`${block.image}?w=500&h=300&auto=format&fit=crop`} alt={block.activity} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute top-0 left-0 bg-gradient-to-r from-[#0055CC] to-[#0077DD] text-white px-4 py-2 rounded-br-lg text-sm font-medium shadow-md">
                  {block.time}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {block.activity}
                </h3>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1" strokeWidth={1.5} />
                  <span className="text-sm">{block.location}</span>
                  <ClockIcon className="h-4 w-4 ml-4 mr-1" strokeWidth={1.5} />
                  <span className="text-sm">{block.travelTime} travel</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <WalletIcon className="h-4 w-4 mr-2 text-gray-500" strokeWidth={1.5} />
                    <span className="font-medium text-gray-800">
                      ₱{block.cost.toLocaleString('en-PH')}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                      <ThumbsUpIcon className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                      <ThumbsDownIcon className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                    </button>
                    <button onClick={() => handleToggleComplete(block.id)} className={`p-2 rounded-full transition-colors duration-200 ${completedActivities.includes(block.id) ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      <CheckIcon className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
        </div> : <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="text-center text-gray-500">
            <MapIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" strokeWidth={1.5} />
            <p>
              Map view would be displayed here
              <br />
              <span className="text-sm text-gray-400">
                (Using Leaflet.js in the actual implementation)
              </span>
            </p>
          </div>
        </div>}
      <div className="h-16 md:hidden"></div> {/* Spacer for mobile */}
    </div>;
};
export default ItineraryPage;