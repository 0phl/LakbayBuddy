import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';
import LocationPage from './pages/LocationPage';
import LoadingPage from './pages/LoadingPage';
import ItineraryPage from './pages/ItineraryPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import BudgetTrackingPage from './pages/BudgetTrackingPage';
import Navbar from './components/Navbar';
import SplashScreen from './pages/SplashScreen'

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={`w-full ${isHomePage ? 'h-screen' : 'min-h-screen'} bg-gray-50 text-gray-900 flex flex-col overflow-hidden`}>
      <Navbar />
      <main className={`flex-1 ${isHomePage ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
          <Route path="/budget" element={<BudgetTrackingPage />} />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}