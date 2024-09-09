
// importing styles
import { NavLink } from "react-router-dom"
import "./StartingTab.css"

export const StartingTab = () => {


    return (
        <>
            <h3 className=" display-4
                            fw-bold">
                Chat APP
            </h3>

            <div className="container-fluid 
                            d-flex flex-row 
                            justify-content-center
                            gap-4
                            mt-4">
                <NavLink to="/login" className="btn btn-outline-primary btn-lg">Sign in</NavLink>
                <NavLink to="/register" className="btn btn-outline-primary btn-lg">Sign up</NavLink>
            </div>
        </>
    )
}