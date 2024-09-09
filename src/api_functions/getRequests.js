
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