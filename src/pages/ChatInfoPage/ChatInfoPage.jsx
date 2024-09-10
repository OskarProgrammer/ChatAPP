
// importing functions and components from react library
import { Link, redirect, useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUser, getRequest } from "../../api_functions/getRequests"
import { putRequest } from "../../api_functions/putRequests"

// importing styles
import "./ChatInfoPage.css"

// importing components
import { PeopleContainer } from "../../components/PeopleContainer/PeopleContainer"


export const ChatInfoPage = () => {

    // getting chatInfo from loader
    const chatInfoLoader = useLoaderData()

    // creating useState variable
    let [chatInfo, setChatInfo] = useState(chatInfoLoader)

    // useEffect that update chatInfo every 500 ms
    useEffect(()=>{
        const interval = setInterval( async () => {
            chatInfo = await getRequest(`http://localhost:3000/chats/${chatInfo.id}`)
            setChatInfo(chatInfo)
        }, 500)


        return () => { clearInterval(interval) }
    })


    return (
        <div className="container-fluid d-flex flex-column gap-5">

            {/* header of page */}
            <h2 className="display-5 fw-bold">Informations about <br/> {chatInfoLoader.name}</h2>

            {/* ID */}
            <span className="fs-3 fst-italic">Chat ID : {chatInfo.id}</span>

            {/* People */}
            <PeopleContainer chatInfo={chatInfo}/>

            {/* buttons */}
            <div className="container-fluid d-flex flex-row justify-content-center gap-2">
                <Link to={`/account/chatInfo/leave/${chatInfo.id}`} className="btn btn-outline-danger btn-lg" >Leave group </Link>
            </div>
    
        </div>
    )
}

export const chatInfoLoader = async ( {params} ) => {
    // getting id from params
    const {id} = params

    // getting chat info
    const chatInfo = await getRequest(`http://localhost:3000/chats/${id}`)

    // validating currentUser
    const currentUser = await getCurrentUser()

    if (!chatInfo.participants.includes(currentUser.id) && !currentUser.isLogged){
        return redirect("/")
    } else if ( !chatInfo.participants.includes(currentUser.id) && currentUser.isLogged){
        return redirect("/account/")
    }


    // returning chatInfo
    return chatInfo
}