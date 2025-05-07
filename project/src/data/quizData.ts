import { ThemeQuiz } from '../types';

export const weeklyQuizzes: ThemeQuiz[] = [
  {
    id: 'grocery-basics',
    title: 'Grocery Store Basics',
    theme: 'grocery',
    description: 'Learn essential vocabulary for shopping at the grocery store.',
    medal: 'none',
    maxScore: 10,
    questions: [
      {
        id: 'g1',
        text: 'What is the word for "apple"?',
        options: ['la pomme', 'la banane', 'le raisin', 'l\'orange'],
        correctAnswer: 'la pomme',
      },
      {
        id: 'g2',
        text: 'How do you ask "How much is this?"',
        options: ['Combien ça coûte?', 'Où est la caisse?', 'Je voudrais ça', 'C\'est tout'],
        correctAnswer: 'Combien ça coûte?',
      },
      // More questions would be added here
    ],
  },
  {
    id: 'transport-essentials',
    title: 'Train Station Talk',
    theme: 'transport',
    description: 'Master essential phrases for navigating train stations.',
    medal: 'none',
    maxScore: 10,
    questions: [
      {
        id: 't1',
        text: 'How do you ask "When does the train arrive?"',
        options: ['Quand arrive le train?', 'Où est le train?', 'Je cherche le train', 'Le train est en retard'],
        correctAnswer: 'Quand arrive le train?',
      },
      {
        id: 't2',
        text: 'What is the word for "ticket"?',
        options: ['le billet', 'la carte', 'le passeport', 'la monnaie'],
        correctAnswer: 'le billet',
      },
      // More questions would be added here
    ],
  },
  {
    id: 'park-vocabulary',
    title: 'Park Conversations',
    theme: 'park',
    description: 'Learn vocabulary for casual conversations at the park.',
    medal: 'none',
    maxScore: 10,
    questions: [
      {
        id: 'p1',
        text: 'How do you say "It\'s a beautiful day"?',
        options: ['Il fait beau aujourd\'hui', 'Il pleut', 'Il fait froid', 'Le temps est mauvais'],
        correctAnswer: 'Il fait beau aujourd\'hui',
      },
      {
        id: 'p2',
        text: 'What is the word for "tree"?',
        options: ['l\'arbre', 'la fleur', 'l\'herbe', 'le banc'],
        correctAnswer: 'l\'arbre',
      },
      // More questions would be added here
    ],
  },
  {
    id: 'restaurant-phrases',
    title: 'Restaurant Orders',
    theme: 'restaurant',
    description: 'Essential phrases for ordering food at a restaurant.',
    medal: 'none',
    maxScore: 10,
    questions: [
      {
        id: 'r1',
        text: 'How do you ask for the menu?',
        options: ['La carte, s\'il vous plaît', 'L\'addition, s\'il vous plaît', 'Une table pour deux', 'Je voudrais réserver'],
        correctAnswer: 'La carte, s\'il vous plaît',
      },
      {
        id: 'r2',
        text: 'How do you say "I would like..."?',
        options: ['Je voudrais', 'J\'aime', 'Je déteste', 'J\'ai'],
        correctAnswer: 'Je voudrais',
      },
      // More questions would be added here
    ],
  },
  {
    id: 'office-communication',
    title: 'Office Talk',
    theme: 'office',
    description: 'Learn vocabulary for professional office communication.',
    medal: 'none',
    maxScore: 10,
    questions: [
      {
        id: 'o1',
        text: 'How do you say "meeting"?',
        options: ['la réunion', 'le bureau', 'le travail', 'le projet'],
        correctAnswer: 'la réunion',
      },
      {
        id: 'o2',
        text: 'How do you ask "When is the deadline?"',
        options: ['Quelle est la date limite?', 'À quelle heure commence la réunion?', 'Où est votre bureau?', 'Avez-vous terminé le rapport?'],
        correctAnswer: 'Quelle est la date limite?',
      },
      // More questions would be added here
    ],
  },
];

export const dailyChallenge = {
  id: 'daily-challenge',
  title: 'Daily Challenge',
  description: 'Complete this daily challenge to maintain your streak!',
  questions: [
    {
      id: 'd1',
      text: 'What is the word for "hello"?',
      options: ['bonjour', 'au revoir', 'merci', 's\'il vous plaît'],
      correctAnswer: 'bonjour',
    },
    {
      id: 'd2',
      text: 'How do you say "thank you"?',
      options: ['merci', 'bonjour', 'au revoir', 's\'il vous plaît'],
      correctAnswer: 'merci',
    },
    {
      id: 'd3',
      text: 'What is the word for "yes"?',
      options: ['oui', 'non', 'peut-être', 'bonjour'],
      correctAnswer: 'oui',
    },
  ],
};