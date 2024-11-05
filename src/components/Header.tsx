import React from 'react';
import { Car, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Vehicle Health Monitor</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </button>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              History
            </button>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Settings
            </button>
            <button 
              onClick={onLogout}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}