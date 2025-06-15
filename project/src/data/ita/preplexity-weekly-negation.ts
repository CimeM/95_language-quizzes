import { ThemeQuiz } from '../../types';

export const weeklyQuizzes: ThemeQuiz[] = [
  // A2: Basic Negation with "non" and simple negative words
  {
    "id": "negation-a2-it-1",
    "level": "A2",
    "title": "Negazione di base (A2)",
    "language": "ita",
    "theme": "negation",
    "description": "Scegli la forma negativa corretta per completare la frase.",
    "medal": "none",
    "maxScore": 10,
    "timeLimit": 90,
    "questions": [
      {
        "id": "it-neg1-1",
        "text": "Io ____ parlo inglese. (I do not speak English)",
        "options": ["non", "nessuno", "mai", "niente"],
        "correctAnswer": "non"
      },
      {
        "id": "it-neg1-2",
        "text": "Luca ____ mangia carne. (Luca never eats meat)",
        "options": ["non", "mai", "nessuno", "niente"],
        "correctAnswer": "non"
      },
      {
        "id": "it-neg1-3",
        "text": "Non ho ____ da fare. (I have nothing to do)",
        "options": ["niente", "mai", "nessuno", "più"],
        "correctAnswer": "niente"
      },
      {
        "id": "it-neg1-4",
        "text": "Maria ____ va al cinema. (Maria never goes to the cinema)",
        "options": ["mai", "non", "nessuno", "niente"],
        "correctAnswer": "mai"
      },
      {
        "id": "it-neg1-5",
        "text": "Non c'è ____ in casa. (There is nobody at home)",
        "options": ["nessuno", "mai", "niente", "non"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-neg1-6",
        "text": "Non voglio ____ da bere. (I don't want anything to drink)",
        "options": ["niente", "mai", "nessuno", "più"],
        "correctAnswer": "niente"
      }
    ]
  },

  // B1: Double negatives, negative adverbs, and negative pronouns
  {
    "id": "negation-b1-it-1",
    "level": "B1",
    "title": "Negazione intermedia (B1)",
    "language": "ita",
    "theme": "negation",
    "description": "Completa la frase con la struttura negativa corretta, inclusi doppi negativi e avverbi negativi.",
    "medal": "none",
    "maxScore": 10,
    "timeLimit": 90,
    "questions": [
      {
        "id": "it-neg2-1",
        "text": "Non ho visto ____ ieri. (I didn't see anyone yesterday)",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-neg2-2",
        "text": "Non voglio ____ aiutarmi. (Nobody wants to help me)",
        "options": ["nessuno", "niente", "mai", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-neg2-3",
        "text": "Non mangio ____ carne. (I don't eat meat anymore)",
        "options": ["più", "mai", "niente", "nessuno"],
        "correctAnswer": "più"
      },
      {
        "id": "it-neg2-4",
        "text": "Non ho ____ capito. (I didn't understand anything)",
        "options": ["niente", "mai", "nessuno", "più"],
        "correctAnswer": "niente"
      },
      {
        "id": "it-neg2-5",
        "text": "Non ho ____ visto quel film. (I have never seen that film)",
        "options": ["mai", "niente", "nessuno", "più"],
        "correctAnswer": "mai"
      },
      {
        "id": "it-neg2-6",
        "text": "Non c'è ____ da fare. (There is nothing to do)",
        "options": ["niente", "mai", "nessuno", "più"],
        "correctAnswer": "niente"
      },
      {
        "id": "it-neg2-7",
        "text": "Non parlo con ____ . (I don't speak with anyone)",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      }
    ]
  },

  // B2: Advanced negation, negative concord, and negative expressions
  {
    "id": "negation-b2-it-1",
    "level": "B2",
    "title": "Negazione avanzata (B2)",
    "language": "ita",
    "theme": "negation",
    "description": "Scegli la struttura negativa più appropriata per frasi complesse e usi avanzati.",
    "medal": "none",
    "maxScore": 10,
    "timeLimit": 90,
    "questions": [
      {
        "id": "it-neg3-1",
        "text": "Non ho visto ____ dei miei amici alla festa. (I didn't see any of my friends at the party)",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-neg3-2",
        "text": "Non ho ____ finito il lavoro. (I haven't finished the work yet)",
        "options": ["ancora", "mai", "più", "niente"],
        "correctAnswer": "ancora"
      },
      {
        "id": "it-neg3-3",
        "text": "Non c'è ____ da preoccuparsi. (There is nothing to worry about)",
        "options": ["niente", "mai", "nessuno", "più"],
        "correctAnswer": "niente"
      },
      {
        "id": "it-neg3-4",
        "text": "Non voglio vedere ____ . (I don't want to see anyone)",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-neg3-5",
        "text": "Non ho ____ sentito una cosa simile. (I have never heard such a thing)",
        "options": ["mai", "ancora", "niente", "nessuno"],
        "correctAnswer": "mai"
      },
      {
        "id": "it-neg3-6",
        "text": "Non c'è ____ da dire. (There is nothing to say)",
        "options": ["niente", "mai", "nessuno", "più"],
        "correctAnswer": "niente"
      },
      {
        "id": "it-neg3-7",
        "text": "Non vado ____ a scuola. (I no longer go to school)",
        "options": ["più", "mai", "niente", "nessuno"],
        "correctAnswer": "più"
      },
      {
        "id": "it-neg3-8",
        "text": "Non ho visto ____ alla riunione, né Marco né Giulia. (I saw neither Marco nor Giulia at the meeting)",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      }
    ]
  },
  {
    "id": "negation-concord-b1-it-1",
    "level": "B1",
    "title": "Concordanza della negazione (B1-B2)",
    "language": "ita",
    "theme": "negation",
    "description": "Completa la frase con la struttura negativa corretta, usando la doppia negazione dove necessario.",
    "medal": "none",
    "maxScore": 10,
    "timeLimit": 90,
    "questions": [
      {
        "id": "it-negcon1-1",
        "text": "Non ho visto ____ ieri sera.",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-negcon1-2",
        "text": "Non voglio parlare con ____.",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-negcon1-3",
        "text": "Non ho detto ____ a ____.",
        "options": ["niente...nessuno", "mai...nessuno", "niente...mai", "nessuno...niente"],
        "correctAnswer": "niente...nessuno"
      },
      {
        "id": "it-negcon1-4",
        "text": "Non c'è ____ che mi possa aiutare.",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-negcon1-5",
        "text": "Non voglio più vedere ____.",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      },
      {
        "id": "it-negcon1-6",
        "text": "Non ho mai visto ____ di simile.",
        "options": ["niente", "nessuno", "mai", "più"],
        "correctAnswer": "niente"
      },
      {
        "id": "it-negcon1-7",
        "text": "Non ho parlato con ____ durante la riunione.",
        "options": ["nessuno", "mai", "niente", "più"],
        "correctAnswer": "nessuno"
      }
    ]
  },

  // B2: Negative Imperative
  {
    "id": "negation-imperative-b2-it-1",
    "level": "B2",
    "title": "Imperativo negativo (B2)",
    "language": "ita",
    "theme": "negation",
    "description": "Scegli la forma corretta dell'imperativo negativo per completare la frase.",
    "medal": "none",
    "maxScore": 10,
    "timeLimit": 90,
    "questions": [
      {
        "id": "it-negimp1-1",
        "text": "____ parlare! (Don't speak!)",
        "options": ["Non parlare", "Non parli", "Non parlando", "Non parlato"],
        "correctAnswer": "Non parlare"
      },
      {
        "id": "it-negimp1-2",
        "text": "____ tardi! (Don't arrive late!)",
        "options": ["Non arrivare", "Non arrivi", "Non arrivato", "Non arrivando"],
        "correctAnswer": "Non arrivare"
      },
      {
        "id": "it-negimp1-3",
        "text": "Ragazzi, ____ rumore! (Don't make noise!)",
        "options": ["non fate", "non fanno", "non facciamo", "non fatevi"],
        "correctAnswer": "non fate"
      },
      {
        "id": "it-negimp1-4",
        "text": "____ paura! (Don't be afraid!)",
        "options": ["Non avere", "Non avendo", "Non avrai", "Non abbia"],
        "correctAnswer": "Non avere"
      },
      {
        "id": "it-negimp1-5",
        "text": "Signora, ____ qui. (Don't stay here!)",
        "options": ["non stia", "non stare", "non stai", "non stanno"],
        "correctAnswer": "non stia"
      },
      {
        "id": "it-negimp1-6",
        "text": "____ di dimenticare le chiavi! (Don't forget the keys!)",
        "options": ["Non dimenticare", "Non dimentichi", "Non dimenticato", "Non dimenticando"],
        "correctAnswer": "Non dimenticare"
      }
    ]
  },

  // B2/C1: Negative Subjunctive and Advanced Negation
  {
    "id": "negation-subjunctive-c1-it-1",
    "level": "C1",
    "title": "Negazione e congiuntivo (C1)",
    "language": "ita",
    "theme": "negation",
    "description": "Completa la frase scegliendo la forma negativa corretta con il congiuntivo.",
    "medal": "none",
    "maxScore": 10,
    "timeLimit": 90,
    "questions": [
      {
        "id": "it-negsubj1-1",
        "text": "Non credo che lui ____ (sapere) la verità.",
        "options": ["sappia", "sa", "sapesse", "saprà"],
        "correctAnswer": "sappia"
      },
      {
        "id": "it-negsubj1-2",
        "text": "Non penso che loro ____ (essere) pronti.",
        "options": ["siano", "sono", "fossero", "saranno"],
        "correctAnswer": "siano"
      },
      {
        "id": "it-negsubj1-3",
        "text": "Non è vero che tu ____ (avere) torto.",
        "options": ["abbia", "hai", "avessi", "avrà"],
        "correctAnswer": "abbia"
      },
      {
        "id": "it-negsubj1-4",
        "text": "Non sono sicuro che noi ____ (potere) venire.",
        "options": ["possiamo", "possiate", "possiamo", "possiamo"],
        "correctAnswer": "possiamo"
      },
      {
        "id": "it-negsubj1-5",
        "text": "Non voglio che tu ____ (dire) niente a nessuno.",
        "options": ["dica", "dici", "dicessi", "dirai"],
        "correctAnswer": "dica"
      },
      {
        "id": "it-negsubj1-6",
        "text": "Non è possibile che voi ____ (fare) questo errore.",
        "options": ["facciate", "fate", "faceste", "farete"],
        "correctAnswer": "facciate"
      },
      {
        "id": "it-negsubj1-7",
        "text": "Non penso che lei ____ (venire) domani.",
        "options": ["venga", "viene", "venisse", "verrà"],
        "correctAnswer": "venga"
      },
      {
        "id": "it-negsubj1-8",
        "text": "Non credo che ci ____ (essere) una soluzione facile.",
        "options": ["sia", "è", "fosse", "sarà"],
        "correctAnswer": "sia"
      }
    ]
  }
];

