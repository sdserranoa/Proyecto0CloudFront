import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            first: "",
            last: "",
            email: "",
            password: "",
            redirect: false
        }

        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onFirstChange = this.onFirstChange.bind(this)
        this.onLastChange = this.onLastChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    onUsernameChange(e) {
        this.setState({ username: e.target.value })
    }

    onFirstChange(e) {
        this.setState({ first: e.target.value })
    }

    onLastChange(e) {
        this.setState({ last: e.target.value })
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value })
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            "username": this.state.username,
            "first_name": this.state.first,
            "last_name": this.state.last,
            "email": this.state.email,
            "password": this.state.password
        }

        fetch("http://35.198.15.156:8080/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.ok) {
                this.setState({ redirect: true })
            }
        })
        
    }

    redirect() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return <div></div>
        }
    }

    render() {
        return (
            <div>
                {this.redirect()}
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <div className="border rounded" style={{ padding: "10px" }}>
                            <Form id="form-login">
                                <Form.Group controlId="formGridUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" onChange={this.onUsernameChange} />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter first name" onChange={this.onFirstChange} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLast">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter last name" onChange={this.onLastChange} />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={this.onEmailChange} />
                                </Form.Group>

                                <Form.Group controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange} />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="button" onClick={this.handleSubmit}>
                                            Submit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Link to="/">Back to home</Link>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}
