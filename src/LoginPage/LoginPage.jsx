import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};
  

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.logout();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.login(values.username, values.password);
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
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
                    <Link to="/register" className="ant-btn">Register</Link>
                </Form.Item>
            </Form>
        );
    }
}


const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

function mapState(state) {
    return state
}

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };