
// importing components
import { PersonItem } from "../PersonItem/PersonItem"

export const PeopleContainer = (props) => {

    // getting data from props
    const chatInfo = props.chatInfo

    return (
        <div className="container-fluid shadow col-11 p-3">

                <h2 className="display-6">Chat members</h2>
                
                <div className="container-fluid usersContainer row d-flex justify-content-center">
                    {chatInfo.participants.map((person)=>(
                        <PersonItem personID={person}/>
                    ))}
                </div>

        </div>  
    )
}