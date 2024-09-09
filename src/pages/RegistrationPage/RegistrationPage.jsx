
// importing styles
import "./RegistrationPage.css"

// importing functions and components from react library
import { Form, Link } from "react-router-dom"

export const RegistrationPage = () => {


    return(
        <>
            <h2 className=" display-4
                            fw-bold">
                Register Form
            </h2>

            <Form method="POST" action="/register" className="d-flex flex-column gap-3 pt-3">

                <input  type="text" 
                        placeholder="Login"
                        className=" text-center
                                    p-2
                                    fs-4
                                    col-6
                                    mx-auto
                                    rounded
                                    border-0 shadow"/>

                <input  type="password" 
                        placeholder="Password"
                        className=" text-center
                                    p-2
                                    fs-4
                                    col-6
                                    mx-auto
                                    rounded
                                    border-0 shadow"/>

                <input  type="password" 
                        placeholder="Confirm password"
                        className=" text-center
                                    p-2
                                    fs-4
                                    col-6
                                    mx-auto
                                    rounded
                                    border-0 shadow"/>
                
                <p className="">Have got account already ? <Link to="/login">Click here</Link> </p>

                <button className=" btn 
                                    btn-outline-success 
                                    btn-lg
                                    col-6
                                    mx-auto">Sign up</button>
            </Form>
        </>
    )
}

export const registerAction = async () => {
    
}