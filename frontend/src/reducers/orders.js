const initialState = {
    userOrders: [],
    restaurantOrders: [],
};

const orders = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_USER_ORDERS":
            return { userOrders: [...payload] };
        case "DELETE_ORDER":
            return {
                userOrders: state.userOrders.filter((order) => order.id !== Number(payload)),
            };
        case "DELETE_RESTAURANT_ORDER":
            return {
                restaurantOrders: state.restaurantOrders.filter(
                    (order) => order.id !== Number(payload)
                ),
            };
        case "SET_RESTAURANT_ORDERS":
            return { restaurantOrders: [...payload, []] };

        default:
            return state;
    }
};
export default orders;

export const setUserOrders = (orders) => {
    return {
        type: "SET_USER_ORDERS",
        payload: orders,
    };
};

export const deleteOrder = (orderId) => {
    return {
        type: "DELETE_ORDER",
        payload: orderId,
    };
};

export const deleteRestaurantOrder = (orderId) => {
    return {
        type: "DELETE_RESTAURANT_ORDER",
        payload: orderId,
    };
};

export const setRestaurantOrders = (orders) => {
    return {
        type: "SET_RESTAURANT_ORDERS",
        payload: orders,
    };
};
