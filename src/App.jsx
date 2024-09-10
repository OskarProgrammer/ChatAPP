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
import { AccountLayout, accountLayoutLoader } from './layouts/AccountLayout/AccountLayout'
import { UserSettings, userSettingsLoader } from './pages/UserSettings/UserSettings'
import { logOutLoader, LogOutPage } from './pages/LogOutPage/LogOutPage'
import { MainAccountPage } from './pages/MainAccountPage/MainAccountPage'
import { chatLoader, ChatPage } from './pages/ChatPage/ChatPage'
import { chatInfoLoader, ChatInfoPage } from './pages/ChatInfoPage/ChatInfoPage'
import { leaveChatLoader, LeaveChatPage } from './pages/LeaveChatPage/LeaveChatPage'
import { NewChatPage } from './pages/NewChatPage/NewChatPage'


// creating routes
const router = createBrowserRouter(
  createRoutesFromElements(
    // main route '/'
    <Route  path="/"
            element={<MainLayout/>}>
          
          {/* main page */}
          <Route  index 
                  element={<MainPage/>} 
                  loader={mainPageLoader}/>  

          {/* login page */}
          <Route path="login" 
                 element={<LoginPage/>} 
                 action={loginAction}/>

          {/* regsiter page */}
          <Route path="register" 
                 element={<RegistrationPage/>} 
                 action={registerAction}/>
          
          {/* account layout */}
          <Route path="account/" 
                 element={<AccountLayout/>} 
                 loader={accountLayoutLoader}>

                     {/* route '/account/' */}
                     <Route index
                            element={<MainAccountPage/>}/>

                     {/* route '/account/userSettings' */}
                     <Route path="userSettings" 
                            element={<UserSettings/>} 
                            loader={userSettingsLoader}/>

                     {/* route '/account/createChat' */}
                     <Route path="createChat" 
                            element={<NewChatPage/>}/>

                     {/* route '/account/chat/:id' */}
                     <Route path="chat/:id" 
                            element={<ChatPage/>}
                            loader={chatLoader}/>

                     {/* route '/account/chatInfo/:id' */}
                     <Route path="chatInfo/:id" 
                            element={<ChatInfoPage/>}
                            loader={chatInfoLoader}/>

                     <Route path="chatInfo/leave/:id" 
                            element={<LeaveChatPage/>}
                            loader={leaveChatLoader}/>


                     {/* route '/account/logOut' */}
                     <Route path="logOut" 
                            element={<LogOutPage/>}
                            loader={logOutLoader}/>

          </Route>

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
