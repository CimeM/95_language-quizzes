import { ThemeQuiz } from '../types';

export const weeklyQuizzes: ThemeQuiz[] = [
  {
    id: 'grocery-basics',
    title: 'Grocery Store Basics',
    language: "french",
    theme: 'grocery',
    description: 'Learn essential vocabulary for shopping at the grocery store.',
    medal: 'none',
    maxScore: 10,
    timeLimit: 60,
    questions: 
      [
        {
          id: "g1",
          text: "Comment appelle-t-on le rayon où l’on trouve le lait, le beurre et les yaourts ?",
          options: [
            "le rayon boucherie",
            "le rayon crèmerie",
            "le rayon épicerie",
            "le rayon surgelés"
          ],
          "correctAnswer": "le rayon crèmerie"
        },
        {
          id: "g2",
          text: "Quel produit n’est PAS un légume ?",
          options: [
            "la carotte",
            "la pomme de terre",
            "la fraise",
            "la courgette"
          ],
          "correctAnswer": "la fraise"
        },
        {
          id: "g3",
          text: "Vous voulez acheter du pain frais. Où allez-vous ?",
          options: [
            "à la poissonnerie",
            "à la boulangerie",
            "à la charcuterie",
            "au rayon boissons"
          ],
          "correctAnswer": "à la boulangerie"
        },
        {
          id: "g4",
          text: "Lequel de ces aliments est vendu au rayon surgelés ?",
          options: [
            "le riz",
            "la glace",
            "le fromage",
            "le miel"
          ],
          "correctAnswer": "la glace"
        },
        {
          id: "g5",
          text: "Comment dit-on « a dozen eggs » en français ?",
          options: [
            "une douzaine d’œufs",
            "un paquet d’œufs",
            "un kilo d’œufs",
            "un sac d’œufs"
          ],
          "correctAnswer": "une douzaine d’œufs"
        },
        {
          id: "g6",
          text: "Quel produit trouve-t-on typiquement à la charcuterie ?",
          options: [
            "le jambon",
            "la salade",
            "le yaourt",
            "le poisson"
          ],
          "correctAnswer": "le jambon"
        },
        {
          id: "g7",
          text: "Vous cherchez des pommes, des bananes et des poires. Dans quel rayon allez-vous ?",
          options: [
            "le rayon fruits et légumes",
            "le rayon poissonnerie",
            "le rayon boucherie",
            "le rayon crèmerie"
          ],
          "correctAnswer": "le rayon fruits et légumes"
        },
        {
          id: "g8",
          text: "Lequel de ces produits est une boisson ?",
          options: [
            "le jus d’orange",
            "le beurre",
            "le riz",
            "le poulet"
          ],
          "correctAnswer": "le jus d’orange"
        }
      ]
  },
  {
    id: 'transport-essentials',
    title: 'Train Station Talk',
    theme: 'transport',
    language: "french",
    description: 'Master essential phrases for navigating train stations.',
    medal: 'none',
    maxScore: 10,
    timeLimit: 60,
    questions: 
      [
        {
          id: "ts1",
          text: "Où achète-t-on un billet de train à la gare ?",
          options: [
            "au quai",
            "au guichet",
            "dans la voiture-bar",
            "à la salle d’attente"
          ],
          "correctAnswer": "au guichet"
        },
        {
          id: "ts2",
          text: "Comment s’appelle la plateforme où l’on attend le train ?",
          options: [
            "le quai",
            "la voie",
            "le guichet",
            "le terminus"
          ],
          "correctAnswer": "le quai"
        },
        {
          id: "ts3",
          text: "Que faut-il faire avec son billet avant de monter dans certains trains en France ?",
          options: [
            "le composter",
            "le rembourser",
            "le scanner à la sortie",
            "le donner à un voyageur"
          ],
          "correctAnswer": "le composter"
        },
        {
          id: "ts4",
          text: "Comment appelle-t-on la personne qui vérifie les billets dans le train ?",
          options: [
            "le conducteur",
            "le contrôleur",
            "le chef de gare",
            "le voyageur"
          ],
          "correctAnswer": "le contrôleur"
        },
        {
          id: "ts5",
          text: "Quel mot désigne un train qui arrive en retard ?",
          options: [
            "à l’heure",
            "en avance",
            "en retard",
            "annulé"
          ],
          "correctAnswer": "en retard"
        },
        {
          id: "ts6",
          text: "Si vous devez changer de train pendant votre voyage, quel mot utiliserez-vous ?",
          options: [
            "une correspondance",
            "un aller-retour",
            "un quai",
            "un abonnement"
          ],
          "correctAnswer": "une correspondance"
        },
        {
          id: "ts7",
          text: "Comment s’appelle la grande salle où les voyageurs attendent leur train ?",
          options: [
            "la salle d’attente",
            "la salle de contrôle",
            "le terminus",
            "la voiture-restaurant"
          ],
          "correctAnswer": "la salle d’attente"
        },
        {
          id: "ts8",
          text: "Quel document faut-il acheter pour faire un aller simple Paris-Lyon ?",
          options: [
            "un billet aller-retour",
            "un billet simple",
            "un abonnement mensuel",
            "un carnet de tickets"
          ],
          "correctAnswer": "un billet simple"
        }
      ]
  },
  {
    id: 'park-vocabulary',
    title: 'Park Conversations',
    theme: 'park',
    language: "french",
    description: 'Learn vocabulary for casual conversations at the park.',
    medal: 'none',
    maxScore: 10,
    timeLimit: 60,
    questions: 
      [
        {
          id: "pv1",
          text: "Comment s’appelle l’endroit où les enfants jouent dans un parc ?",
          options: [
            "le terrain de sport",
            "l’aire de jeux",
            "le kiosque",
            "le sentier"
          ],
          "correctAnswer": "l’aire de jeux"
        },
        {
          id: "pv2",
          text: "Quel mot désigne un chemin pour marcher dans le parc ?",
          options: [
            "le banc",
            "le sentier",
            "le lac",
            "la pelouse"
          ],
          "correctAnswer": "le sentier"
        },
        {
          id: "pv3",
          text: "Où peut-on s’asseoir pour se reposer dans un parc ?",
          options: [
            "sur un banc",
            "dans la fontaine",
            "sur le toboggan",
            "dans la serre"
          ],
          "correctAnswer": "sur un banc"
        },
        {
          id: "pv4",
          text: "Quel mot utilise-t-on pour parler d’un espace vert où l’on peut pique-niquer ?",
          options: [
            "la pelouse",
            "le kiosque",
            "le pont",
            "la volière"
          ],
          "correctAnswer": "la pelouse"
        },
        {
          id: "pv5",
          text: "Comment appelle-t-on l’endroit où l’on peut observer des canards dans un parc ?",
          options: [
            "le lac",
            "le terrain de basket",
            "le parking",
            "le manège"
          ],
          "correctAnswer": "le lac"
        },
        {
          id: "pv6",
          text: "Si vous voulez faire du sport en plein air, où allez-vous dans le parc ?",
          options: [
            "au terrain de sport",
            "à la serre",
            "au kiosque",
            "à la volière"
          ],
          "correctAnswer": "au terrain de sport"
        },
        {
          id: "pv7",
          text: "Quel mot décrit une petite maison ouverte où l’on peut écouter de la musique ou s’abriter ?",
          options: [
            "le kiosque",
            "le sentier",
            "le banc",
            "la fontaine"
          ],
          "correctAnswer": "le kiosque"
        },
        {
          id: "pv8",
          text: "Dans un parc, où pouvez-vous voir des fleurs exotiques à l’abri ?",
          options: [
            "dans la serre",
            "sur la pelouse",
            "au terrain de sport",
            "dans la volière"
          ],
          "correctAnswer": "dans la serre"
        }
      ]
  },
  {
    id: 'restaurant-phrases',
    title: 'Restaurant Orders',
    theme: 'restaurant',
    language: "french",
    description: 'Essential phrases for ordering food at a restaurant.',
    medal: 'none',
    maxScore: 10,
    timeLimit: 60,
    questions: 
      [
        {
          id: "rp1",
          text: "Quelle phrase utiliseriez-vous pour demander la carte au serveur ?",
          options: [
            "L’addition, s’il vous plaît.",
            "La carte, s’il vous plaît.",
            "Je voudrais une table.",
            "C’est délicieux !"
          ],
          "correctAnswer": "La carte, s’il vous plaît."
        },
        {
          id: "rp2",
          text: "Comment demander poliment un verre d’eau ?",
          options: [
            "Donnez-moi de l’eau.",
            "Je veux de l’eau.",
            "Je prends de l’eau.",
            "Pourrais-je avoir un verre d’eau, s’il vous plaît ?"
          ],
          "correctAnswer": "Pourrais-je avoir un verre d’eau, s’il vous plaît ?"
        },
        {
          id: "rp3",
          text: "Quelle phrase convient pour commander le plat du jour ?",
          options: [
            "Je voudrais le plat du jour, s’il vous plaît.",
            "Je veux la carte.",
            "L’addition, s’il vous plaît.",
            "C’est trop cher."
          ],
          "correctAnswer": "Je voudrais le plat du jour, s’il vous plaît."
        },
        {
          id: "rp4",
          text: "Comment demander si un plat contient des produits laitiers ?",
          options: [
            "Ce plat est-il servi chaud ?",
            "Ce plat contient-il des produits laitiers ?",
            "Ce plat est-il végétarien ?",
            "Ce plat est-il épicé ?"
          ],
          "correctAnswer": "Ce plat contient-il des produits laitiers ?"
        },
        {
          id: "rp5",
          text: "Quelle phrase utiliser pour appeler le serveur ?",
          options: [
            "Excusez-moi, s’il vous plaît !",
            "Je veux commander.",
            "Apportez-moi l’addition.",
            "C’est bon."
          ],
          "correctAnswer": "Excusez-moi, s’il vous plaît !"
        },
        {
          id: "rp6",
          text: "Comment demander la note à la fin du repas ?",
          options: [
            "La carte, s’il vous plaît.",
            "L’addition, s’il vous plaît.",
            "Le dessert, s’il vous plaît.",
            "Encore du pain, s’il vous plaît."
          ],
          "correctAnswer": "L’addition, s’il vous plaît."
        },
        {
          id: "rp7",
          text: "Quelle phrase utiliseriez-vous pour commander une cuisson de viande spécifique ?",
          options: [
            "Je voudrais mon steak saignant, s’il vous plaît.",
            "Je veux du poisson.",
            "Je prends un dessert.",
            "Apportez-moi de l’eau."
          ],
          "correctAnswer": "Je voudrais mon steak saignant, s’il vous plaît."
        },
        {
          id: "rp8",
          text: "Comment demander une recommandation au serveur ?",
          options: [
            "Que me recommandez-vous ?",
            "Je veux la carte.",
            "Apportez-moi le menu.",
            "L’addition, s’il vous plaît."
          ],
          "correctAnswer": "Que me recommandez-vous ?"
        }
      ]
  },
  {
    id: 'office-communication',
    title: 'Office Talk',
    theme: 'office',
    language: "french",
    description: 'Learn vocabulary for professional office communication.',
    medal: 'none',
    maxScore: 10,
    timeLimit: 60,
    questions: 
      [
        {
          id: "oc1",
          text: "Comment s’appelle la personne qui dirige une équipe au bureau ?",
          options: [
            "un employé",
            "un collègue",
            "un directeur / une directrice",
            "un stagiaire"
          ],
          "correctAnswer": "un directeur / une directrice"
        },
        {
          id: "oc2",
          text: "Quel objet utilise-t-on pour écrire sur du papier au bureau ?",
          options: [
            "un ordinateur",
            "un stylo",
            "une imprimante",
            "un téléphone"
          ],
          "correctAnswer": "un stylo"
        },
        {
          id: "oc3",
          text: "Quel mot désigne une réunion entre collègues pour discuter d’un projet ?",
          options: [
            "une pause",
            "une réunion",
            "une photocopie",
            "un rapport"
          ],
          "correctAnswer": "une réunion"
        },
        {
          id: "oc4",
          text: "Comment appelle-t-on le message électronique envoyé au travail ?",
          options: [
            "un courriel",
            "un rapport",
            "un classeur",
            "une réunion"
          ],
          "correctAnswer": "un courriel"
        },
        {
          id: "oc5",
          text: "Quel mot désigne l’endroit où l’on travaille ?",
          options: [
            "un bureau",
            "une imprimante",
            "un rapport",
            "un client"
          ],
          "correctAnswer": "un bureau"
        },
        {
          id: "oc6",
          text: "Si vous voulez imprimer un document, quel appareil utilisez-vous ?",
          options: [
            "une imprimante",
            "un téléphone",
            "une chaise",
            "une réunion"
          ],
          "correctAnswer": "une imprimante"
        },
        {
          id: "oc7",
          text: "Quel mot désigne un(e) collègue qui apprend le métier dans l’entreprise ?",
          options: [
            "un directeur",
            "un stagiaire",
            "un client",
            "un chef"
          ],
          "correctAnswer": "un stagiaire"
        },
        {
          id: "oc8",
          text: "Comment dit-on « to call a client » en français ?",
          options: [
            "téléphoner à un client",
            "imprimer un client",
            "écrire un client",
            "réunir un client"
          ],
          "correctAnswer": "téléphoner à un client"
        }
      ]
  },
];

export const dailyChallenge = {
  id: 'daily-challenge',
  title: 'Daily Challenge',
  language: "french",
  description: 'Complete this daily challenge to maintain your streak!',
  questions: [
    {
      id: "b2q1",
      text: "Choisissez la phrase correcte :",
      options: [
        "Elle a acheté des robes rouges élégants.",
        "Elle a acheté des robes rouges élégantes.",
        "Elle a acheté des robes rouge élégantes.",
        "Elle a acheté des robes rouge élégants."
      ],
      correctAnswer: "Elle a acheté des robes rouges élégantes."
    },
    {
      id: "b2q2",
      text: "Complétez la phrase : Les informations ______ (précis) sont difficiles à trouver.",
      options: [
        "précis",
        "précises",
        "précis(e)s",
        "précise"
      ],
      correctAnswer: "précises"
    },
    {
      id: "b2q3",
      text: "Quel adjectif est correctement accordé dans la phrase suivante ?\n« Ce sont des femmes ______ (travailleur) et déterminées. »",
      options: [
        "travailleuses",
        "travailleurs",
        "travailleuse",
        "travailleur"
      ],
      correctAnswer: "travailleuses"
    },
    {
      id: "b2q4",
      text: "Dans laquelle de ces phrases l’adjectif est-il mal accordé ?",
      options: [
        "Les enfants sont contents de partir en vacances.",
        "Elle porte une jupe blanche.",
        "Ils ont acheté des voitures neuves.",
        "Il a une chemise blanches."
      ],
      correctAnswer: "Il a une chemise blanches."
    },
    {
      id: "b2q5",
      text: "Complétez : C’est une ______ (vieux) histoire que tout le monde connaît.",
      options: [
        "vieux",
        "vieille",
        "vieil",
        "vieilles"
      ],
      correctAnswer: "vieille"
    },
    {
      id: "b2q6",
      text: "Choisissez la bonne phrase :",
      options: [
        "Les films français sont très intéressantes.",
        "Les films françaises sont très intéressants.",
        "Les films français sont très intéressants.",
        "Les films français sont très intéressante."
      ],
      correctAnswer: "Les films français sont très intéressants."
    },
    {
      id: "b2q7",
      text: "Complétez : Ce sont des idées ______ (original) et ______ (créatif).",
      options: [
        "originales, créatives",
        "originals, créatifs",
        "originales, créatifs",
        "original, créative"
      ],
      correctAnswer: "originales, créatives"
    },
    {
      id: "b2q8",
      text: "Quel est le féminin pluriel de l’adjectif « international » ?",
      options: [
        "internationals",
        "internationales",
        "internationale",
        "internationelles"
      ],
      correctAnswer: "internationales"
    }
  ]
};