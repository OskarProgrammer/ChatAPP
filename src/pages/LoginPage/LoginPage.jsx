
// importing styles
import "./LoginPage.css"

// importing functions and components from react library
import { Form, Link } from "react-router-dom"

export const LoginPage = () => {


    return (
        <>
            <h2 className=" display-4
                            fw-bold">
                Login Form
            </h2>

            <Form method="POST" className="d-flex flex-column gap-3 pt-3">

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
                
                <p className="">Haven't got account yet ? <Link to="/register">Click here</Link> </p>

                <button className=" btn 
                                    btn-outline-success 
                                    btn-lg
                                    col-6
                                    mx-auto">Sign in</button>
            </Form>
        </>
    )
}

