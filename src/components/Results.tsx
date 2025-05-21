import React from 'react';
import { RefreshCw, Calendar, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface ResultsProps {
  score: number;
  onReset: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Results: React.FC<ResultsProps> = ({ score, onReset, setIsModalOpen }) => {
  const getRiskLevel = () => {
    if (score <= 2) return { 
      level: 'Low Risk', 
      color: 'green',
      icon: CheckCircle,
      description: 'Your responses suggest a lower risk for sleep apnea.'
    };
    if (score <= 4) return { 
      level: 'Moderate Risk', 
      color: 'yellow',
      icon: AlertCircle,
      description: 'Your responses indicate a moderate risk for sleep apnea. Consider consulting a specialist.'
    };
    return { 
      level: 'High Risk', 
      color: 'red',
      icon: AlertTriangle,
      description: 'Your responses suggest a higher risk for sleep apnea. We strongly recommend consulting a sleep specialist.'
    };
  };

  const risk = getRiskLevel();
  const RiskIcon = risk.icon;



  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 text-center animate-fade-in max-w-sm mx-auto transform hover:scale-102 transition-all duration-300">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
          <RiskIcon className={`w-8 h-8 text-${risk.color}-500 animate-pulse`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Results</h2>
        <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
          {score}/8
        </div>
        <div className={`text-lg font-semibold mb-3 text-${risk.color}-600 animate-fade-in`}>
          {risk.level}
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {risk.description}
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={()=> setIsModalOpen(true)}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 gap-2 text-sm hover:scale-105 shadow-sm hover:shadow-md"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>
             
        <button
          onClick={onReset}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 gap-2 text-sm hover:scale-105 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          Start Again
        </button>
      </div>
      
    </div>
  );
};

export default Results;