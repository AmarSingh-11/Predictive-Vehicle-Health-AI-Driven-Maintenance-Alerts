import React, { useState } from 'react';
import { Mic, Send, X } from 'lucide-react';

export default function ChatInterface({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Vehicle Assistant</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-96 p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-800">
                Hello! I'm your vehicle health assistant. How can I help you today?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <Mic className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button className="p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}