import React, { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Book, Settings, ArrowLeft, User, Flame, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNav?: boolean;
  isQuiz?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBack = false, 
  showNav = true,
  isQuiz = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProgress, userProfile, theme } = useApp();
  
  const handleBack = () => {
    navigate(-1);
  };

  const isActive = (path: string) => location.pathname === path;
  const BGClass = theme == 'dark' ? 'gradient-bg-dark' : 'gradient-bg';  
  const quizBGClass = theme == 'dark' ? 'quiz-gradient-bg-dark' : 'quiz-gradient-bg'; 

  return (
    <div className={`flex flex-col h-full ${isQuiz ? quizBGClass : BGClass} ${theme === 'dark' ? 'dark' : ''}`}>
     
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            {showBack ? (
              <button 
                onClick={handleBack}
                className="mr-2 p-2 rounded-full hover:bg-neutral-100"
                aria-label="Go back"
              >
                <ArrowLeft size={24} />
              </button>
            ) : (
              <div className="flex items-center">
                <span className="text-primary-500 font-bold">Fluent</span>
                <span className="text-primary-500 font-bold">95</span>
              </div>
            )}
            
            {title && (
              <h1 className="text-md font-bold ml-2">{title}</h1>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!title && (  
              <button
                onClick={() => navigate('/global-score')}
                className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900"
              >
                <Trophy size={16} className="text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  #{userProfile.globalRank || '---'}
                </span>
              </button>
            )}

            <div className="flex items-center">
              <Flame className="text-warning-500" size={20} />
              <span className="ml-1 font-bold">{userProgress.streak || 0}</span>
            </div>
            
            <button 
              onClick={() => navigate("/profile")}
              className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"
            >
              <User size={20} className="text-primary-600" />
            </button>
          </div>
        </div>
      </header>
      
      
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="container mx-auto px-4 py-4"
        >
          {children}
        </motion.div>
      </main>
      
      {/* Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg border-t border-neutral-200 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-around">
              <NavButton 
                icon={<Home size={24} />} 
                label="Home" 
                active={isActive('/')}
                onClick={() => navigate('/')} 
              />
              <NavButton 
                icon={<Book size={24} />} 
                label="Vocabulary" 
                active={isActive('/vocabulary')}
                onClick={() => navigate('/vocabulary')} 
              />
              <NavButton 
                icon={<Settings size={24} />} 
                label="Settings" 
                active={isActive('/settings')}
                onClick={() => navigate('/settings')} 
              />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center py-3 w-1/3 relative ${
        active ? 'text-primary-500' : 'text-neutral-500'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      {active && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute bottom-0 w-1/2 h-0.5 bg-primary-500 rounded-t-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};

export default Layout;