import { Route, Routes } from "react-router-dom";
import CreateMenuItem from "../../modules/CreateMenuItem";
import CreateRestaurant from "../../modules/CreateRestaurant";
import DetailedOrder from "../../modules/DetailedOrder";
import Orders from "../../modules/Orders";
import RestaurantMenu from "../../modules/RestaurantMenu";
import OtherRestaurants from "../../modules/OtherRestaurants";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path = "/" element = {<Orders />}/>
            <Route path = "order/:id" element = {<DetailedOrder />}/>
            <Route path = "menu" element = {<RestaurantMenu />}/>
            <Route path = "menu/create" element = {<CreateMenuItem />}/>
            <Route path = "restaurant" element = {<CreateRestaurant />}/>
            <Route path = "otherRestaurants" element = {<OtherRestaurants/>}/>
        </Routes>
    );
};

export default AppRoutes;