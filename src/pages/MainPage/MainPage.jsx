
// importing styles
import "./MainPage.css"

// importing functions and components from react library
import { redirect, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"
import { StartingTab } from "../../components/StartingTab/StartingTab"



export const MainPage = () => {

    // getting loader data
    const currentUserLoader = useLoaderData()

    // creating useState variables
    let [currentUser, setCurrentUser] = useState(currentUserLoader)

    // creating variables
    let frequencyOfInterval = 300

    // useEffect function to update currentUser
    useEffect(()=>{
        const interval = setInterval(async () => {

            // updating currentUser
            currentUser = await getRequest("http://localhost:3000/currentUser/") 
            setCurrentUser(currentUser)

        }, frequencyOfInterval)

        return () => { clearInterval(interval) } // clearing interval
    })


    return (
        <>

            { !currentUser.isLogged ? 
                // rendering starting tab
                <StartingTab />    
            : ""}

        </>
    )
}

export const mainPageLoader = async () => {
    // fetching data from endpoint
    const currentUserData = await getRequest("http://localhost:3000/currentUser/")

    // checking if userIsLogged
    if (currentUserData.isLogged){
        return redirect("/account/")
    } 

    // returning results
    return currentUserData
}