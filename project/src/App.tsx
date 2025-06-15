import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import WeeklyQuizzesPage from './pages/WeeklyQuizzesPage';
import QuizPage from './pages/QuizPage';
import VocabularyPage from './pages/VocabularyPage';
import SettingsPage from './pages/SettingsPage';
import ResultsPage from './pages/ResultsPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import GlobalScorePage from './pages/GlobalScorePage';
import { useAuth } from './context/AuthContext';
import { QuizDataProvider } from './context/QuizDataContext';
import { VocabularyDataProvider } from './context/VocabularyDataContext';
import { ToastContainer } from 'react-toastify';
import VocabularyCategoryPage from './pages/VocabularyCategoryPage';

function App() {
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <QuizDataProvider>
      <VocabularyDataProvider>
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/campaign" element={user ? <CampaignPage /> : <Navigate to="/login" />} />
          <Route path="/campaign/weekly" element={user ? <WeeklyQuizzesPage /> : <Navigate to="/login" />} />
          <Route path="/quiz/:quizId" element={user ? <QuizPage /> : <Navigate to="/login" />} />
          <Route path="/results/:quizId" element={user ? <ResultsPage /> : <Navigate to="/login" />} />
          <Route path="/vocabulary" element={user ? <VocabularyPage /> : <Navigate to="/login" />} />
          <Route path="/vocabulary/category/:categoryId" element={user ? <VocabularyCategoryPage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/global-score" element={<GlobalScorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </VocabularyDataProvider>
    </QuizDataProvider>
    </>
  );
}

export default App;