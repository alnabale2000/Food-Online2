const initialState = {
    categories: [],
    categoryMeals: [],
};

const categories = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_CATEGORIES":
            return { categories: [...payload, []] };
        case "CREATE_CATEGORY":
            return { categories: [...state.categories, payload] };
        case "DELETE_CATEGORY":
            return { categories: state.categories.filter((category) => category.id !== payload) };
        case "SET_CATEGORY_MEALS":
            return {
                categories: state.categories,
                categoryMeals: payload,
            };
        case "DELETE_MEAL":
            return {
                categories: state.categories,
                categoryMeals: state.categoryMeals.filter((meal) => meal.id !== payload),
            };
        default:
            return state;
    }
};
export default categories;

export const setCategories = (categories) => {
    return {
        type: "SET_CATEGORIES",
        payload: categories,
    };
};

export const createCategory = (category) => {
    return {
        type: "CREATE_CATEGORY",
        payload: category,
    };
};

export const deleteCategory = (id) => {
    return {
        type: "DELETE_CATEGORY",
        payload: id,
    };
};

export const setCategoryMeals = (meals) => {
    return {
        type: "SET_CATEGORY_MEALS",
        payload: meals,
    };
};

export const deleteMeal = (id) => {
    return {
        type: "DELETE_MEAL",
        payload: id,
    };
};
