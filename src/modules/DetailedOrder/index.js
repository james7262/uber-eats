import { Card, Descriptions, Divider, List, Button, Tag, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, User, OrderDish, Dish } from '../../models';

const statusToColor = {
    PENDING: 'blue',
    COMPLETED: 'green',
    ACCEPTED: 'orange',
    DECLINED: 'red'
};

const DetailedOrder = () => {

    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState(null);
    const [orderDishes, setOrderDishes] = useState([]);
    const [finalOrderDishes, setFinalOrderDishes] = useState([]);

    useEffect (() => {
        if (!id) {
            return;
        }
        DataStore.query(Order, id).then(setOrder);
    }, [id]);

    useEffect (() => {
        if (!order?.userID) {
            return;
        }
        DataStore.query(User, order.userID).then(setCustomer);
    }, [order?.userID]);

    useEffect (() => {
        if (!order?.id) {
            return;
        }
        DataStore.query(OrderDish, (od) =>
            od.orderID.eq(order.id)).then(setOrderDishes);
    }, [order?.id]);

    useEffect (() => {
        if (!orderDishes) {
            return;
        }
        // Query all of the dishes.
        const fetchDishes = async () => {
            const dishes = await DataStore.query(Dish);
            // Assign the dishes to the order dishes where the order ids are the same.
            setFinalOrderDishes(
                orderDishes.map(orderDish => ({
                    ...orderDish,
                    Dish: dishes.find(d => d.id === orderDish.orderDishDishId),
                }))
            );
        };
        fetchDishes();
    }, [orderDishes]);

    if (!order) {
        return <Spin size = 'large'/>
    }

    return (
        <Card title = {`Order Number ${id}`} style = {styles.page}>
            <Descriptions bordered column = {{lg: 1, md: 1, sm: 1}}>
                <Descriptions.Item label = 'Order Status'>
                    <Tag color = {statusToColor[order?.status]}>{order?.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label = 'Customer'>{customer?.name}</Descriptions.Item>
                <Descriptions.Item label = 'Customer Address'>{customer?.address}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <List
                dataSource = {finalOrderDishes}
                renderItem = {(dishItem) => (
                    <List.Item>
                        <div style = {styles.dishItem}>{dishItem?.Dish?.name} x{dishItem?.quantity}</div>
                        <div>${dishItem?.Dish?.price.toFixed(2)}</div>
                    </List.Item>
                )}
            >
            </List>
            <Divider />
            <div style = {styles.totalContainer}>
                    <h2>Total:</h2>
                    <h2 style = {styles.totalPrice}>${order.total && order.total.toFixed(2)}</h2>
            </div>
            <Divider />
            <div style = {styles.buttonsContainer}>
                    <Button
                        block
                        danger
                        type = 'primary'
                        size = 'large'
                        style = {styles.button}
                    >
                        Decline Order
                    </Button>
                    <Button
                        block
                        type = 'primary'
                        size = 'large'
                        style = {styles.button}
                    >
                        Accept Order
                    </Button>
                    <Button
                        block
                        type = 'default'
                        size = 'large'
                        style = {styles.button}
                    >
                        Food is Done
                    </Button>
            </div>
        </Card>
    );
};

const styles = {
    page: {
        margin: 20,
    },
    dishItem: {
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    totalPrice: {
        marginLeft: 'auto',
    },
    buttonsContainer: {
        display: 'flex',
        paddingBottom: 30,
    },
    button: {
        marginRight: 5,
        marginLeft: 5,
    },
}

export default DetailedOrder;