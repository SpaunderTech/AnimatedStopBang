import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import BMICalculator from './components/BMICalculator';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';
import Disclaimer from './components/Disclaimer';

export type Question = {
  id: string;
  letter: string;
  title: string;
  question: string;
};

const questions: Question[] = [
  {
    id: 'snoring',
    letter: 'S',
    title: 'Snoring',
    question: 'Do you snore loudly (louder than talking or enough to be heard through doors)?'
  },
  {
    id: 'tired',
    letter: 'T',
    title: 'Tiredness',
    question: 'Do you often feel tired, fatigued, or sleepy during the day?'
  },
  {
    id: 'observed',
    letter: 'O',
    title: 'Observed Apnea',
    question: 'Has anyone observed you stop breathing while sleeping?'
  },
  {
    id: 'pressure',
    letter: 'P',
    title: 'Pressure (Blood)',
    question: 'Do you have or are being treated for high blood pressure?'
  },
  {
    id: 'bmi',
    letter: 'B',
    title: 'BMI',
    question: 'Is your BMI greater than 35 kg/m²?'
  },
  {
    id: 'age',
    letter: 'A',
    title: 'Age',
    question: 'Are you older than 50?'
  },
  {
    id: 'neck',
    letter: 'N',
    title: 'Neck Circumference',
    question: 'Is your neck circumference greater than 40 cm?'
  },
  {
    id: 'gender',
    letter: 'G',
    title: 'Gender',
    question: 'Are you male?'
  }
];

function App() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showBMICalculator, setShowBMICalculator] = useState(false);

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBMICalculatorClose = (bmi: number | null) => {
    if (bmi !== null) {
      handleAnswer('bmi', bmi > 35);
    }
    setShowBMICalculator(false);
  };

  const resetQuestions = () => {
    setAnswers({});
  };

  const answeredCount = Object.keys(answers).length;
  const allQuestionsAnswered = answeredCount === questions.length;

  return (
    <div className="h-[720px] w-[720px] mx-auto bg-gray-50 overflow-auto">
      <div className="p-4">
        <header className="text-center mb-3">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            STOP-BANG Sleep Apnea Assessment
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 bg-blue-100 rounded-full w-32">
              <div 
                className="h-1.5 bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-600">
              {answeredCount} of {questions.length}
            </span>
          </div>
        </header>

        <Disclaimer />

        {!allQuestionsAnswered ? (
          <div className="grid grid-cols-2 gap-2">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                answer={answers[question.id]}
                onAnswer={(value) => handleAnswer(question.id, value)}
                onCalculateBMI={() => question.id === 'bmi' && setShowBMICalculator(true)}
              />
            ))}
          </div>
        ) : (
          <Results 
            score={Object.values(answers).filter(Boolean).length}
            onReset={resetQuestions}
          />
        )}

        {!allQuestionsAnswered && (
          <button
            onClick={resetQuestions}
            className="fixed bottom-4 right-4 p-1.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
            title="Reset questions"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {showBMICalculator && (
          <BMICalculator onClose={handleBMICalculatorClose} />
        )}
      </div>
    </div>
  );
}

export default App;