
// importing functions and components from react library
import { NavLink } from "react-router-dom"


export const ChatsList = ( props ) => {

    // getting props data
    const currentUserChats = props.currentUserChats


    return (
        <div className="container-fluid d-flex flex-lg-column flex-sm-row flex-row gap-3 chatsContainer">

            {currentUserChats.map((chat)=>(
                <NavLink to={`/account/chat/${chat.id}`} key={chat.id} className="container-fluid btn btn-outline-dark d-flex flex-column gap-1 shadow p-2 chatTab">
                    <span className="fw-bold fs-4">{chat.name}</span>
                    <span className="fst-italic">{chat.lastMessage.content}</span>
                </NavLink>
            ))}

        </div>
    )
}