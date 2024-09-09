
//  importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"

export const PersonTab = (props) => {

    // getting id from props
    const id = props.personID

    // creating useState variable
    let [personInfo, setPersonInfo] = useState({})


    // useEffect to get info about person
    useEffect(()=>{
        const timeout = setTimeout(async () => {

            personInfo = await getRequest(`http://localhost:3000/users/${id}`)
            setPersonInfo(personInfo)

        },1)

        return () => { clearTimeout(timeout) }
    })

    return (
        <span className="text-muted">{personInfo.login}</span>
    )
}