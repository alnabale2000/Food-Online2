import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loginReducer from "./login";
import restaurants from "./resturants";
import categories from "./categories";
import meals from "./meals";
import user from "./users";
import address from "./address";
import orders from "./orders";
import isCommentPage from "./switcher";
import comments from "./comments";
import userCart from "./user_cart";

const reducers = combineReducers({
    restaurants,
    categories,
    meals,
    loginReducer,
    user,
    address,
    orders,
    isCommentPage,
    comments,
    userCart,
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
