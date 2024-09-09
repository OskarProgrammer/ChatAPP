
// importing styles
import "./MessageTab.css"

export const MessageTab = (props) => {

    // getting props data
    const message = props.messageInfo
    const currentUser = props.currentUserInfo

    return (
        <div className={`container-fluid d-flex ${message.ownerID == currentUser.id ? "justify-content-end" : "justify-content-start"}`}>
            <span className={`fs-5 p-3 rounded ${message.ownerID == currentUser.id ? "bg-primary text-light" : "bg-dark text-light"}`}>{message.message}</span>
        </div>
    )
}