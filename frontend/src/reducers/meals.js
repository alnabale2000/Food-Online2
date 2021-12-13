const initialState = {
    meals: [],
};

const meals = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_MEALS":
            return { meals: [...payload] };
        case "CREATE_MEAL":
            return { meals: [...state.meals, payload] };

        default:
            return state;
    }
};
export default meals;

export const setMeals = (meals) => {
    return {
        type: "SET_MEALS",
        payload: meals,
    };
};

export const createMeal = (meal) => {
    return {
        type: "CREATE_MEAL",
        payload: meal,
    };
};
