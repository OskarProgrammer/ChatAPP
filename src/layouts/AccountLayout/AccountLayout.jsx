
// importing styles
import "./AccountLayout.css"

// importing functins and components from react library
import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom"

// importing api functions
import { getCurrentUser } from "../../api_functions/getRequests"
import { useEffect, useState } from "react"

export const AccountLayout = () => {

    // getting currentUserFromLoader
    const currentUserFromLoader = useLoaderData()

    // creating useState variables
    let [currentUser, setCurrentUser] = useState(currentUserFromLoader)

    // useEffect to update currentUser
    useEffect(()=>{
        const interval = setInterval(async () => {

            currentUser = await getCurrentUser()
            setCurrentUser(currentUser)

        },100)

        return () => { clearInterval(interval) } 
    })

    return (
        // main container
        <div className="container-lg col-lg-11 d-flex flex-lg-row flex-sm-column flex-column gap-1 accountContainer">

            {/* left side */}
            <div className="container 
                            d-flex flex-column gap-2 
                            text-light 
                            col-lg-3 p-3
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
                
            </div>

            {/* right side */}
            <div className="container d-flex shadow flex-column gap-2 col-lg-9 rounded p-3 sitesContainer">

                <Outlet/>

            </div>
        </div>
    )
}

export const accountLayoutLoader = async () => {
    // getting currentUser
    const currentUser = await getCurrentUser()

    // returning currentUser
    return currentUser
}