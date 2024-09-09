
// importing function and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"

export const PersonItem = (props) => {

    // getting personID from props
    const personID = props.personID

    // creating useState variable
    let [personInfo, setPersonInfo] = useState({login:""})

    // useEffect function to get personInfo by personID
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            personInfo = await getRequest(`http://localhost:3000/users/${personID}`)
            setPersonInfo(personInfo)
        },1)

        return () => { clearTimeout(timeout) }
    })


    return (
        <div className="container-fluid col-3 bg-dark text-light p-1 fs-3 fw-bold m-1 item rounded">
            {personInfo.login}
        </div>
    )
}