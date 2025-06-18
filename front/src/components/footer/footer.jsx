import styled from "styled-components";
import {ContactsPanel} from "./contacts-panel/contacts-panel.jsx";

const FooterContainer = ({className}) => {
    return (
        <div className={className}>
            <ContactsPanel/>
        </div>
    )
}
export const Footer = styled(FooterContainer)`
    border-bottom: 1px solid #46A35833;
`