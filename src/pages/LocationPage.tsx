import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPinIcon, SearchIcon, MapIcon, ListIcon, ChevronRightIcon } from 'lucide-react';
interface LocationState {
  budget: number;
  allocation: {
    transport: number;
    food: number;
    activities: number;
    emergency: number;
  };
  preferences: {
    travelStyle: string;
    companions: string;
    locationType: string;
    duration: string;
    transportMode: string;
  };
}
const popularLocations = [{
  id: 'makati',
  name: 'Makati'
}, {
  id: 'bgc',
  name: 'BGC'
}, {
  id: 'qc',
  name: 'Quezon City'
}, {
  id: 'manila',
  name: 'Manila'
}, {
  id: 'pasig',
  name: 'Pasig'
}, {
  id: 'tagaytay',
  name: 'Tagaytay'
}];
const LocationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    budget,
    allocation,
    preferences
  } = location.state as LocationState || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isMapView, setIsMapView] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };
  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation(position);
        setIsLoadingLocation(false);
        // In a real app, we would reverse geocode to get the location name
        setSelectedLocation('current');
      }, error => {
        console.error('Error getting location:', error);
        setIsLoadingLocation(false);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
    }
  };
  const handleContinue = () => {
    navigate('/loading', {
      state: {
        budget,
        allocation,
        preferences,
        location: selectedLocation
      }
    });
  };
  // Filter locations based on search query
  const filteredLocations = popularLocations.filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Select Your Starting Point
      </h1>
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
        </div>
        <input type="text" placeholder="Search locations..." value={searchQuery} onChange={handleSearch} className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] focus:ring-opacity-50 transition-all duration-200" />
      </div>
      <div className="mb-6">
        <button onClick={handleGetCurrentLocation} className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200" disabled={isLoadingLocation}>
          <MapPinIcon className="mr-2 h-5 w-5 text-gradient-to-r from-[#AA0000] to-[#FF4D4D]" strokeWidth={1.5} />
          {isLoadingLocation ? 'Getting location...' : 'Use current location'}
        </button>
      </div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">
          Popular starting points
        </h2>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setIsMapView(false)} className={`p-2 rounded-md transition-all duration-200 ${!isMapView ? 'bg-white shadow-sm text-[#0066CC]' : 'bg-transparent text-gray-500'}`}>
            <ListIcon className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsMapView(true)} className={`p-2 rounded-md transition-all duration-200 ${isMapView ? 'bg-white shadow-sm text-[#0066CC]' : 'bg-transparent text-gray-500'}`}>
            <MapIcon className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {!isMapView ? <div className="grid grid-cols-2 gap-3 mb-8">
          {filteredLocations.map(loc => <button key={loc.id} onClick={() => handleLocationSelect(loc.id)} className={`py-4 px-4 border rounded-xl text-center transition-all duration-200 ${selectedLocation === loc.id ? 'border-[#0066CC] bg-blue-50 text-[#0066CC] shadow-md' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}>
              {loc.name}
            </button>)}
        </div> : <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-8 overflow-hidden shadow-inner">
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
      <div className="fixed bottom-20 md:relative md:bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:border-0 md:bg-transparent shadow-lg md:shadow-none">
        <button onClick={handleContinue} disabled={!selectedLocation} className={`w-full flex items-center justify-center py-4 px-4 rounded-xl shadow-md text-lg font-medium text-white transition-all duration-300 ${selectedLocation ? 'bg-gradient-to-r from-[#0055CC] to-[#0077DD] hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed'}`}>
          Continue <ChevronRightIcon className="ml-2 h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      <div className="h-16 md:hidden"></div> {/* Spacer for mobile */}
    </div>;
};
export default LocationPage;