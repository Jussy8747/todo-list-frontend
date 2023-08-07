import React from 'react'
import ReactDOM from 'react-dom/client'
import SignUp from "./pages/SignUp"
import './styles/main.scss'
import store from './store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Home from './pages/Home';
import MainPage from './pages/MainPage'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    
    <Route  path='/mainpage' element={<MainPage/>}/>
   <Route   index={true} path='/' element={<Home/>}/>
   <Route path='/register' element={<SignUp />} />

   <Route path='/forgetPassword' element={<ForgetPassword />} />
   <Route path="/reset-password/:userId" element={<ResetPassword />}/>
 

   

{/* 
    private route
    <Route path='' element={</>}>
    
    </Route> */}
   
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <Provider store={store}>
      
     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
