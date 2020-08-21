import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Redirect } from 'react-router'

export default class CreateEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {

            event_name: "",
            event_category: "",
            event_place: "",
            event_address: "",
            event_initial_date: "",
            event_final_date: "",
            event_type: true,
            thumbnail: null,
            event_creator: 1

        }
        this.onNameChange = this.onNameChange.bind(this)
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onPlaceChange = this.onPlaceChange.bind(this)
        this.onAddressChange = this.onAddressChange.bind(this)
        this.onIDateChange = this.onIDateChange.bind(this)
        this.onFDateChange = this.onFDateChange.bind(this)
        this.onVirtualChange = this.onVirtualChange.bind(this)
        this.onThumbChange = this.onThumbChange.bind(this)
        this.handleCrate = this.handleCrate.bind(this)
    }

    onNameChange(e) {
        this.setState({ event_name: e.target.value })
    }

    onCategoryChange(e) {
        this.setState({ event_category: e.target.value })
    }

    onPlaceChange(e) {
        this.setState({ event_place: e.target.value })
    }

    onAddressChange(e) {
        this.setState({ event_address: e.target.value })
    }

    onIDateChange(e) {
        this.setState({ event_initial_date: e.target.value })
    }

    onFDateChange(e) {
        this.setState({ event_final_date: e.target.value })
    }

    onVirtualChange(e) {
        if (e.target.value === "on") {
            this.setState({ event_type: true })
        }
        else {
            this.setState({ event_type: false })
        }

    }

    onThumbChange(e) {
        if (e.target.value !== "") {
            this.setState({ thumbnail: e.target.value })
        }
    }

    handleCrate() {

        console.log(this.state)

        this.setState({ event_creator: 2 })
        fetch('http://172.24.98.178:8080/events/', {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            console.log(res.json())
        })
    }

    redirect(red) {
        if (red) {
            return <Redirect to="/events" />
        } else {
            return <div></div>
        }
    }

    render() {
        return (
            <div>
                {this.redirect(false)}
                <Row>
                    <Col xs={1}></Col>
                    <Col>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formName">
                                    <Form.Label>Event name</Form.Label>
                                    <Form.Control type="email" placeholder="Enter name" onChange={this.onNameChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..." onChange={this.onCategoryChange}>
                                        <option>Choose...</option>
                                        <option>Conferencia</option>
                                        <option>Seminario</option>
                                        <option>Congreso</option>
                                        <option>Curso</option>
                                    </Form.Control>
                                </Form.Group>

                            </Form.Row>

                            <Form.Group controlId="formthumbnail">
                                <Form.Label>Thumbnail link</Form.Label>
                                <Form.Control onChange={this.onThumbChange} />
                            </Form.Group>

                            <Form.Group controlId="formPlace">
                                <Form.Label>Place</Form.Label>
                                <Form.Control placeholder="Bar Blackcat" onChange={this.onPlaceChange} />
                            </Form.Group>

                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="str 123" onChange={this.onAddressChange} />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="InitDate">
                                    <Form.Label>Initial Date</Form.Label>
                                    <Form.Control onChange={this.onIDateChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="finalDate">
                                    <Form.Label>Final Date</Form.Label>
                                    <Form.Control onChange={this.onFDateChange} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formVirtual">
                                <Form.Check type="checkbox" label="Virtual" onChange={this.onVirtualChange} />
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={this.handleCrate} href="/events" style={{marginRight: "10px"}}>
                                Create
                            </Button>

                            <Button variant="danger" type="button" href="/events">
                                Cancel
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            </div>
        )
    }
}
