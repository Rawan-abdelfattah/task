"use client"; 
import item from '@/redux/slices/item'; 
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { 
    item,
   },
});

export default store;
