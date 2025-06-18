import styled from "styled-components";
import logo from "../../../assets/logo/Logo.png";
import location from "../../../assets/icon/Location.png";
import message from '../../../assets/icon/Message.png';
import {Link} from "react-router-dom";


const ContactsPanelContainer = ({className}) => (
    <div className={className}>
        <div>
            <Link to='/'>
                <img className='footer-logo' src={logo} alt="logo"/>
            </Link>
        </div>
        <div className='footer-address'>
            <img src={location} alt="location"/>
            <a target='_blank'
               href='https://www.google.com/maps/place/%D0%9F%D0%B0%D1%80%D0%BA%D0%B8%D0%BD%D0%B3+%22%D0%97%D0%B2%D0%B5%D0%B7%D0%B4%D1%8B+%D0%90%D1%80%D0%B1%D0%B0%D1%82%D0%B0%22/@55.7537499,37.5789809,17.5z/data=!3m1!5s0x46b54bca9e5dff73:0xaaf13f66e6edb7b5!4m15!1m8!3m7!1s0x46b54bb34d644c67:0x4666bf5bc9bd0924!2z0YAt0L0g0JDRgNCx0LDRgiwg0JzQvtGB0LrQstCwLCDQoNC-0YHRgdC40Y8!3b1!8m2!3d55.7525729!4d37.5832858!16s%2Fg%2F1hjgmdr03!3m5!1s0x46b54bca9f0634f3:0xd4fc6c15cf24d7f5!8m2!3d55.753422!4d37.5807501!16s%2Fg%2F11cnbs1p3f?hl=ru&entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D'>

                st. New Arbat, 32,  <br/>Moscow, Russia, 121099</a>
        </div>
        <div>
            <img src={message} alt="message"/>
            <a href="mailto:contact@greenshop.com">contact@greenshop.com</a>
        </div>
        <div>
            <img src={message} alt="message"/>
            <p>+7 444 333 22 11</p>
        </div>
    </div>
)

export const ContactsPanel = styled(ContactsPanelContainer)`
    width: 100%;
    height: 80px;
    display: flex;
    background-color: #46A3581A;
    justify-content: space-around;
    align-items: center;
    gap: 20px;

    & .footer-logo img {
        height: 40px;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`