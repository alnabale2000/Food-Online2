const initialState = {
    restaurants: [],
    restaurant: {},
};

const restaurants = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_RESTAURANTS":
            return { restaurants: [...payload] };
        case "GET_NEW_RESTAURANTS":
            return { restaurants: [...payload] };
        case "GET_RESTAURANT_DATA":
            return { restaurant: { ...payload } };
        default:
            return state;
    }
};
export default restaurants;

export const setRestaurants = (restaurants) => {
    return {
        type: "SET_RESTAURANTS",
        payload: restaurants,
    };
};

export const getNewRestaurant = (restaurants) => {
    return {
        type: "GET_NEW_RESTAURANTS",
        payload: restaurants,
    };
};

export const getRestaurantData = (restaurant) => {
    return {
        type: "GET_RESTAURANT_DATA",
        payload: restaurant,
    };
};
