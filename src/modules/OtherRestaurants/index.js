// Import statements.
import { useState, useEffect } from 'react';
import { Card, Table } from "antd";
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';
import { useRestaurantContext } from '../../context/RestaurantContext';

const OtherRestaurants = () => {

    // Page constants.
    const [otherRestaurants, setOtherRestaurants] = useState([]);       // UseState variable to hold array of restaurants.
    const { sub } = useRestaurantContext();                             // Sub field constant exposed in RestaurantContext.

    useEffect(() => {
        if (!sub) {
            return;
        }
        DataStore.query(Restaurant, (r) => r.adminSub.ne(sub)).then(setOtherRestaurants);
    }, [sub]);

    // Array constant for OtherRestaurant table columns.
    const tableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, restaurant) => <a href={restaurant.image} target = {"_blank"} rel = {"noreferrer"}> {restaurant.name} </a>
        }
    ];

    return (
        // Page formatting.
        <Card title = 'Other Restaurants' style = {StyleSheet.Card} >
            <Table 
               dataSource = {otherRestaurants} 
               columns = {tableColumns}
               rowKey = 'id'
            />
        </Card>
    );
};

// Page StyleSheet.
const StyleSheet = {
    Card: {
        margin: 20,
    }
};

export default OtherRestaurants;