
// importing styles
import "./AccountLayout.css"

// importing functins and components from react library
import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom"

// importing api functions
import { getCurrentUser, getCurrentUserChats } from "../../api_functions/getRequests"
import { useEffect, useState } from "react"

// importing components
import { LeftSideBarButtons } from "../../components/LeftSideBarButtons/LeftSideBarButtons"
import { ChatsList } from "../../components/ChatsList/ChatsList"



export const AccountLayout = () => {

    // getting currentUserFromLoader
    const [currentUserFromLoader, chatsFromLoader] = useLoaderData()

    // creating useState variables
    let [currentUser, setCurrentUser] = useState(currentUserFromLoader)
    let [currentUserChats, setCurrentUserChats] = useState(chatsFromLoader)


    // useEffect to update currentUser
    useEffect(()=>{
        const interval = setInterval(async () => {

            currentUser = await getCurrentUser()
            setCurrentUser(currentUser)

            currentUserChats = await getCurrentUserChats()
            setCurrentUserChats(currentUserChats)

        },100)

        return () => { clearInterval(interval) } 
    })

    return (
        // main container
        <div className="container-lg col-lg-12 
                        d-flex flex-lg-row flex-sm-column flex-column gap-3
                        accountContainer
                        px-5 py-2">

            {/* left side */}
            <div className="container 
                            d-flex flex-column justify-content-lg-start gap-4 justify-content-sm-end
                            text-light 
                            col-lg-3 p-3
                            col-sm-12 col-12
                            shadow rounded
                            sitesContainer">

                <LeftSideBarButtons currentUser={currentUser}/>

                {/* list of chats */}
                <ChatsList currentUserChats={currentUserChats}/>
                
            </div>

            {/* right side */}
            <div className="container 
                            bg-light
                            d-flex flex-column
                            shadow rounded p-3
                            gap-2 
                            col-lg-9 
                            sitesContainer">

                <Outlet/>

            </div>
        </div>
    )
}

export const accountLayoutLoader = async () => {
    // getting currentUser
    const currentUser = await getCurrentUser()

    // getting currentUsersChats
    const currentUserChats = await getCurrentUserChats()

    // returning currentUser
    return [currentUser,currentUserChats]
}