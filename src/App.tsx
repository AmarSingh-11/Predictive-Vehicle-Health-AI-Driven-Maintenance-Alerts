import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Header from './components/Header';
import VehicleStats from './components/VehicleStats';
import MaintenanceAlerts from './components/MaintenanceAlerts';
import HealthDashboard from './components/HealthDashboard';
import ChatInterface from './components/ChatInterface';
import Login from './components/Login';
import { useVehicleData } from './hooks/useVehicleData';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentData, historicalData, alerts } = useVehicleData();

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={() => setIsLoggedIn(false)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VehicleStats data={currentData} />
          <div className="lg:col-span-2">
            <HealthDashboard data={currentData} historicalData={historicalData} />
          </div>
        </div>
        
        <div className="mt-8">
          <MaintenanceAlerts alerts={alerts} />
        </div>
      </main>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
    </div>
  );
}

export default App;