import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Navigation from "./components/navigation";
import { Footer } from "./components/home/footer";
import Restaurants from "./components/restaurants";
import SearchedRestaurant from "./components/searched_restaurant";
import RestaurantPage from "./components/restaurant_page/restaurant_page";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import UserProfile from "./components/user_profile/user_profile";
import RestaurantSignUp from "./components/res_auth/signUp";
import RestaurantLogin from "./components/res_auth/login";
import Orders from "./components/restaurant_views/orders";
import ResCategoriesAndMeals from "./components/restaurant_views/categories&meals/categories_and_meals";
import Comments from "./components/restaurant_page/comments";
import Cart from "./components/cart";
function App() {
    return (
        <div className="App">
            <Navigation />
            <Switch>
                <Route exact path="/restaurants" component={Restaurants} />
                <Route path="/restaurants/:name" component={SearchedRestaurant} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/restaurant_register" component={RestaurantSignUp} />
                <Route exact path="/restaurant_login" component={RestaurantLogin} />
                <Route path="/restaurant/:id/comments" component={Comments} />
                <Route path="/restaurant/:id" component={RestaurantPage} />
                <Route path="/my_profile/:id" component={UserProfile} />
                <Route path="/categories_&_meals/:id" component={ResCategoriesAndMeals} />
                <Route path="/cart/:id" component={Cart} />
                <Route path="/orders/:id" component={Orders} />
                <Route exact path="/" component={Home} />
            </Switch>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
