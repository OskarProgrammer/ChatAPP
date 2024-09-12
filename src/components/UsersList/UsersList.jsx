
// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getCurrentUser, getRequest } from "../../api_functions/getRequests"


export const UsersList = (props) => {

    // creating useState variables
    let [items, setItems] = useState([])

    // useEffect fucntion to fetch all users
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            // getting currentUser
            const currentUser = await getCurrentUser()

            // getting all users
            const users = await getRequest(`http://localhost:3000/users/`)

            // filtring
            items = users.filter(e => (e.id != currentUser.id) && (!props.chatPeople.includes(e.id)) )

            setItems(items)

        },100)

        return () => { clearTimeout(timeout) }
    })


    return(
        <>
            {items.map((item) => (
                <option value={item.login} />
            ))}
        </>
    )
}