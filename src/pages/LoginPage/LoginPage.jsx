
// importing styles
import { getUserByName } from "../../api_functions/getRequests"
import { putRequest } from "../../api_functions/putRequests"
import "./LoginPage.css"

// importing functions and components from react library
import { Form, Link, redirect, useActionData } from "react-router-dom"

export const LoginPage = () => {

    // getting actionData
    const actionData = useActionData()

    return (
        <>
            <h2 className=" display-4
                            fw-bold">
                Login Form
            </h2>

            <Form method="POST" action="/login" className="d-flex flex-column gap-3 pt-3">

                <input  type="text" 
                        placeholder="Login"
                        name="login"
                        className=" text-center
                                    p-2
                                    fs-4
                                    col-6
                                    mx-auto
                                    rounded
                                    border-0 shadow"/>

                <input  type="password" 
                        placeholder="Password"
                        name="password"
                        className=" text-center
                                    p-2
                                    fs-4
                                    col-6
                                    mx-auto
                                    rounded
                                    border-0 shadow"/>
                
                <span className="">Haven't got account yet ? <Link to="/register">Click here</Link> </span>
                
                {actionData && actionData.error && <span className="text-danger" >{actionData.error}</span>}

                <button className=" btn 
                                    btn-outline-success 
                                    btn-lg
                                    col-6
                                    mx-auto">Sign in</button>
            </Form>
        </>
    )
}

export const loginAction = async ( { request } ) => {
    
    // getting formData
    const formData = await request.formData()

    // getting form fields
    const login = formData.get('login')
    const password = formData.get("password")

    // validating data
    if ( login == "" || password == "" ) {
        return { error : "All fields must be provided" }
    } 

    const user = await getUserByName(login)

    if ( !user ) {
        return { error : "This account doesn't exist"}
    }

    // creatint newCurrent object
    const newCurrent = {
        id : user.id,
        isLogged : true
    }

    try {
        await putRequest("http://localhost:3000/currentUser/", newCurrent)
    } catch {
        return { error : "Something went wrong during logging"}
    }

    return redirect("/account/")
}