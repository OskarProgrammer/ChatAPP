
// importing functions and components from react library
import { NavLink } from "react-router-dom"


export const LeftSideBarButtons = (props) => {

    // getting data from props
    const currentUser = props.currentUser

    return (
        <div className="container-fluid d-flex flex-lg-column flex-sm-row flex-row gap-3">

                    {/* profile button */}
                    <NavLink to="userSettings" className="btn btn-outline-primary 
                                        container-fluid 
                                        shadow  
                                        d-flex flex-column gap-1 rounded p-2
                                        col-lg-12 col-md-4 col-sm-4 col-4
                                        textWrapping">

                        <i className="bi bi-person fs-4"/>
                        <span className="my-auto fs-5">{currentUser.login}</span>

                    </NavLink>

                    <NavLink to="createChat" className="btn btn-outline-success 
                                        container-fluid 
                                        shadow  
                                        d-flex flex-column gap-1 rounded p-2
                                        col-lg-12 col-md-4 col-sm-3 col-4
                                        textWrapping">

                        <i className="bi bi-plus fs-2 my-auto"/>

                    </NavLink>
                    
        </div>
    )
}