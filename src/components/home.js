import React, { Component } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            redirect: null
        }

        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    componentDidMount() {
        localStorage.clear("token")
    }

    onUsernameChange(e) {
        this.setState({ username: e.target.value })
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleLogin(e) {
        e.preventDefault();
        fetch("http://172.24.98.178:8080/users/api-auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => {
            return res.json()
        }).then(data=>{
            console.log(data)
            if (data.success) {
                localStorage.setItem("token",data.token)
                this.setState({ redirect: true })
            }
        })
    }

    redirect() {
        if(this.state.redirect){
            return <Redirect to="/events"/>
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
                    <Col>
                        <div className="border rounded" style={{ padding: "10px" }}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="email" placeholder="Enter username" onChange={this.onUsernameChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange} />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="button" onClick={this.handleLogin} >
                                            Login
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Link to="register" >
                                            Register
                                        </Link>
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
