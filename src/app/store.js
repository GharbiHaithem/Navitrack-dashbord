import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import carReducer from '../features/vehiculeSlice';
import categoryReducer from '../features/categriesSlice';
import appareilReducer from '../features/appareilSlice';
import companieReducer from '../features/companieSlice';
import factureReducer from '../features/factureSlice';
import conversationReducer from '../features/conversationSlice';
import notificationReducer from '../features/notificationSlice';
import devisReducer from '../features/devisSlice';
import uploadReducer from '../features/uploadSlice'
import articleReducer from '../features/articleSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    category: categoryReducer,
    appareil: appareilReducer,
    companie: companieReducer,
    fact: factureReducer,
    conversation: conversationReducer,
    notif: notificationReducer,
    devis: devisReducer,
    uploads:uploadReducer,
    article:articleReducer
  },

});
