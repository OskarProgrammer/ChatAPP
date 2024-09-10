
// importing functions and components from react library
import { useState } from "react"
import { Form, redirect } from "react-router-dom"

// importing components
import { UserTab } from "../UserTab/UserTab"
import { UsersList } from "../../components/UsersList/UsersList"

// importing api functions
import { getCurrentUser, getUserByName } from "../../api_functions/getRequests"
import { postRequest } from "../../api_functions/postRequests"


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
        if (chatPeople.includes(user.id)){ return }
        
        
        // adding user
        chatPeople = [...chatPeople, user.id]
        setChatPeople(chatPeople)
        setNewUser("")

    }

    const removeUser = ( id ) => {
        chatPeople = chatPeople.filter((e)=> e != id)
        setChatPeople(chatPeople)
    }

    return (
        <>
            <h2 className="display-3">New chat</h2>

            <Form method="POST" action="/account/createChat" className="d-flex flex-column gap-3 shadow p-5">
                <input value={chatPeople} name="groupOfPeople" hidden readOnly/>

                <input  type="text"
                        name="title"
                        placeholder="Name of chat" 
                        className="col-lg-6 col-12 p-3 fs-5 text-center mx-auto"/>

                <input type="text"  placeholder="Add user" 
                                    value={newUser} 
                                    onChange={(e)=>{setNewUser(e.target.value)}} 
                                    className="col-lg-6 col-12 p-3 fs-5 text-center mx-auto"
                                    list="users"/>

                <datalist id="users" >
                    <UsersList chatPeople={chatPeople}/>
                </datalist>


                <button type="button" onClick={()=>{ addUser() }} className="btn btn-outline-success btn-lg col-lg-3 col-6 mx-auto">
                    <i class="bi bi-plus fs-2" />
                </button>

                <h4 className="display-6 fw-bold">Users</h4>

                {/* displaying people */}
                <div className="container-fluid usersContainer row d-flex justify-content-center">

                    {chatPeople.map((person)=>{
                        try {
                            return (
                                <UserTab personID={person}
                                         onRemove={removeUser}/>
                            )
                        } catch { return }
                    })}

                </div>

                <button className="btn btn-outline-success col-lg-6 col-12 mx-auto fs-3">
                    Create
                </button>

            </Form>
        </>
    )
}

export const newChatAction = async ( {request} ) =>{
    // getting formdata
    const formData = await request.formData()

    // getting currentUser
    const currentUser = await getCurrentUser()

    // getting input fields
    const name = formData.get("title")
    const groupOfPeople = formData.get("groupOfPeople")

    // validating data
    if ( name == "" || groupOfPeople.length == 0 ) { return }

    // creating newChat object
    const newChatID = crypto.randomUUID()

    const newChat = {
        id : newChatID,
        name : name,
        participants: [groupOfPeople, currentUser.id],
        lastMessage: ""
      }

    // posting data to db
    try {
        await postRequest(`http://localhost:3000/chats/`,newChat)
    } catch {
        throw new Error("Something went wrong during creating new chat")
    }

    return redirect(`/account/chat/${newChatID}`)

}