import styled from "styled-components";
import {ControlPanel, Links, Logo} from './index.js'

const HeaderContainer = ({className}) => {
    return (
        <div className={className}>
            <Logo/>
            <Links/>
            <ControlPanel/>
        </div>
    )
}

export const Header = styled(HeaderContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    margin-top: 25px;
    border-bottom: 1px solid #46A35880;
    padding-bottom: 25px;
    width: 100%;
    @media (max-width: 1200px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        margin-top: 20px;
        border-bottom: 1px solid #46A35880;
        padding-bottom: 20px;
        width: 100%;
    }
    @media (max-width: 768px) {
        margin-top: 15px;
        border-bottom: 1px solid #46A35880;
        padding-bottom: 10px;
        width: 100%;
        height: auto;
    }
`