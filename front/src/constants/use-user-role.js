import {useSelector} from "react-redux";
import {selectUserRole} from "../selectors/index.js";
import {ROLE} from "./role.js";

export const useUserRole = () => {
    const userRole = useSelector(selectUserRole);
    return userRole !== ROLE.GUEST;
}