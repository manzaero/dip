import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserRole} from "../../../selectors/index.js";
import {ROLE} from "../../../constants/index.js";

const LinksContainer = ({className}) => {
    const userRole = useSelector(selectUserRole);

    return (
        <div className={className}>
            <ul>
                <NavLink to='/'
                         className={({isActive}) => (isActive ? 'active' : '')}>Home</NavLink>
                <NavLink to='/product'
                         className={({isActive}) => (isActive ? 'active' : '')}>Product</NavLink>
                {Number(userRole) === ROLE.ADMIN ? (
                    <NavLink to='/admin'
                             className={({isActive}) => (isActive ? 'active' : '')}>Admin</NavLink>
                ) : null}
            </ul>
        </div>)
}

export const Links = styled(LinksContainer)`
    width: 350px;

    ul {
        font-size: 16px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    a {
        color: black;
        font-weight: 600;

        &:hover {
            color: #46A358;
        }

        &.active {
            color: #46A358;

        }
    }
`