import React from 'react';
import { Calculator, Check, X as XIcon } from 'lucide-react';
import type { Question } from '../App';

interface QuestionCardProps {
  question: Question;
  answer?: boolean;
  onAnswer: (value: boolean) => void;
  onCalculateBMI: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswer,
  onCalculateBMI,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5">
      <div className="p-2.5">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold transition-all duration-300 hover:scale-110 hover:bg-blue-200">
              {question.letter}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">{question.title}</h3>
            <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{question.question}</p>
            
            <div className="mt-2 flex items-center gap-1.5">
              <button
                onClick={() => onAnswer(true)}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                  answer === true
                    ? 'bg-blue-600 text-white shadow-sm scale-102'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Check className={`w-3 h-3 ${answer === true ? 'animate-bounce-once' : ''}`} />
                Yes
              </button>
              <button
                onClick={() => onAnswer(false)}
                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                  answer === false
                    ? 'bg-blue-600 text-white shadow-sm scale-102'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <XIcon className={`w-3 h-3 ${answer === false ? 'animate-bounce-once' : ''}`} />
                No
              </button>
              
              {question.id === 'bmi' && (
                <button
                  onClick={onCalculateBMI}
                  className="px-2 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all duration-200 flex items-center gap-1 hover:scale-105"
                >
                  <Calculator className="w-3 h-3" />
                  <span className="text-xs">BMI</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;