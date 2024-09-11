
// importing functions and components from react library
import { useState } from "react"


export const NewMessageInput = (props) => {

    // creating useState variable
    let [newMessage, setNewMessage] = useState("")


    const sendMessage = () => {
        props.onSendMessage(newMessage)
        setNewMessage("")
    }


    return (
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
    )
}