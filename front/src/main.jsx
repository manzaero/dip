import {createRoot} from 'react-dom/client'
import './index.css'
import {Shop} from './Shop.jsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store.js";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <Shop/>
        </Provider>
    </BrowserRouter>
)
