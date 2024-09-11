
//  importing styles
import "./ChatPage.css"

// importing functions and components from react library
import { useLoaderData, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUser, getMessagesFromChat, getRequest } from "../../api_functions/getRequests"
import { postRequest } from "../../api_functions/postRequests"
import { putRequest } from "../../api_functions/putRequests"

// importing components
import { Bar } from "../../components/Bar/Bar"
import { MessageContainer } from "../../components/MessageContainer/MessageContainer"
import { NewMessageInput } from "../../components/NewMessageInput/NewMessageInput"



export const ChatPage = () => {
    // getting id of chat from params
    const {id} = useParams()

    // getting messages from loader
    const [messagesLoader, currentUserLoader, chatInfoLoader] = useLoaderData()
    

    // creating useState variables
    let [messages, setMessages] = useState(messagesLoader)
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

    const sendMessage = async (newMessage) => {
        // validating data
        if (newMessage == ""){ return }

        const date = new Date()

        // creating newMessageObject
        const newMessageObject = {
            id : crypto.randomUUID(),
            ownerID : currentUser.id,
            chatID : chatInfo.id,
            message : newMessage,
            createdAt : date,
            isReadBy : [currentUser.id]
        }

        // sending message to db
        try {
            await postRequest('http://localhost:3000/messages/',newMessageObject)
        } catch {
            throw new Error("Something went wrong during sending message")
        }

        chatInfo.lastMessage = {
            messageID : newMessageObject.id,
            content : date.toLocaleTimeString() + " : " + newMessage
        }

        try {
            await putRequest(`http://localhost:3000/chats/${chatInfo.id}`, chatInfo)
        } catch {
            throw new Error("Something went wrong during sending message")
        }

    }

    return (
        <div className="container-fluid d-flex flex-column gap-2">

            {/* bar */}
            <Bar chatInfo={chatInfo}/>

            {/* displaying messages */}
            <MessageContainer   messages={messages}
                                chatInfo={chatInfo}
                                currentUser={currentUser}/>


            {/* new message input */}
            <NewMessageInput onSendMessage={ sendMessage }/>

        </div>
    )
}

export const chatLoader = async ( {params} ) => {
    // getting id of chat
    const { id } = params

    // getting messages
    let messages = await getMessagesFromChat(id)

    // getting currentUser
    const currentUser = await getCurrentUser()

    // getting chatInfo
    const chatInfo = await getRequest(`http://localhost:3000/chats/${id}`)
    
    // returning messages
    return [messages.reverse() , currentUser, chatInfo]
}