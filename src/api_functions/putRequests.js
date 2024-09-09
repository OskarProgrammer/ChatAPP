
// putRequest function put payload into endpoint
export const putRequest = async (endpoint, payload, errorMessage=`Error during putting data into ${endpoint}`) => {
    // creating request options
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }

    // putting data
    try {
        await fetch(endpoint, requestOptions)
    } catch {
        throw new Error(errorMessage)
    }
}