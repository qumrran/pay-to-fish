import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA2VkrsrzOj1Lag-dIMghDMc5XPm_ftfRc',
  authDomain: 'pay-to-fish.firebaseapp.com',
  projectId: 'pay-to-fish',
  storageBucket: 'pay-to-fish.appspot.com',
  messagingSenderId: '412196570739',
  appId: '1:412196570739:web:b98b83ce401c8c6c968c06',
  measurementId: 'G-831NK6KX5H',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
