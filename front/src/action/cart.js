import { request } from '../utils/request.js';

export const sendCartToServer = async (userId, cart) => {
    const cartToSend = {
        id: userId,
        sum: Array.isArray(cart?.items)
            ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : 0,
        items: Array.isArray(cart?.items)
            ? cart.items.map(item => ({
                ...item,
                image_url: item.imageUrl,
            }))
            : [],
    };

    return await request(`/api/cart/${userId}`, 'PUT', cartToSend);
};
