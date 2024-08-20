import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import NotFoundScreen from './screens/NotFoundScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<HomeScreen />} />
      <Route path='*' element={<NotFoundScreen />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <RouterProvider  router={router}/>
    </HelmetProvider>
  </StrictMode>,
)
