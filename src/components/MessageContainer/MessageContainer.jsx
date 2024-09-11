
// importing functions and components from react library
import { useEffect, useState } from "react"


// importing components
import { HeaderOfConversation } from "../HeaderOfConversation/HeaderOfConversation"
import { MessageTab } from "../MessageTab/MessageTab"


// importing styles
import "./MessageContainer.css"


export const MessageContainer = (props) => {

    // getting info from props
    const messages = props.messages
    const chatInfo = props.chatInfo
    const currentUser = props.currentUser
    const currentResponse = props.currentResponse
    

    return(
        <div className="container-fluid 
                            d-flex flex-column flex-column-reverse
                            text-dark chatContainer shadow py-3 gap-3 position-relative">
                
                

                {messages.map((message)=>(

                    <MessageTab key={message.id} 
                                messageInfo={message} 
                                currentUserInfo={currentUser}/>
                    
                ))}

                <HeaderOfConversation chatInfo={chatInfo} 
                                      currentUser={currentUser}/>

                {/* {currentResponse.id != "" ? 
                    <span className="p-3 fw-bold bg-primary rounded position-sticky text-light d-flex flex-row justify-content-around response">
                        <p className="bg-primary py-3 my-auto p-3 rounded">You are responsing to : <br/> {currentResponse.message}</p>
                        <button className="btn btn-outline-danger btn-lg">Stop responsing</button>
                    </span> 
                : ""} */}
                
        </div>
    )
}