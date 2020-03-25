import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Avatar, List, Button, Input } from 'antd';
import 'antd/dist/antd.css';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatingContact: false,
            editContact: null,
        }

        this.newContactName = "";
        this.newContactPhone = "";
        this.createUserContact = this.createUserContact.bind(this); 
        this.cancelCreating = this.cancelCreating.bind(this); 
        this.setNewContactName = this.setNewContactName.bind(this); 
        this.setNewContactPhone = this.setNewContactPhone.bind(this);
        this.editUserContact = this.editUserContact.bind(this);
        this.contactRowContent = this.contactRowContent.bind(this);
        this.updateUserContacts = this.updateUserContacts.bind(this);
    }

    componentDidMount() {
        this.props.getUserContacts(this.props.user.id);
    }

    deleteUserContacts(id) {
        this.props.deleteUserContacts({id});
    }

    updateUserContacts(id) {
        const data = {
            name: this.newContactName,
            phone: this.newContactPhone,
            id
        };
        this.props.updateUserContacts(data);
        this.editUserContact(null);
    }

    addUserContacts(id) {
        const data = {
            name: this.newContactName,
            phone: this.newContactPhone,
            userId: id
        };

        this.props.addUserContacts(data);
        this.cancelCreating();
    }

    createUserContact() {
        this.setState({
            creatingContact: true,
        });
    }

    cancelCreating() {
        this.setState({
            creatingContact: false,
        },
        () => {
            this.newContactName = "";
            this.newContactPhone = "";
        });
    }

    setNewContactName(event) {
        this.newContactName = event.target.value;
    }

    setNewContactPhone(event) {
        this.newContactPhone = event.target.value;
    }

    editUserContact(id) {
        this.setState({
            editContact: id,
        })
    }

    contactRowContent(contact, index) {
        if (contact.id !== this.state.editContact) {
            return <span style={{ width: '100%' }} key={index}>{contact.name} {contact.phone} 
                <div style={{float: 'right'}}>
                    <Button onClick={() =>this.editUserContact(contact.id)} default>edit</Button>
                    <Button onClick={() => this.deleteUserContacts(contact.id)} danger>delete</Button>
                </div>
            </span>;
        }

        return <span key={index} style={{ width: '100%' }}>
            <Input placeholder="write name" defaultValue={contact.name} onChange={this.setNewContactName} />
            <Input placeholder="write phone" defaultValue={contact.phone}  onChange={this.setNewContactPhone} />
            <div style={{float: 'right'}}>
                <Button onClick={() => this.updateUserContacts(contact.id)} type="primary">update</Button>
                <Button onClick={()=>this.editUserContact(null)} default>Cancel</Button>
            </div>
          </span>;
    }

    renderContacts(contacts) {
        const { creatingContact, editContact } = this.state;
        return (
            <Card title="User Contacts" style={{ width: 650, margin: '0 auto' }}>
                {contacts.loading && <em>Loading contacts...</em>}
                {contacts.error && <span className="text-danger">ERROR: {contacts.error}</span>}
                
                {contacts.items && <List
                    bordered
                    dataSource={contacts.items}
                    renderItem={(contact, index) => (
                        <List.Item>
                            {this.contactRowContent(contact, index)}
                        </List.Item>
                    )}
                />}
                <Card>
                    {creatingContact && <li className='create-contact'>
                            <Input placeholder="write name" onChange={this.setNewContactName} />
                            <Input placeholder="write phone" onChange={this.setNewContactPhone} />
                            <Button onClick={this.cancelCreating} default>cancel</Button>
                            <Button onClick={() => this.addUserContacts(this.props.user.id)} type="primary">save</Button>
                        </li>}
                    {!creatingContact && !editContact && <Button onClick={this.createUserContact} type="primary">Add contact</Button>}
                </Card>
            </Card>
        )
    }

    render() {
        const { user, contacts } = this.props;
        return (
            <Card >
                <Avatar size="large" icon={user.firstName.slice(0,1)} />
                <h3>{user.firstName} {user.lastName}</h3>
                <Link to="/login" className="ant-btn">Logout</Link>
                {this.renderContacts(contacts)}
            </Card>
        );
    }
}

function mapState(state) {
    const { contacts, authentication } = state;
    const { user } = authentication;
    return { user, contacts };
}

const actionCreators = {
    getUserContacts: userActions.getUserContacts,
    deleteUserContacts: userActions.deleteUserContacts,
    updateUserContacts: userActions.updateUserContacts,
    addUserContacts: userActions.addUserContacts,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };