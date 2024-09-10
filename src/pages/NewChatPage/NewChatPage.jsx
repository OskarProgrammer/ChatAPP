
// importing functions and components from react library
import { useState } from "react"
import { Form } from "react-router-dom"

// importing components
import { PersonItem } from "../../components/PersonItem/PersonItem"
import { getCurrentUser, getUserByName } from "../../api_functions/getRequests"


export const NewChatPage = () => {

    // creating useState variables
    let [chatPeople , setChatPeople] = useState([])
    let [newUser, setNewUser] = useState("")

    const addUser = async () => {

        // getting currentUser
        const currentUser = await getCurrentUser()

        // validating newUser
        if (newUser == "") { return }

        const user = await getUserByName(newUser)
        if (user == null){ return }
        if (user.id == currentUser.id){ return }
        
        
        // adding user
        chatPeople = [...chatPeople, user.id]
        setChatPeople(chatPeople)
        setNewUser("")

    }


    return (
        <>
            <h2 className="display-3">New chat</h2>

            <Form method="POST" action="/account/createChat" className="d-flex flex-column gap-3 shadow p-5">
                
                <input type="text" placeholder="Name of chat" className="col-6 p-3 fs-5 text-center mx-auto"/>

                <input type="text"  placeholder="Add user" 
                                    value={newUser} 
                                    onChange={(e)=>{setNewUser(e.target.value)}} 
                                    className="col-6 p-3 fs-5 text-center mx-auto"/>

                <button type="button" onClick={()=>{ addUser() }} className="btn btn-outline-success btn-lg col-3 mx-auto">
                    <i class="bi bi-plus fs-2" />
                </button>

                <h4 className="display-6 fw-bold">Users</h4>
                {/* displaying people */}
                <div className="container-fluid usersContainer row d-flex justify-content-center">
                    {chatPeople.map((person)=>(
                        <PersonItem personID={person}/>
                    ))}
                </div>

            </Form>
        </>
    )
}