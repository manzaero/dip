import {useEffect} from "react";
import {loadCategories, loadProducts} from "../action/index.js";
import {request} from "../utils/request.js";

export const useLoadData = (dispatch, {
    setLoadingProducts,
    setLoadingCategories,
    setErrorLoadProducts,
    setErrorLoadCategories,
    page = 1,
    limit = 3,
    search = '',
}) => {
    useEffect(() => {
        request(`/api/products?page=${page}&limit=${limit}&search=${search}`)
            .then(({ error, result }) => {
                if (error) {
                    setErrorLoadProducts(`Product loading error: ${error}`);
                    return;
                }

                if (result && Array.isArray(result.products)) {
                    dispatch(loadProducts(result.products, result.data));
                } else {
                    console.error("Unexpected product data structure:", result);
                    setErrorLoadProducts("Invalid product data");
                }

                setLoadingProducts(false);
            });

        request('/api/categories')
            .then(({ error, result }) => {
                if (error) {
                    setErrorLoadCategories(`Categories loading error: ${error}`);
                    return;
                }

                if (Array.isArray(result)) {
                    dispatch(loadCategories(result));
                } else if (Array.isArray(result?.data)) {
                    dispatch(loadCategories(result.data));
                } else {
                    console.error("Unexpected category data structure:", result);
                    setErrorLoadCategories("Invalid category data");
                }

                setLoadingCategories(false);
            });
    }, [dispatch, page, limit, search]);
};
