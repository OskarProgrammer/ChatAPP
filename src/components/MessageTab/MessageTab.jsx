
// importing styles
import "./MessageTab.css"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"

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

    // creating format of timeMessage
    const timeOfSending = isExpanded ? <span className="text-center">{ diff() }</span> : ""

    // creating format of message
    const messageFormat = message.ownerID == currentUser.id ? <span className={`fs-5 p-3 rounded bg-primary text-light message`}>{message.message}</span> :
                                                              <span className={`fs-5 p-3 rounded bg-dark text-light message`}>{ownerInfo.login} : {message.message}</span>
    
    // creating sideOfMessage
    const sideOfMessage = message.ownerID == currentUser.id ? "justify-content-end" : "justify-content-start"

    // creating sideOfUsers
    const sideOfUsers = message.ownerID == currentUser.id ? "text-end" : "text-start"

    return (
        <div className={`container-fluid d-flex flex-row ${sideOfMessage}`}
             onClick={()=> { setIsExpanded(!isExpanded)} }>

                <div className="col-lg-3 d-flex flex-column">
                    
                    {messageFormat}
                    {timeOfSending}

                    <span className={`${sideOfUsers}`} > 
                        {/* {message.isReadBy.map((user)=>{
                            if (!lastMessage.isReadBy.includes(user)){
                                return (<>{user} </>)
                            } else if (lastMessage.id == message.id) {
                                return (<>{user} </>)
                            }
                        })}     */}
                    </span>

                </div>

        </div>
    )
}