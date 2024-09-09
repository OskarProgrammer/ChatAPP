
//  importing styles
import "./MainLayout.css"

// importing functions and components from react library
import { Outlet } from "react-router-dom"



export const MainLayout = () => {

    return (
        // main layout
        <div className="container-fluid bg-dark min-vh-100 d-flex flex-column">
            {/* content of page if user is not logged in */}
            <div className="mx-auto my-auto
                            py-5
                            col-lg-6 col-10
                            text-dark text-center
                            bg-light
                            rounded">
                    
                    <Outlet />

            </div>
        </div>
    )
}