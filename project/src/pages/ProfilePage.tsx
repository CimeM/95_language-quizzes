import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Crown, Clock, Flame } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Plan , API_URL} from '../types';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const ProfilePage: React.FC = () => {
    const { userProgress } = useApp();
    
    const totalMedals = Object.values(userProgress.weeklyQuizzes).length;
    const goldMedals = Object.values(userProgress.weeklyQuizzes).filter(m => m === 'gold').length;
    const silverMedals = Object.values(userProgress.weeklyQuizzes).filter(m => m === 'silver').length;
    const bronzeMedals = Object.values(userProgress.weeklyQuizzes).filter(m => m === 'bronze').length;
    const navigate = useNavigate();
    
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
        try {
            const response = await fetch(API_URL+'/api/products');
            if (!response.ok) throw new Error("Failed to fetch plans");
            const data = await response.json();
            setPlans(data.plans); // assuming your endpoint returns { plans: [...] }
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
        };
        fetchPlans();
    }, []);
    
    const activePlan = userProgress.subscription 
        ? plans.find(p => p.title === userProgress.subscription?.planId)
        : null;

    const daysUntilExpiry = userProgress.subscription
        ? Math.ceil((new Date(userProgress.subscription.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    return (
        <Layout title="Profile">
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-primary-500 text-white"
            >
                <div className="flex items-center">
                <Flame size={24} className="mr-2" />
                <div>
                    <p className="text-sm font-medium">Daily Streak</p>
                    <p className="text-2xl font-bold">{userProgress.dailyStreak} days</p>
                </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card bg-accent-500 text-neutral-800"
            >
                <div className="flex items-center">
                <Trophy size={24} className="mr-2" />
                <div>
                    <p className="text-sm font-medium">Total Medals</p>
                    <p className="text-2xl font-bold">{totalMedals}</p>
                </div>
                </div>
            </motion.div>
            </div>

            {/* Subscription Status */}
            {activePlan && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white"
            >
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <Crown size={24} className="mr-2" />
                    <h3 className="text-lg font-bold">{activePlan.title}</h3>
                </div>
                <Clock size={20} />
                </div>
                
                <p className="text-primary-100 mb-2">{activePlan.description}</p>
                <p className="text-sm text-primary-100">
                Expires in {daysUntilExpiry} days
                </p>
            </motion.div>
            )}
            

            {/* Medals Breakdown */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            >
            <h3 className="text-lg font-bold mb-4">Medals Collection</h3>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center mr-3">
                    <Trophy size={16} className="text-neutral-800" />
                    </div>
                    <span>Gold Medals</span>
                </div>
                <span className="font-bold">{goldMedals}</span>
                </div>
                
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center mr-3">
                    <Trophy size={16} className="text-neutral-800" />
                    </div>
                    <span>Silver Medals</span>
                </div>
                <span className="font-bold">{silverMedals}</span>
                </div>
                
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                    <Trophy size={16} className="text-white" />
                    </div>
                    <span>Bronze Medals</span>
                </div>
                <span className="font-bold">{bronzeMedals}</span>
                </div>
            </div>
            </motion.div>
            {activePlan == null  && (
            <motion.div>
                <Card
                title="Active plan"
                description="Get the premium pass"
                icon={<Trophy size={24} />}
                onClick={() => navigate('/payment')}
                />
            </motion.div>
            )}
            

        </div>
        </Layout>
    );
}

export default ProfilePage;

function setError(arg0: any) {
    throw new Error('Function not implemented.');
}
