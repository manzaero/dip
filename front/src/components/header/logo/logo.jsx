import styled from "styled-components";
import logo from '../../../assets/logo/Logo.png'
import {Link} from "react-router-dom";
const LogoContainer = ({className}) => (
    <Link to="/" className={className}>
        <img src={logo} alt="logo"/>
    </Link>
)
export const Logo = styled(LogoContainer)`
    display: flex;
    align-items: center;
    height: 100%;
`