export const countProductsByCategory = (products) => {
    if (!Array.isArray(products)) return {};

    return products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});
};
