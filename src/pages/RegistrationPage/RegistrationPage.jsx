
// importing styles
import "./RegistrationPage.css"

// importing api functions
import { postRequest } from "../../api_functions/postRequests"
import { putRequest } from "../../api_functions/putRequests"

// importing functions and components from react library
import { Form, Link, redirect, useActionData } from "react-router-dom"
import { getUserByName } from "../../api_functions/getRequests"

export const RegistrationPage = () => {
    // getting actionData
    const actionData = useActionData() 


    return(
        <>
            <h2 className=" display-4
                            fw-bold">
                Register Form
            </h2>

            <Form method="POST" action="/register" className="d-flex flex-column gap-3 pt-3">

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

                <input  type="password" 
                        placeholder="Confirm password"
                        name="confirmPassword"
                        className=" text-center
                                    p-2
                                    fs-4
                                    col-6
                                    mx-auto
                                    rounded
                                    border-0 shadow"/>
                
                <span className="">Have got account already ? <Link to="/login">Click here</Link> </span>

                {actionData && actionData.error && <span className="text-danger" >{actionData.error}</span>}

                <button className=" btn 
                                    btn-outline-success 
                                    btn-lg
                                    col-6
                                    mx-auto">Sign up</button>
            </Form>
        </>
    )
}

export const registerAction = async ( {request} ) => {
    // getting form data
    const formData = await request.formData()

    // getting fields from form
    const login = formData.get("login")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    // validating data
    if (login == "" || password == "" || confirmPassword == "") {
        return { error : "All fields must be provided"}
    }

    if (password != confirmPassword) {
        return { error : "Password and confirm password must be the same"}
    }

    if (!getUserByName(login)) {
        return { error : "This login is taken already"}
    }

    // creating newUser object
    const newUser = {
        id : crypto.randomUUID(),
        login : login,
        password : password
    }

    try {
        await postRequest(`http://localhost:3000/users/`,newUser)
    } catch {
        return { error : "Something went wrong during creating new user"}
    }

    // logging into account
    try {
        await putRequest("http://localhost:3000/currentUser/", { id : newUser.id, isLogged: true})
    } catch {
        return { error : "Something went wrong during logging into account"}
    }

    return redirect("/")
}