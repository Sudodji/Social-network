import * as firebase from 'firebase/app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './components/providers/AuthProvider'
import RoutesPath from './components/routes/RoutesPath'
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

firebase.initializeApp({
  apiKey: "AIzaSyA-oGTx8-cW7qyHAyq9TyUDOIsLTfBWdfA",
  authDomain: "vk-copy-47bc4.firebaseapp.com",
  projectId: "vk-copy-47bc4",
  storageBucket: "vk-copy-47bc4.appspot.com",
  messagingSenderId: "93078820072",
  appId: "1:93078820072:web:e023d9c999974daf42e55d"
})
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RoutesPath />
    </AuthProvider>
  </React.StrictMode>
);