import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { weeklyQuizzes, dailyChallenge } from '../data/quizData';
import { ThemeQuiz, Question } from '../types';
import { useApp } from '../context/AppContext';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { incrementDailyStreak, addCompletedQuiz } = useApp();
  
  const [quiz, setQuiz] = useState<ThemeQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  useEffect(() => {
    // Find the quiz data
    if (quizId === 'daily-challenge') {
      // Create a ThemeQuiz from dailyChallenge
      setQuiz({
        ...dailyChallenge,
        theme: 'grocery', // Placeholder theme
        medal: 'none',
        maxScore: dailyChallenge.questions.length,
      });
    } else {
      const foundQuiz = weeklyQuizzes.find(q => q.id === quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [quizId]);
  
  const handleSelectOption = (option: string) => {
    if (showFeedback) return; // Prevent changing answer during feedback
    
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (!currentQuestion) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
    
    // Show feedback
    setIsCorrect(option === currentQuestion.correctAnswer);
    setShowFeedback(true);
    
    // Automatically move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowFeedback(false);
      } else {
        // Quiz completed
        const score = calculateScore();
        
        if (quizId === 'daily-challenge') {
          incrementDailyStreak();
        } else {
          addCompletedQuiz(quizId || '');
        }
        
        navigate(`/results/${quizId}`, { 
          state: { 
            score, 
            total: quiz?.questions.length || 0 
          } 
        });
      }
    }, 1500);
  };
  
  const calculateScore = (): number => {
    if (!quiz) return 0;
    
    return quiz.questions.reduce((score, question) => {
      const selectedAnswer = selectedAnswers[question.id];
      return score + (selectedAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
  };
  
  if (!quiz) {
    return (
      <Layout showBack showNav={false}>
        <div className="flex justify-center items-center h-64">
          <p>Loading quiz...</p>
        </div>
      </Layout>
    );
  }
  
  const currentQuestion: Question | undefined = quiz.questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <Layout showBack showNav={false}>
        <div className="flex justify-center items-center h-64">
          <p>No questions found</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={quiz.title} showBack={false} showNav={false}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2.5">
          <div 
            className="bg-primary-500 h-2.5 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>
      </div>
      
      {/* Options */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {currentQuestion.options.map((option, index) => {
            const selected = selectedAnswers[currentQuestion.id] === option;
            const showCorrect = showFeedback && option === currentQuestion.correctAnswer;
            const showIncorrect = showFeedback && selected && option !== currentQuestion.correctAnswer;
            
            let bgColor = selected ? 'bg-primary-100 border-primary-300' : 'bg-white border-neutral-200';
            if (showCorrect) bgColor = 'bg-success-100 border-success-500';
            if (showIncorrect) bgColor = 'bg-error-100 border-error-500';
            
            return (
              <motion.button
                key={`${currentQuestion.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className={`w-full text-left p-4 rounded-xl border ${bgColor} transition-colors duration-200`}
                onClick={() => handleSelectOption(option)}
                disabled={showFeedback}
              >
                <div className="flex items-center">
                  <div className="mr-3 flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      selected ? 'border-primary-500 bg-primary-500 text-white' : 'border-neutral-300'
                    }`}>
                      {selected && <ChevronRight size={16} />}
                    </div>
                  </div>
                  <span>{option}</span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-success-50 text-success-800' : 'bg-error-50 text-error-800'}`}
          >
            <p className="font-medium">
              {isCorrect ? 'Correct!' : 'Not quite right.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default QuizPage;