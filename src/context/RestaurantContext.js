import { createContext, useContext, useState, useEffect } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Restaurant } from "../models";

const RestaurantContext = createContext();

const RestaurantContextProvider = ({children}) => {

    const [user, setUser] = useState();
    const [restaurant, setRestaurant] = useState();
    const sub = user?.attributes?.sub;

    useEffect(() => {
        Auth.currentAuthenticatedUser({bypassCache: true}).then(setUser);
    }, []);

    useEffect(() => {
        if (!sub) {
            return;
        }
        DataStore.query(Restaurant, (r) => r.adminSub.eq(sub)).then(
            (restaurants) => setRestaurant(restaurants[0])
        );
    }, [sub]);

    console.log(restaurant);

    return (
        <RestaurantContext.Provider value = {{sub, restaurant, setRestaurant}}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);