import { Card, Input, Button, InputNumber, Message, TextArea, Form } from "antd"; 

const CreateMenuItem = () => {
    return (
        <Card title = {'Create New Item'} style = {styles.page}>
            <Form layout = "vertical">

            </Form>
        </Card>
    );
};

const styles = {
    page: {
        margin: 20,
    }
};

export default CreateMenuItem;