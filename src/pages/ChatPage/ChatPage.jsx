
//  importing styles
import "./ChatPage.css"

// importing functions and components from react library
import { useLoaderData, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUser, getMessagesFromChat, getRequest } from "../../api_functions/getRequests"
import { postRequest } from "../../api_functions/postRequests"
import { putRequest } from "../../api_functions/putRequests"

// importring components
import { MessageTab } from "../../components/MessageTab/MessageTab"
import { PersonTab } from "../../components/PersonTab/PersonTab"



export const ChatPage = () => {
    // getting id of chat from params
    const {id} = useParams()

    // getting messages from loader
    const [messagesLoader, currentUserLoader, chatInfoLoader] = useLoaderData()
    

    // creating useState variables
    let [messages, setMessages] = useState(messagesLoader)
    let [newMessage, setNewMessage] = useState("")
    let [currentUser, setCurrentUser] = useState(currentUserLoader)
    let [chatInfo, setChatInfo] = useState(chatInfoLoader)


    // useEffect that updates messages
    useEffect(()=>{
        const interval = setInterval( async () => {

            currentUser = await getCurrentUser()
            setCurrentUser(currentUser)

            messages = await getMessagesFromChat(id)
            setMessages(messages.reverse())

            chatInfo = await getRequest(`http://localhost:3000/chats/${id}`)
            setChatInfo(chatInfo)

        },100)

        return () => { clearInterval(interval) }
    })

    const sendMessage = async () => {
        // validating data
        if (newMessage == ""){ return }

        const date = new Date()

        // creating newMessageObject
        const newMessageObject = {
            id : crypto.randomUUID(),
            ownerID : currentUser.id,
            chatID : chatInfo.id,
            message : newMessage,
            createdAt : date
        }

        // sending message to db
        try {
            await postRequest('http://localhost:3000/messages/',newMessageObject)
        } catch {
            throw new Error("Something went wrong during sending message")
        }

        chatInfo.lastMessage = date.toLocaleTimeString() + " " + newMessage

        try {
            await putRequest(`http://localhost:3000/chats/${chatInfo.id}`, chatInfo)
        } catch {
            throw new Error("Something went wrong during sending message")
        }

        setNewMessage("")
    }

    return (
        <div className="container-fluid d-flex flex-column gap-2">

            {/* displaying messages */}
            <div className="container-fluid 
                            d-flex flex-column flex-column-reverse
                            text-dark chatContainer shadow py-3 gap-3">

                {messages.map((message)=>(
                    <MessageTab key={message.id} messageInfo={message} currentUserInfo={currentUser}/>
                ))}

                <h3 className="display-3 py-5">
                    Chat with <br />

                    {chatInfo.participants.map( (person) => {
                        if (person != currentUser.id){
                            return (<PersonTab key={person} personID={person}/>)
                        }
                    })}

                </h3>

            </div>

            {/* new message input */}
            <div className="container-fluid d-flex flex-row gap-2">

                {/* input message */}
                <input  type="text" 
                        value={newMessage} 
                        onChange={(e)=>{setNewMessage(e.target.value)}}
                        className="text p-2 rounded border border-1 border-dark 
                                    fs-4 col-lg-10 col-md-9 col-8" />

                {/* button to send message */}
                <button className="btn btn-outline-success col-lg-2 col-md-3 col-4" 
                        onClick={()=>{ sendMessage() }}>
                            <i className="bi bi-send fs-4"/>
                </button>

            </div>

        </div>
    )
}

export const chatLoader = async ( {params} ) => {
    // getting id of chat
    const { id } = params

    // getting messages
    const messages = await getMessagesFromChat(id)

    // getting currentUser
    const currentUser = await getCurrentUser()

    // getting chatInfo
    const chatInfo = await getRequest(`http://localhost:3000/chats/${id}`)
    
    // returning messages
    return [messages.reverse() , currentUser, chatInfo]
}