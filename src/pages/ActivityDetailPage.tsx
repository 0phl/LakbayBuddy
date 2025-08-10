import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, ClockIcon, WalletIcon, PhoneIcon, ExternalLinkIcon, HeartIcon, ShareIcon } from 'lucide-react';
// This is a mock activity - in a real app, this would come from an API or state
const mockActivity = {
  id: '1',
  name: 'Historical Walking Tour of Intramuros',
  location: 'Intramuros, Manila',
  description: 'Explore the historic walled city of Intramuros with a knowledgeable local guide. Visit key sites like Fort Santiago, San Agustin Church, and Manila Cathedral while learning about Philippine history during the Spanish colonial period.',
  cost: 350,
  duration: '3 hours',
  openingHours: '9:00 AM - 5:00 PM',
  contactNumber: '+63 2 1234 5678',
  website: 'www.intramuros.ph',
  rating: 4.7,
  reviews: 128,
  images: ['https://images.unsplash.com/photo-1555958239-66a1d9e8251c', 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d'],
  transportOptions: [{
    mode: 'Jeepney',
    cost: 15,
    time: '30 mins'
  }, {
    mode: 'Grab',
    cost: 180,
    time: '15 mins'
  }, {
    mode: 'LRT',
    cost: 30,
    time: '25 mins'
  }]
};
const ActivityDetailPage = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  // In a real app, we would fetch the activity details based on the ID
  const activity = mockActivity;
  const handleBack = () => {
    navigate(-1);
  };
  return <div className="pb-20 md:pb-6 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <div className="relative h-72 bg-gray-300 overflow-hidden">
        <img src={`${activity.images[0]}?w=800&h=400&auto=format&fit=crop`} alt={activity.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        <button onClick={handleBack} className="absolute top-4 left-4 p-3 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-md transition-all duration-200 transform hover:scale-105">
          <ArrowLeftIcon className="h-5 w-5 text-gray-800" strokeWidth={1.5} />
        </button>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-16 relative z-10 mx-2 sm:mx-6">
          <h1 className="text-2xl font-bold mb-3 text-gray-800">
            {activity.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-gradient-to-r from-yellow-100 to-amber-100 px-3 py-1 rounded-full shadow-sm">
              <span className="text-amber-700 font-medium mr-1">
                {activity.rating}
              </span>
              <div className="flex">
                {'★★★★★'.slice(0, Math.round(activity.rating)).split('').map((star, i) => <span key={i} className="text-amber-500">
                      ★
                    </span>)}
              </div>
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({activity.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <MapPinIcon className="h-5 w-5 mr-2 text-gray-500" strokeWidth={1.5} />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <ClockIcon className="h-5 w-5 mr-2 text-gray-500" strokeWidth={1.5} />
            <span>
              {activity.openingHours} • {activity.duration}
            </span>
          </div>
          <div className="flex items-center text-gray-700 mb-5">
            <WalletIcon className="h-5 w-5 mr-2 text-gray-500" strokeWidth={1.5} />
            <span className="font-medium">
              ₱{activity.cost.toLocaleString('en-PH')}
            </span>
          </div>
          <div className="border-t border-gray-100 pt-5 mb-6">
            <h2 className="text-lg font-medium mb-3 text-gray-800">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {activity.description}
            </p>
          </div>
          <div className="border-t border-gray-100 pt-5 mb-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              Transportation Options
            </h2>
            <div className="space-y-3">
              {activity.transportOptions.map((option, index) => <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#0055CC] to-[#0077DD] text-white p-3 rounded-lg mr-4 shadow-sm">
                      {option.mode === 'Jeepney' ? '🚌' : option.mode === 'Grab' ? '🚗' : '🚆'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{option.mode}</p>
                      <p className="text-sm text-gray-500">{option.time}</p>
                    </div>
                  </div>
                  <div className="font-medium text-gray-800">
                    ₱{option.cost}
                  </div>
                </div>)}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-5 mb-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-gray-500" strokeWidth={1.5} />
                <span className="text-gray-700">{activity.contactNumber}</span>
              </div>
              <div className="flex items-center">
                <ExternalLinkIcon className="h-5 w-5 mr-3 text-gray-500" strokeWidth={1.5} />
                <span className="text-[#0066CC]">{activity.website}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-[#0055CC] to-[#0077DD] hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Add to Itinerary
            </button>
            <button className="p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-200">
              <HeartIcon className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
            </button>
            <button className="p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-200">
              <ShareIcon className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <div className="h-16 md:hidden"></div> {/* Spacer for mobile */}
    </div>;
};
export default ActivityDetailPage;