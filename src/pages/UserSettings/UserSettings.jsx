
// importing styles
import "./UserSettings.css"

// importing api funcitons
import { getCurrentUser } from "../../api_functions/getRequests"

// importing functions and components from react library
import { Link, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"


export const UserSettings = () => {

    // getting currentUserLoader
    const currentUserLoader = useLoaderData()

    // creating useState variables
    let [currentUser, setCurrentUser] = useState(currentUserLoader)

    // useEffect to update currentUser
    useEffect(()=>{
        const interval = setInterval( async () => {
            currentUser = await getCurrentUser()
            setCurrentUser(currentUser)
        }, 100)

        return () => { clearInterval(interval) }
    })


    return (
        <div className="d-flex flex-column gap-4 mb-5 pb-0">
            {/* header */}
            <h2 className="display-6 fw-bold">User settings</h2>
            
            {/* login container */}
            <div className="container-lg shadow col-6 p-3 rounded">
                <span className="fs-3">Login : {currentUser.login}</span>
            </div>

            {/* password container */}
            <div className="container-lg shadow col-6 p-3 rounded">
                <span className="fs-3">Password : {currentUser.password}</span>
            </div>

            <p className="fs-3 textWrapping">ID : {currentUser.id}</p>

            <Link to="/account/" className="btn btn-outline-primary btn-lg col-4 mx-auto">Main page</Link>
            <Link to="/account/logOut" className="btn btn-outline-danger btn-lg col-4 mx-auto ">Log out</Link>

        </div>
    )
}

export const userSettingsLoader = async () => {
    // getting currentUser
    const currentUser = await getCurrentUser()

    // returning currentUser
    return currentUser
}