import { useState, useEffect } from 'react';
import { VehicleData, Alert } from '../types/vehicle';
import { predictiveModel } from '../utils/predictiveModel';

const generateRandomData = (): VehicleData => ({
  engineSpeed: Math.floor(1500 + Math.random() * 2000),
  engineTemp: Math.floor(180 + Math.random() * 50),
  oilLevel: Math.floor(60 + Math.random() * 40),
  batteryVoltage: 11 + Math.random() * 2,
  fuelEfficiency: 25 + Math.random() * 8,
  engineHealth: 85 + Math.random() * 15,
  mileageToService: Math.floor(2000 + Math.random() * 1000),
});

export const useVehicleData = () => {
  const [currentData, setCurrentData] = useState<VehicleData>(generateRandomData());
  const [historicalData, setHistoricalData] = useState<VehicleData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRandomData();
      
      setHistoricalData(prev => {
        const updated = [currentData, ...prev].slice(0, 10);
        return updated;
      });
      
      setCurrentData(newData);
      
      const predictedAlerts = predictiveModel.predictMaintenanceNeeds(newData, historicalData);
      setAlerts(predictedAlerts);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentData, historicalData]);

  return { currentData, historicalData, alerts };
};