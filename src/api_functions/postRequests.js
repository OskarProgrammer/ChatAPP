
// postRequest function post data to endpoint
export const postRequest = async (endpoint, payload, errorMessage=`Error during posting data to ${endpoint}`) => {
    // creating request options
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }


    // posting data
    try {
        await fetch(endpoint, requestOptions)
    } catch {
        throw new Error(errorMessage)
    }
}