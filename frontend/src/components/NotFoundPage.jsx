import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return ((
        <div>
            404 (not found)
            перейти на 
            <Link to="/login"> страницу авторизации</Link>
        </div>
    ))
}

export default NotFoundPage;