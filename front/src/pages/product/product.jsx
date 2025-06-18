import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { productImages } from '../../assets/product-image/index.js';
import {addToCart, fetchProductById} from '../../action/index.js';
import { useUserRole } from '../../constants/index.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
    selectCart, selectProduct, productNotFound
} from '../../selectors/index.js';
import { sendCartToServer } from '../../action/cart.js';

const ProductContainer = ({ className }) => {
    const selectedProduct = useSelector(selectProduct);
    const notFound = useSelector(productNotFound);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const userRole = useUserRole();
    const { id } = useParams();
    const userId = useSelector((state) => state.user.id);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    if (notFound) {
        return <div>Product not found</div>;
    }

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    const imageKey = selectedProduct.imageUrl?.replace('.png', '');
    const image = productImages[imageKey];

    const addProductToCart = async () => {
        const productToAdd = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            imageUrl: selectedProduct.imageUrl,
            quantity: 1,
        };
        dispatch(addToCart(productToAdd));

        if (userId) {
            const updatedCart = {
                items: [...(cart.items || []), productToAdd],
            };
            await sendCartToServer(userId, updatedCart);
        } else {
            console.warn('User is not logged in, cannot save cart to server');
        }
    };

    return (
        <div className={className}>
            <div className="product-img">
                <img src={image} alt="product image" />
            </div>
            <div>
                <div className="title">
                    <p className="product-name">{selectedProduct.name}</p>
                    <div className="product-stock">
                        <p className="product-price">$ {selectedProduct.price}.00</p>
                        <p className="product-in-stock">
                            In stock: {selectedProduct.count}
                        </p>
                    </div>
                </div>
                <div className="hr"></div>
                <div className="title-description">
                    <div className="description-title">Short Description:</div>
                    <div className="description-text">
                        {selectedProduct.productDescription}
                    </div>
                    <div className="product-buy">
                        {userRole ? (
                            <button className="buy-btn" onClick={addProductToCart}>
                                Add to cart
                            </button>
                        ) : (
                            <p>Please LogIn to add to cart</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Product = styled(ProductContainer)`
    display: flex;

    .product-img {
        width: 400px;
        height: 400px;
        margin-right: 75px;
    }

    .product-stock {
        display: flex;
        justify-content: space-between;
    }

    .product-in-stock {
        font-weight: 600;
    }

    .title {
        margin-bottom: -12px;
    }

    .product-name {
        font-size: 28px;
        font-weight: 700;
    }

    .product-price {
        font-size: 22px;
        color: #46A358;
        font-weight: 700;
        margin-top: 12px;
    }

    .hr {
        border: 1px solid #d6ffd6;
    }

    .title-description {
        margin: 16px 0 0 0;

        p {
            font-size: 16px;
            padding-left: 20px;
        }
    }

    .description-title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .description-text {
        font-size: 18px;
        color: #727272;
    }

    .product-buy {
        display: flex;
        margin-top: 24px;
        align-items: center;
    }


    span {
        padding: 0 20px;
        font-size: 20px;
    }

    .buy-btn {
        width: 130px;
        height: 40px;
        border-radius: 6px;
        border: none;
        background-color: #46A358;
        color: #ffffff;
        text-transform: uppercase;
        margin-left: 26px;
        cursor: pointer;

        &:hover {
            background: #d6ffd6;
            color: #46A358;
        }
    }
`