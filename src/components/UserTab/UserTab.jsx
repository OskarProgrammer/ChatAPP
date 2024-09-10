
// importing functions and components from react library
import { useEffect, useState } from "react"

// importing api functions
import { getRequest } from "../../api_functions/getRequests"

export const UserTab = (props) => {
    
    // getting id from props 
    const id = props.personID

    // creating useState variables
    let [userInfo, setUserInfo] = useState({})

    // useEffect to get info about id
    useEffect(()=>{
        const timeout = setTimeout( async () => {
            
            try {
                // getting info about person 
                userInfo = await getRequest(`http://localhost:3000/users/${id}`)
                setUserInfo(userInfo)
            } catch { return }

        },1)

        return () => { clearTimeout(timeout) }
    })



    return (
        <div className="container-fluid d-flex flex-row justify-content-center gap-3 col-4 bg-dark text-light  fs-3 fw-bold m-1 item rounded">
            <p>{userInfo.login}</p>
            <button onClick={()=>{ props.onRemove(id) }} className="btn btn-outline-danger my-2 my-auto">
                <i class="bi bi-trash" />
            </button>
        </div>
    )
}