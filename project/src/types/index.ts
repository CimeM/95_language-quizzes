export type Language = 'english' | 'spanish' | 'french' | 'slovenian' | 'italian' ;

export type Country =
  'AF' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ' | 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN' | 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CD' | 'CK' | 'CR' | 'CI' | 'HR' | 'CU' | 'CW' | 'CY' | 'CZ' | 'DK' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER' | 'EE' | 'SZ' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT' | 'GG' | 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'VA' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IM' | 'IL' | 'IT' | 'JM' | 'JP' | 'JE' | 'JO' | 'KZ' | 'KE' | 'KI' | 'KP' | 'KR' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH' | 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'ME' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG' | 'NU' | 'NF' | 'MK' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'RE' | 'RO' | 'RU' | 'RW' | 'BL' | 'SH' | 'KN' | 'LC' | 'MF' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'RS' | 'SC' | 'SL' | 'SG' | 'SX' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'SS' | 'ES' | 'LK' | 'SD' | 'SR' | 'SJ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG' | 'UA' | 'AE' | 'GB' | 'US' | 'UM' | 'UY' | 'UZ' | 'VU' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW' | 'OT';

export type GameType = 'campaign' | 'vocabulary';

export type Theme = 'light' | 'dark';

export type CampaignType = 'weekly' | 'daily' | 'challenges';

export type ThemeType = 'grocery' | 'transport' | 'park' | 'restaurant' | 'office' | 'daily';

export type MedalType = 'bronze' | 'silver' | 'gold' | 'none';

export type RankType = 'novice' | 'apprentice' | 'expert' | 'master' | 'grandmaster';

export const API_URL = 'https://api.langapi.rivieraapps.com'; // https://api.langapi.rivieraapps.com

export  const languages = [
  { value: 'fr', label: 'French' },
  { value: 'ita', label: 'Italian' },
];

export  const countries = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BV', label: 'Bouvet Island' },
  { value: 'BR', label: 'Brazil' },
  { value: 'IO', label: 'British Indian Ocean Territory' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CV', label: 'Cabo Verde' },
  { value: 'KY', label: 'Cayman Islands' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CX', label: 'Christmas Island' },
  { value: 'CC', label: 'Cocos (Keeling) Islands' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CD', label: 'Congo (Democratic Republic)' },
  { value: 'CK', label: 'Cook Islands' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'CI', label: "Côte d'Ivoire" },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CW', label: 'Curaçao' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czechia' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'SZ', label: 'Eswatini' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FK', label: 'Falkland Islands (Malvinas)' },
  { value: 'FO', label: 'Faroe Islands' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GF', label: 'French Guiana' },
  { value: 'PF', label: 'French Polynesia' },
  { value: 'TF', label: 'French Southern Territories' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GR', label: 'Greece' },
  { value: 'GL', label: 'Greenland' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GP', label: 'Guadeloupe' },
  { value: 'GU', label: 'Guam' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GG', label: 'Guernsey' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HM', label: 'Heard Island and McDonald Islands' },
  { value: 'VA', label: 'Holy See' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IM', label: 'Isle of Man' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JE', label: 'Jersey' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KP', label: "Korea (Democratic People's Republic)" },
  { value: 'KR', label: 'Korea (Republic)' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: "Lao People's Democratic Republic" },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MO', label: 'Macao' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MQ', label: 'Martinique' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'YT', label: 'Mayotte' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia' },
  { value: 'MD', label: 'Moldova' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MS', label: 'Montserrat' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NC', label: 'New Caledonia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NU', label: 'Niue' },
  { value: 'NF', label: 'Norfolk Island' },
  { value: 'MK', label: 'North Macedonia' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PS', label: 'Palestine, State of' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PN', label: 'Pitcairn' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RE', label: 'Réunion' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russian Federation' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'BL', label: 'Saint Barthélemy' },
  { value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha' },
  { value: 'KN', label: 'Saint Kitts and Nevis' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'MF', label: 'Saint Martin (French part)' },
  { value: 'PM', label: 'Saint Pierre and Miquelon' },
  { value: 'VC', label: 'Saint Vincent and the Grenadines' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SX', label: 'Sint Maarten (Dutch part)' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
  { value: 'SS', label: 'South Sudan' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SJ', label: 'Svalbard and Jan Mayen' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syrian Arab Republic' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TK', label: 'Tokelau' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TC', label: 'Turks and Caicos Islands' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UM', label: 'United States Minor Outlying Islands' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Viet Nam' },
  { value: 'VG', label: 'Virgin Islands (British)' },
  { value: 'VI', label: 'Virgin Islands (U.S.)' },
  { value: 'WF', label: 'Wallis and Futuna' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' },
  { value: 'OT', label: 'Other' },
];

export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  savings?: string;
  popular?: boolean;
  benefits: string[];
  limitations: {
    maxQuizzes: number;
    maxVocabSets: number;
    features: string[];
  };
  paypalInvoiceId?: string;
}

export interface ThemeQuiz {
  id: string;
  title: string;
  theme: ThemeType;
  description: string;
  medal: MedalType;
  maxScore: number;
  timeLimit: number;
  questions: Question[];
  language: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface VocabularySet {
  id: string;
  title: string;
  description: string;
  words: VocabularyWord[];
  completed: boolean;
  progress: number;
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  example: string;
  mastered: boolean;
}


export interface Subscription {
  active: boolean;
  id: string;
  userId: string;
  planId: string;
  startsAt: string;
  expiresAt: string;
  paymentId: string;
  createdAt: string;
  daysLeft: number;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  country: string;
  language: string;
  rank: string;
  totalMedals: number,
  globalRank: number,
  countryRank: number,
  lastActive: string;
  createdAt: string;
  updatedAt: string;
  subscription?: Subscription;
  theme: string;
}


// Define the new MedalInfo type
export interface MedalInfo {
  medal: MedalType;    // e.g., "silver"
  clubId: string;      // e.g., "default"
}

export interface UserProgress {
  userId: string;
  medals: Record<string, MedalInfo>; 
  streak: number;
  lastCompletedDaily?: string;
  completedQuizzes: string[];
  weeklyQuizzes: Record<string, MedalType>;
  vocabularySets: Record<string, VocabularySet>;
  updatedAt: string;
}
