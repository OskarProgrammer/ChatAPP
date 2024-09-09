// importing styles
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'

// importing bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// importing layouts
import { MainLayout } from './layouts/MainLayout/MainLayout'

// importing pages
import { MainPage, mainPageLoader } from './pages/MainPage/MainPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage'


// creating routes
const router = createBrowserRouter(
  createRoutesFromElements(
    // main route '/'
    <Route  path="/"
            element={<MainLayout/>}>
          
          {/* main page */}
          <Route index element={<MainPage/>} loader={mainPageLoader}/>  

          {/* login page */}
          <Route path="login" element={<LoginPage/>}/>

          {/* regsiter page */}
          <Route path="register" element={<RegistrationPage/>}/>
          

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
