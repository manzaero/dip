import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCategories,
    selectCategory,
    selectLoadProducts,
    selectSearchProduct
} from "../../selectors/index.js";
import {setCategories} from "../../action/index.js";
import {Loader} from "../../components/index.js";
import {useState} from "react";
import {Link} from "react-router-dom";
import {productImages} from '../../assets/product-image/index.js'
import {countProductsByCategory, useLoadData} from "../../hooks/index.js";

const MainContainer = ({className}) => {
    const dispatch = useDispatch();
    const lastPage = useSelector(state => state.products.lastPage)
    const searchProduct = useSelector(selectSearchProduct);
    const setCategory = useSelector(selectCategory);
    const [sortToggled, setSortToggle] = useState('reset');
    const products = useSelector(selectLoadProducts);
    const categories = useSelector(selectCategories);
    const productCount = countProductsByCategory(products)
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const limit = 4
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = Array.isArray(products) ? products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchProduct.toLowerCase()) &&
            (!setCategory || product.category === setCategory)
        );
    }) : [];


    const [errorLoadProducts, setErrorLoadProducts] = useState(null)
    const [errorLoadCategories, setErrorLoadCategories] = useState(null)

    useLoadData(dispatch, {
        setLoadingCategories,
        setLoadingProducts,
        setErrorLoadProducts,
        setErrorLoadCategories,
        page: currentPage, limit,
        search: searchProduct,
        category: setCategory,
    })


    const sortedProducts = [...filteredProducts]
    if (sortToggled === 'descending') {
        sortedProducts.sort((a, b) => {
            return (Number(b.price) || 0) - (Number(a.price) || 0);
        });
    } else if (sortToggled === 'ascending') {
        sortedProducts.sort((a, b) => {
            return (Number(a.price) || 0) - (Number(b.price) || 0);
        });
    }

    const handleValue = (e) => {
        setSortToggle(e.target.value)
    }

    const handleCategories = (category) => {
        dispatch(setCategories(category))
        setSortToggle(('reset'))
    }
    return (
        <div className={className}>
            {(loadingProducts || loadingCategories) ? (
                <Loader/>
            ) : errorLoadProducts ? (
                <div>{errorLoadProducts}</div>
            ) : errorLoadCategories ? (
                <div>{errorLoadCategories}</div>
            ) : (
                <>
                    <div className="main-categories">
                        <p>Categories</p>
                        <ul>
                            {categories.map((item) => (
                                <li className="active" key={item._id}
                                    onClick={() => handleCategories(item.category)}>
                                    <span>{item.name}</span>
                                    <span>{productCount[item.category] || 0}</span>
                                </li>
                            ))}
                            <li className="active" key="all-categories"
                                onClick={() => dispatch(setCategories(null))}>
                                <span>All categories</span>
                            </li>
                        </ul>
                    </div>

                    <div className="main-cards">
                        <select value={sortToggled} name="sort" id="sort"
                                onChange={handleValue}>
                            <option value="reset">Sort by default</option>
                            <option value="descending">Descending</option>
                            <option value="ascending">Ascending</option>
                        </select>

                        {sortedProducts.length === 0 ? (
                            <div style={{padding: '20px'}}>No products
                                found.</div>
                        ) : (
                            <div className="cards">
                                {sortedProducts.map((item) => (
                                    <Link to={`/product/${item.id}`}
                                          className="card"
                                          key={item.id}>
                                        <img
                                            src={productImages[item.imageUrl.replace('.png', '')]}
                                            alt={item.name}/>
                                        <div className="product-description">
                                            <div
                                                className="product-name">{item.name}</div>
                                            <div
                                                className="product-price">$ {item.price}.00
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div className="pagination">
                            <button onClick={() => setCurrentPage(p => p - 1)}
                                    disabled={currentPage === 1}>← Prev
                            </button>
                            <span>Page {currentPage} of {lastPage}</span>
                            <button onClick={() => setCurrentPage(p => p + 1)}
                                    disabled={currentPage === lastPage}>Next →
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export const Main = styled(MainContainer)`
    display: flex;

    .main-categories {
        min-width: 310px;
        height: 100%;
        background-color: #FBFBFB;
        padding: 18px;

        p {
            font-size: 18px;
            font-weight: 700;
        }

        ul {
            padding: 0 12px;
            font-size: 15px;

            li {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;

                span {
                    cursor: pointer;
                }
            }
        }
    }

    .main-cards {
        margin: 0 0 100px 50px;

        .cards {
            display: grid;
            grid-template-columns: auto auto auto;
        }

        .card {
            width: 260px;
            height: 300px;
            margin: 70px 32px 0 0;
            border: solid 1px #eeeeee;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;

            img {
                width: 250px;
                height: 250px;
                margin: 30px 4px;
            }
        }

        .card:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
            border-top: 1px solid #46A358;
        }
        .pagination {
            margin-top: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            font-weight: 300;
            font-size: 16px;
            color: #333;
        }

        .pagination button {
            background-color: #46A358;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .pagination button:disabled {
            background-color: #ccc;
            cursor: default;
            color: #666;
        }

        .pagination button:not(:disabled):hover {
            background-color: #3a8c49;
        }

        .pagination span {
            min-width: 100px;
            text-align: center;
        }

    }
`