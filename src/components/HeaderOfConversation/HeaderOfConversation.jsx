
// importing components
import { PersonTab } from "../PersonTab/PersonTab"

export const HeaderOfConversation = ( props ) => {

    // getting chatInfo from props
    const chatInfo = props.chatInfo
    
    // getting currentUser from props
    const currentUser = props.currentUser

    return (
        <h3 className="display-3 py-5">

            Chat with <br />

            {chatInfo.participants.map( (person) => {
                if (person != currentUser.id){
                    return (<PersonTab key={person} personID={person}/>)
                }
            })}

        </h3>
    )
}