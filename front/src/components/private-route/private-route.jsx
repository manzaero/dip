import {useSelector} from "react-redux";
import {selectUserRole} from "../../selectors/index.js";
import {Navigate} from "react-router-dom";
import {ROLE} from "../../constants/index.js";

export const PrivateRoute = ({element}) => {
    const userRole = useSelector(selectUserRole)

    return userRole === ROLE.ADMIN ? element :
        <Navigate to='/signin'/>
}