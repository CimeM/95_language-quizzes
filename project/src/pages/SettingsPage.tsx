import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Bell, Moon, Info, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useApp();
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  const languages = [
    { value: 'french', label: 'French' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' },
  ];
  
  return (
    <Layout title="Settings">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Language Settings */}
        <motion.section variants={item}>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Globe size={20} className="mr-2 text-primary-500" />
            Language
          </h2>
          
          <div className="bg-white rounded-xl shadow-card p-4">
            <label className="block text-neutral-600 mb-2">Learning Language</label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </motion.section>
        
        {/* Notification Settings */}
        <motion.section variants={item}>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Bell size={20} className="mr-2 text-primary-500" />
            Notifications
          </h2>
          
          <div className="bg-white rounded-xl shadow-card divide-y divide-neutral-100">
            <div className="p-4 flex items-center justify-between">
              <span>Daily Reminders</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <span>Weekly Progress Reports</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </motion.section>
        
        {/* Appearance Settings */}
        <motion.section variants={item}>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Moon size={20} className="mr-2 text-primary-500" />
            Appearance
          </h2>
          
          <div className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
        </motion.section>
        
        {/* About */}
        <motion.section variants={item}>
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Info size={20} className="mr-2 text-primary-500" />
            About
          </h2>
          
          <div className="bg-white rounded-xl shadow-card divide-y divide-neutral-100">
            <div className="p-4 flex items-center justify-between">
              <span>App Version</span>
              <span className="text-neutral-500">1.0.0</span>
            </div>
            
            <button className="w-full p-4 flex items-center justify-between text-left">
              <span>Privacy Policy</span>
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between text-left">
              <span>Terms of Service</span>
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between text-left">
              <span className="text-error-600">Reset Progress</span>
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
          </div>
        </motion.section>
      </motion.div>
    </Layout>
  );
};

export default SettingsPage;