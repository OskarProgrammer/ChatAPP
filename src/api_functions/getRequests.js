
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
    users.map((user) => {
        if ( user.login == name ) {
            return user
        } 
    })

    return null
}