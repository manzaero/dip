import styled from "styled-components";

const TitleContainer = ({className, children}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export const Title = styled(TitleContainer)`
    font-size: 20px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`