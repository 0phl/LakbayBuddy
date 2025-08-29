import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XIcon } from 'lucide-react';
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
  location: string;
}
const loadingMessages = ['Checking weather in your area...', 'Finding the best spots within your budget...', 'Calculating transportation costs...', 'Searching for hidden gems...', 'Planning your perfect itinerary...', 'Checking opening hours...', 'Finding the best food spots...'];
const LoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    budget,
    allocation,
    preferences,
    location: startingPoint
  } = location.state as LocationState || {};
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  // Simulate loading process
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 2000);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          // Navigate to itinerary page after a short delay
          setTimeout(() => {
            navigate('/itinerary', {
              state: {
                budget,
                allocation,
                preferences,
                location: startingPoint,
                // In a real app, we would pass the generated itinerary here
                itinerary: generateMockItinerary()
              }
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);
    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [navigate, budget, allocation, preferences, startingPoint]);
  const handleCancel = () => {
    navigate('/');
  };
  // Mock function to generate a placeholder itinerary
  const generateMockItinerary = () => {
    return {
      date: new Date().toISOString().split('T')[0],
      timeBlocks: [{
        id: '1',
        time: '9:00 AM - 12:00 PM',
        location: 'Intramuros',
        activity: 'Historical Walking Tour',
        cost: 350,
        travelTime: '30 mins',
        image: 'https://images.unsplash.com/photo-1555958239-66a1d9e8251c'
      }, {
        id: '2',
        time: '12:00 PM - 2:00 PM',
        location: 'Binondo',
        activity: 'Authentic Filipino-Chinese Lunch',
        cost: 500,
        travelTime: '20 mins',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'
      }, {
        id: '3',
        time: '2:30 PM - 5:00 PM',
        location: 'National Museum',
        activity: 'Museum Visit',
        cost: 0,
        travelTime: '15 mins',
        image: 'https://images.unsplash.com/photo-1566127444988-38a96d2de4c4'
      }]
    };
  };
  return <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0055CC] via-[#0066CC] to-[#004C99] text-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Creating Your Itinerary</h1>
          <p className="text-blue-100 text-lg">
            {loadingMessages[currentMessage]}
          </p>
        </div>
        <div className="relative h-3 bg-white bg-opacity-20 rounded-full overflow-hidden mb-10 shadow-inner">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FFAA00] to-[#FFDD33]" style={{
          width: `${progress}%`,
          transition: 'width 0.3s ease-out'
        }}></div>
        </div>
        <div className="mb-10">
          <div className="inline-block p-6 rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-20 h-20 border-4 border-t-[#FFDD33] border-r-[#FFCC00] border-b-white border-l-white rounded-full animate-spin"></div>
          </div>
        </div>
        <button onClick={handleCancel} className="inline-flex items-center px-5 py-3 border border-white rounded-full text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200">
          <XIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Cancel
        </button>
      </div>
    </div>;
};
export default LoadingPage;