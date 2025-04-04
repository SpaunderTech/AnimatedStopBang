import React from 'react';
import { AlertCircle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mb-3 text-xs text-blue-900">
      <div className="flex gap-1.5 items-start">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium mb-1">Medical Disclaimer</p>
          <p>
            This screening tool is for informational purposes only and should not be used for self-diagnosis. 
            The results do not substitute professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or qualified healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;