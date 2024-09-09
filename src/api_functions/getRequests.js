
// async getRequest function to get data from given endpoint
export const getRequest = async ( endpoint , errorMessage=`Error during fetching data from ${endpoint}`) => {
    // declaring variable
    let data = []

    // fetching data
    try {
        data = await fetch(endpoint)
    } catch {
        throw new Error(errorMessage)
    }

    // returning data
    return data.json()
}

// async getUserByName function get user record by name otherwise returns null
export const getUserByName = async (name) => {
    // getting all users
    const users = await getRequest("http://localhost:3000/users/")

    // looping for user with given name
    const user = users.filter(e => e.login == name)
    
    if (user.length == 0) {
        return null
    } else {
        return user[0]
    }
}

// async getCurrentUser function that get info about current user
export const getCurrentUser = async () => {
    // getting currentUser
    const { id } = await getRequest(`http://localhost:3000/currentUser/`)

    // getting all users
    const currentUser = await getRequest(`http://localhost:3000/users/${id}`)

    // returning result
    return currentUser
}

// async getCurrentUserChats function get all chats from currentUser
export const getCurrentUserChats = async () => {
    // getting currentUser
    const currentUser = await getCurrentUser()

    // getting all chats
    const chats = await getRequest(`http://localhost:3000/chats/`)

    // result array
    let resultArray = chats.filter((e)=> e.participants.includes(currentUser.id))
    
    // returning array
    return resultArray
}

// async getMessagesFromChat function gets all messages from chat
export const getMessagesFromChat = async (chatID) => {
    // getting all messages
    const messages = await getRequest("http://localhost:3000/messages/")

    // creating chatMessages
    let chatMessages = []

    // looping through messages
    chatMessages = messages.filter((e) => e.chatID == chatID)

    // returning chatMessages
    return chatMessages
}