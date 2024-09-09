import { Link } from "react-router-dom"

export const Bar = (props) => {

    // getting chatInfo from props
    const chatInfo = props.chatInfo


    return (
        <div className="container-fluid d-flex flex-row bar justify-content-between">

                <div></div>

                <div className="my-auto">
                    <h2 className="display-6 fw-bold">{chatInfo.name}</h2>
                </div>

                <div className="my-auto p-2">
                    <Link to={`/account/chatInfo/${chatInfo.id}`} className="btn btn-outline-primary">
                        <i class="bi bi-pencil fs-4"/>
                    </Link>
                </div>

        </div>
    )
}