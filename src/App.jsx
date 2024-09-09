// importing styles
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'

// importing bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// importing layouts
import { MainLayout } from './layouts/MainLayout/MainLayout'

// importing pages
import { MainPage, mainPageLoader } from './pages/MainPage/MainPage'
import { loginAction, LoginPage } from './pages/LoginPage/LoginPage'
import { registerAction, RegistrationPage } from './pages/RegistrationPage/RegistrationPage'


// creating routes
const router = createBrowserRouter(
  createRoutesFromElements(
    // main route '/'
    <Route  path="/"
            element={<MainLayout/>}>
          
          {/* main page */}
          <Route index element={<MainPage/>} loader={mainPageLoader}/>  

          {/* login page */}
          <Route path="login" element={<LoginPage/>} action={loginAction}/>

          {/* regsiter page */}
          <Route path="register" element={<RegistrationPage/>} action={registerAction}/>
          

    </Route>
  )
)


function App() {

  return (
    <>  
      <RouterProvider router={router} />
    </>
  )
}

export default App
