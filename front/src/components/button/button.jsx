import styled from "styled-components";
import {useDispatch} from "react-redux";

const ButtonContainer = ({className, onClick, children, width, ...props}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        if (onClick) {
            onClick(dispatch)
        }
    }

    return (
        <button className={className} onClick={handleClick} {...props}>
            {children}
        </button>
    )
}
export const Button = styled(ButtonContainer)`
    width: ${({width = '100%'}) => width}px;
    min-height: 45px;
    padding-left: 10px;
    margin: 4px 0;
    background: #46A358;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`