import styled from "styled-components";
import { Button } from "../../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectorCartSum } from "../../selectors/index.js";
import {
    clearCart,
    decrementFromCart,
    incrementFromCart,
    removeToCart
} from "../../action/index.js";
import { productImages } from "../../assets/product-image/index.js";
import { icons } from "../../assets/icon/index.js";
import { useEffect } from "react";
import { request } from "../../utils/request.js";
import { setCart } from "../../action/set-cart.js";

const CartContainer = ({ className }) => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const sum = useSelector(selectorCartSum);


    const items = Array.isArray(cart?.items) ? cart.items : [];

    const handleClick = () => {
        dispatch(clearCart());
    };

    const decrementProductCount = (id) => {
        dispatch(decrementFromCart(id));
    };

    const incrementProductCount = (id) => {
        dispatch(incrementFromCart(id));
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.log('User not authorized, skipping cart load');
            return;
        }

        async function loadCart() {
            const { error, result } = await request('/api/cart', 'GET');
            if (error) {
                console.error('loading cart', error);
                return;
            }

            dispatch(setCart({
                items: result.items || [],
                sum: result.sum ?? 0,
            }));
        }

        loadCart().catch(console.error);
    }, [dispatch]);



    return (
        <div className={className}>
            <div className="product-cart">
                <table className="product-list">
                    <thead>
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.length !== 0 ? items.map((item) => (
                            <tr className="product-data" key={item.id}>
                                <td className="product">
                                    <img
                                        src={productImages[item.imageUrl?.replace('.png', '')] || ''}
                                        alt={item.name}
                                    />
                                    <div>
                                        <p>{item.name}</p>
                                    </div>
                                </td>
                                <td className="product-price">${item.price}.00</td>
                                <td className="td-quantity">
                                    <button className="quantity-btn"
                                            onClick={() => decrementProductCount(item.id)}>-</button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button className="quantity-btn"
                                            onClick={() => incrementProductCount(item.id)}>+</button>
                                </td>
                                <td className="total-price">${item.price * item.quantity}.00</td>
                                <td>
                                    <button className="delete-btn"
                                            onClick={() => dispatch(removeToCart(item.id))}>
                                        <img src={icons.delete} alt="Delete" />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td className="product-empty" colSpan={5}>Cart is empty</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div className="product-total">
                    <h4>Cart total</h4>
                    <div className="cart-total">
                        <p>Subtotal:</p>
                        <span>${sum}.00</span>
                    </div>
                    <div className="btn-container">
                        <Button children={"Buy"} width={300} />
                        <Button onClick={handleClick} children={"Clear"} width={300} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export const Cart = styled(CartContainer)`
    .product-list {
        width: 100%;
        background-color: #FBFBFB;
    }


    th {
        text-align: left;
        padding: 15px;
        border-bottom: 2px solid #dcdcdc;
        font-size: 16px;
    }

    td {
        padding: 15px;
    }

    .product {
        display: flex;
        margin: 30px 80px 30px 0;
        align-items: center;
    }

    .product img {
        width: 70px;
        height: 70px;
        margin-right: 15px;
    }


    .td-quantity {
        align-items: center;
    }

    .quantity-btn {
        width: 30px;
        height: 30px;
        background: #4CAF50;
        border: none;
        color: white;
        font-size: 18px;
        border-radius: 50%;
        cursor: pointer;
        margin: 0 5px;
    }

    .total {
        font-weight: bold;
        color: #4CAF50;
    }

    .delete {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #aaa;
    }

    .product-cart {
        display: flex;
        justify-content: space-between;
    }

    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-weight: 600;
        }
    }

    .product-price {
        font-weight: 600;
    }

    .btn-container {
        display: flex;
        flex-direction: column;
    }

    .delete-btn {
        border: none;
        cursor: pointer;
    }

    .product-total {
        margin-left: 40px;
    }

    .product-empty {
        font-size: 14px;
        font-weight: 600;
    }
`