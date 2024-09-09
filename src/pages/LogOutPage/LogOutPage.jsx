
// importing styles
import "./LogOutPage.css"

// importing api fucntions
import { putRequest } from "../../api_functions/putRequests"

// importing functions and components from react library
import { useEffect } from "react"
import { redirect } from "react-router-dom"

export const LogOutPage = () => {


    return (<></>)
}

export const logOutLoader = async ( ) => {
    // sending newCurrent object
    try {
        await putRequest("http://localhost:3000/currentUser/", { id : "" , isLogged: false})
    } catch {
        throw new Error("Error during log out process")
    }

    return redirect("/")
}
