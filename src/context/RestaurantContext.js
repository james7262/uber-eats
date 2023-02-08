import { createContext, useContext, useState, useEffect } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Restaurant } from "../models";

const RestaurantContextProvider = ({children}) => {

    const [user, setUser] = useState();
    const [restaurant, setRestaurant] = useState();
    const sub = user?.attributes?.sub;
};

export default RestaurantContextProvider;