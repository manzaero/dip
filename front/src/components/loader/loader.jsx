import styled from "styled-components";

const LoaderContainer = ({className}) => {
    return <div className={className}/>;
};

export const Loader = styled(LoaderContainer)`
    width: 65px;
    aspect-ratio: 1;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 0 3px inset #46A358;
        animation: l4 2.5s infinite;
    }

    &::after {
        animation-delay: -1.25s;
    }

    @keyframes l4 {
        0% {
            inset: 0 35px 35px 0;
        }
        12.5% {
            inset: 0 35px 0 0;
        }
        25% {
            inset: 35px 35px 0 0;
        }
        37.5% {
            inset: 35px 0 0 0;
        }
        50% {
            inset: 35px 0 0 35px;
        }
        62.5% {
            inset: 0 0 0 35px;
        }
        75% {
            inset: 0 0 35px 35px;
        }
        87.5% {
            inset: 0 0 35px 0;
        }
        100% {
            inset: 0 35px 35px 0;
        }
    }
`;
