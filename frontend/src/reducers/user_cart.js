const initialState = {
    userCart: [],
};

const userCart = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_USER_CART":
            return { userCart: payload };
        case "DELETE_SINGLE_CART_ORDER":
            return { userCart: state.userCart.filter((order) => order.id !== payload) };
        case "UPDATE_ORDER":
            return {
                userCart: state.userCart.map((order) => {
                    if (order.id === payload[0].id) return payload[0];
                    else {
                        return order;
                    }
                }),
            };
        default:
            return state;
    }
};
export default userCart;

export const setUserCart = (userCart) => {
    return {
        type: "SET_USER_CART",
        payload: userCart,
    };
};

export const updateOrder = (order) => {
    return {
        type: "UPDATE_ORDER",
        payload: order,
    };
};

export const deleteSingleOrderCart = (id) => {
    return {
        type: "DELETE_SINGLE_CART_ORDER",
        payload: id,
    };
};
