import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import { userActions } from '../_actions';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(user) {
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.handleSubmit}
            >
                
            <Form.Item {...tailLayout}>
                <h2>Login</h2>
            </Form.Item>

            <Form.Item
                label="FirstName"
                name="firstName"
                rules={[{ required: true, message: 'Please input your firstname!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="LastName"
                name="lastName"
                rules={[{ required: true, message: 'Please input your lastname!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="username"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Link to="/login" className="ant-btn">Login</Link>
            </Form.Item>
        </Form>

        );
    }
}


function mapState(state) {
    return state
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };