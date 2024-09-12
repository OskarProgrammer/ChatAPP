
// importing styles
import "./MessageTab.css"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"
import { putRequest } from "../../api_functions/putRequests"

// importing functions and components from react library
import { useEffect, useState } from "react"

// importing date functions
import { getHoursDiff, getMinutesDiff, getSecondsDiff } from "../../date_functions/date_functions"


export const MessageTab = (props) => {

    // getting props data
    const message = props.messageInfo
    const currentUser = props.currentUserInfo


    // creating useState variables
    let [ownerInfo, setOwnerInfo] = useState({})
    let [isExpanded, setIsExpanded] = useState(false)
    let [isResponsing, setIsResponsing] = useState(false)


    // useEffect to fetch data about owner of message
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            ownerInfo = await getRequest(`http://localhost:3000/users/${message.ownerID}`)
            setOwnerInfo(ownerInfo)
        },1)


        return () => ( clearTimeout(timeout) )
    })

    const diff = () =>{
        // creating format
        const responseFormat = ( text ) =>{
            return "Sent " + text + " ago"
        }

        // creating current date
        const currentDate = new Date()

        // getting diff between current date and date of creating the message
        const secondsDiff = getSecondsDiff(currentDate, new Date(message.createdAt))
        const minutesDiff = getMinutesDiff(currentDate, new Date(message.createdAt))
        const hoursDiff = getHoursDiff(currentDate, new Date(message.createdAt))
        
        if ( secondsDiff > 60 ){
            if ( minutesDiff > 60) {
                return responseFormat(`${hoursDiff} hours`)
            }else{
                return responseFormat(`${minutesDiff} minutes`)
            }
        } else {
            return responseFormat(`${secondsDiff} seconds`)
        }

    }

    const handleRightClick = (e) => {
        e.preventDefault()
        setIsResponsing(!isResponsing)
    }

    const setNewMessage = async () => {
        // posting newResponseMessage
        try {
            await putRequest(`http://localhost:3000/currentResponseMessage/`, message)
        } catch {
            throw new Error("Error during putting data")
        }

        setIsResponsing(false)
    }

    // creating format of timeMessage
    const timeOfSending = isExpanded ? <span className="text-center">{ diff() }</span> : ""

    // creating format of message
    const messageFormat = message.ownerID == currentUser.id ? <span className={`fs-5 p-3 rounded bg-primary text-light message`}>{message.message}</span> :
                                                              <span className={`fs-5 p-3 rounded bg-dark text-light message`}>{ownerInfo.login} : {message.message}</span>
    
    // creating responseMessage
    const responseMessage = isResponsing ? <button onClick={() => {setNewMessage()}} className=" fw-bold btn btn-outline-primary mb-1"><i className="bi bi-arrow-90deg-right"/></button> : ""

    // creating sideOfMessage
    const sideOfMessage = message.ownerID == currentUser.id ? "justify-content-end" : "justify-content-start"


    return (
        <div className={`container-fluid d-flex flex-row ${sideOfMessage}`}
             onClick={()=> { 
                if ( !isResponsing ) { setIsExpanded(!isExpanded) }
             } } onContextMenu={ (e) => { handleRightClick(e) } }>

                <div className='col-lg-3 d-flex flex-column'>
                    {responseMessage}
                    {messageFormat}
                    {timeOfSending}
                </div>

        </div>
    )
}