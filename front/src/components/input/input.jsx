import styled from "styled-components";
import {forwardRef} from "react";

export const InputContainer = forwardRef(
    ({className, width, ...props}, ref) => {
        return <input className={className} {...props} ref={ref}/>
    })

export const Input = styled(InputContainer)`
    min-width: ${({width = '100%'}) => width};
    padding-left: 14px;
    border: 1px solid #EAEAEA
`