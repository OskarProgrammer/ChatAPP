import { HeaderOfConversation } from "../HeaderOfConversation/HeaderOfConversation"
import { MessageTab } from "../MessageTab/MessageTab"
import { PersonTab } from "../PersonTab/PersonTab"

export const MessageContainer = (props) => {

    // getting info from props
    const messages = props.messages
    const chatInfo = props.chatInfo
    const currentUser = props.currentUser

    return(
        <div className="container-fluid 
                            d-flex flex-column flex-column-reverse
                            text-dark chatContainer shadow py-3 gap-3">

                {messages.map((message)=>(

                    <MessageTab key={message.id} 
                                messageInfo={message} 
                                currentUserInfo={currentUser}/>
                    
                ))}

                <HeaderOfConversation chatInfo={chatInfo} 
                                      currentUser={currentUser}/>

        </div>
    )
}