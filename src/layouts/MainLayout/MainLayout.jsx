
//  importing styles
import "./MainLayout.css"

// importing functions and components from react library
import { Outlet } from "react-router-dom"



export const MainLayout = () => {

    return (
        // main layout
        <div className="container-fluid bg-dark min-vh-100 d-flex flex-column">
            <div className="mx-auto my-auto
                            py-4
                            col-lg-7 col-10
                            text-dark text-center
                            bg-light
                            rounded">
                    
                    <Outlet />

            </div>
        </div>
    )
}