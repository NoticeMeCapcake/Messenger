"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css"

import AppLayout from "@/components/AppLayout";
import { Provider } from 'react-redux';
import { store } from '@/services/store/store';


export default async function App() {
    return (
      <Provider store={store}>
            <AppLayout/>
      </Provider>
    )
}