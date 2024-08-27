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
import { Provider } from 'react-redux'
import store from './store.js'
import RegisterScreen from './screens/RegisterScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.jsx'
import UpdatePasswordScreen from './screens/UpdatePasswordScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import CreateModuleScreen from './screens/CreateModuleScreen.jsx'
import EditModuleScreen from './screens/EditModuleScreen.jsx'
import ModuleScreen from './screens/ModuleScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import UsersScreen from './screens/UsersScreen.jsx'
import AdminUserScreen from './screens/AdminUserScreen.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
     <Route index path='/' element={<HomeScreen />} />
      <Route path='*' element={<NotFoundScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
      <Route path='/update' element={<UpdatePasswordScreen />} />

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/modules' element={<ModuleScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* Admin Routes */}
      <Route path='' element={<AdminRoute/>}>
      <Route path='/admin/module' element={<CreateModuleScreen />} />
      <Route path='/admin/module/:id' element={<EditModuleScreen />} />
      <Route path='/admin/users' element={<UsersScreen />} />
      <Route path='/admin/user/:id' element={<AdminUserScreen />} />
      </Route>
      

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider  router={router}/>
      </Provider>
    </HelmetProvider>
  </StrictMode>,
)
