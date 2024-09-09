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
    )
}