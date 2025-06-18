import styled from "styled-components";
import {Footer, Header, PrivateRoute} from "./components";
import {Route, Routes} from "react-router-dom";
import {
    AdminPanel,
    Authorization,
    Cart,
    Main,
    Product,
    Registration
} from "./pages/index.js";


const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1250px;
    min-height: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 0 25px;
`

const Pages = styled.div`
    padding: 50px 0;
`

export const Shop = () => {
    return (
        <AppColumn>
            <Header/>
            <Pages>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/product/:id" element={<Product/>}/>
                    <Route path="/product" element={<div>Select product</div>} />
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/signin" element={<Authorization/>}/>
                    <Route path="/signup" element={<Registration/>}/>
                    <Route path="/admin"
                           element={<PrivateRoute element={<AdminPanel/>}/>}/>
                    <Route path="*" element={<div>404</div>}/>
                </Routes>
            </Pages>
            <Footer/>
        </AppColumn>
    )
}
