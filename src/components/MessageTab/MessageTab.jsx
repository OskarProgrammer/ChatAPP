
// importing styles
import "./MessageTab.css"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"

// importing functions and components from react library
import { useEffect, useState } from "react"


export const MessageTab = (props) => {

    // getting props data
    const message = props.messageInfo
    const currentUser = props.currentUserInfo

    // creating useState variables
    let [ownerInfo, setOwnerInfo] = useState({})

    // useEffect to fetch data about owner of message
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            ownerInfo = await getRequest(`http://localhost:3000/users/${message.ownerID}`)
            setOwnerInfo(ownerInfo)
        },1)


        return () => ( clearTimeout(timeout) )
    })

    return (
        <div className={`container-fluid d-flex flex-row ${message.ownerID == currentUser.id ? "justify-content-end" : "justify-content-start"}`}>

            {message.ownerID == currentUser.id ? 
                <span className={`fs-5 p-3 rounded bg-primary text-light message`}>{message.message}</span>
                :
                <span className={`fs-5 p-3 rounded bg-dark text-light message`}>{ownerInfo.login} : {message.message}</span>
            }   

        </div>
    )
}