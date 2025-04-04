import React, { useState } from 'react';
import { X } from 'lucide-react';

interface BMICalculatorProps {
  onClose: (bmi: number | null) => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ onClose }) => {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedBMI, setCalculatedBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightInInches = (parseFloat(feet) * 12) + parseFloat(inches || '0');
    const weightInPounds = parseFloat(weight);
    
    if (heightInInches > 0 && weightInPounds > 0) {
      // US BMI Formula: (weight in pounds * 703) / (height in inches)²
      const bmi = (weightInPounds * 703) / (heightInInches * heightInInches);
      setCalculatedBMI(parseFloat(bmi.toFixed(1)));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">BMI Calculator</h3>
          <button
            onClick={() => onClose(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Feet"
                  min="0"
                  max="8"
                />
                <span className="text-xs text-gray-500 mt-1 block">Feet</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Inches"
                  min="0"
                  max="11"
                />
                <span className="text-xs text-gray-500 mt-1 block">Inches</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight (lbs)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => {
                const val = e.target.value;
                // Allow empty string or numbers with up to one decimal place
                if (val === '' || /^\d*\.?\d{0,1}$/.test(val)) {
                  setWeight(val);
                }
              }}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter weight (e.g., 150.5)"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate BMI
          </button>

          {calculatedBMI !== null && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-center text-lg">
                ✅ Your BMI is <span className="font-bold">{calculatedBMI}</span>
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => onClose(calculatedBMI)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  ✔ Use BMI & Close
                </button>
                <button
                  onClick={() => onClose(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator