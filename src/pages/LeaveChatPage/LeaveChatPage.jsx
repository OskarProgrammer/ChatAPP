
// importing functions and components from react library
import { redirect } from "react-router-dom"

// importing api functions
import { getCurrentUser, getRequest } from "../../api_functions/getRequests"
import { putRequest } from "../../api_functions/putRequests"

export const LeaveChatPage = () => {

    return (
        <></>
    )
}

export const leaveChatLoader = async ( {params} ) => {
    // getting id of chat
    const { id } = params

    // getting currentUser
    const currentUser = await getCurrentUser()

    // getting chatInfo
    let chatInfo = await getRequest(`http://localhost:3000/chats/${id}`)

    // deleting user
    chatInfo.participants = chatInfo.participants.filter(e => e != currentUser.id)

    // updating data
    try {
        await putRequest(`http://localhost:3000/chats/${chatInfo.id}`, chatInfo)
    } catch {
        throw new Error("Error during updating chatInfo")
    }

    return redirect("/account/")
}