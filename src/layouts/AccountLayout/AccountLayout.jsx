
// importing styles
import "./AccountLayout.css"

// importing functins and components from react library
import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom"

// importing api functions
import { getCurrentUser, getCurrentUserChats } from "../../api_functions/getRequests"
import { useEffect, useState } from "react"

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
                            d-flex flex-column gap-4 
                            text-light 
                            col-lg-4 p-3
                            col-sm-12 col-12
                            shadow rounded
                            sitesContainer">

                {/* profile button */}
                <NavLink to="userSettings" className="btn btn-outline-primary 
                                    container-fluid 
                                    shadow  
                                    d-flex flex-column gap-1 rounded p-2
                                    col-lg-12 col-md-12 col-sm-12 col-12
                                    textWrapping">

                    <i className="bi bi-person fs-4"/>
                    <span className="my-auto fs-5">{currentUser.login}</span>

                </NavLink>

                {/* list of chats */}
                <div className="container-fluid d-flex flex-lg-column flex-sm-row flex-row gap-3 chatsContainer">
                    {currentUserChats.map((chat)=>(
                        <NavLink to={`/account/chat/${chat.id}`} key={chat.id} className="container-fluid btn btn-outline-dark d-flex flex-column gap-1 shadow p-2 chatTab">
                            <span className="fw-bold fs-4">{chat.name}</span>
                            <span className="fst-italic">{chat.lastMessage}</span>
                        </NavLink>
                    ))}
                </div>
                
            </div>

            {/* right side */}
            <div className="container 
                            bg-light
                            d-flex flex-column
                            shadow rounded p-3
                            gap-2 
                            col-lg-8 
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