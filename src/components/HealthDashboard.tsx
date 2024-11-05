import React from 'react';
import { VehicleData } from '../types/vehicle';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  data: VehicleData;
  historicalData: VehicleData[];
}

export default function HealthDashboard({ data, historicalData }: Props) {
  const getPerformanceChange = () => {
    if (historicalData.length === 0) return 0;
    const oldEfficiency = historicalData[historicalData.length - 1].fuelEfficiency;
    return ((data.fuelEfficiency - oldEfficiency) / oldEfficiency) * 100;
  };

  const performanceChange = getPerformanceChange();

  const chartData = {
    labels: [...historicalData.map((_, i) => `${i + 1}m ago`).reverse(), 'Now'],
    datasets: [
      {
        label: 'Engine Health',
        data: [...historicalData.map(d => d.engineHealth).reverse(), data.engineHealth],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Fuel Efficiency',
        data: [...historicalData.map(d => d.fuelEfficiency).reverse(), data.fuelEfficiency],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Health Overview</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Day
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
            Week
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
            Month
          </button>
        </div>
      </div>

      <div className="h-64 mb-6">
        <Line data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Fuel Efficiency</p>
          <p className="text-xl font-semibold text-gray-900">
            {data.fuelEfficiency.toFixed(1)} MPG
          </p>
          <p className={`text-sm ${performanceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {performanceChange >= 0 ? '↑' : '↓'} {Math.abs(performanceChange).toFixed(1)}%
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Engine Health</p>
          <p className="text-xl font-semibold text-gray-900">{data.engineHealth}%</p>
          <p className={`text-sm ${data.engineHealth > 90 ? 'text-green-600' : 'text-yellow-600'}`}>
            {data.engineHealth > 90 ? 'Excellent' : 'Good'}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Next Service</p>
          <p className="text-xl font-semibold text-gray-900">
            {data.mileageToService.toLocaleString()} mi
          </p>
          <p className="text-sm text-yellow-600">
            {Math.ceil(data.mileageToService / 100)} days
          </p>
        </div>
      </div>
    </div>
  );
}