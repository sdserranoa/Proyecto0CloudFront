import React, { Component } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class eventEdit extends Component {
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

    componentDidMount() {
        fetch('http://35.198.15.156:8080/events/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {

            this.setState({ event_name: data.event_name })
            this.setState({ event_category: data.event_category })
            this.setState({ event_place: data.event_place })
            this.setState({ event_address: data.event_address })
            this.setState({ event_initial_date: data.event_initial_date })
            this.setState({ event_final_date: data.event_final_date })
            this.setState({ event_type: data.event_type })
            this.setState({ thumbnail: data.thumbnail })
            this.setState({ event_creator: data.event_creator })
        })
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
        fetch('http://35.198.15.156:8080/events/' + this.props.match.params.id, {
            method: 'PUT',
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
                                    <Form.Control type="email" placeholder="Enter name" onChange={this.onNameChange} defaultValue={this.state.event_name} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" onChange={this.onCategoryChange} >
                                        {console.log(this.state.event_category)}
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
                                <Form.Control onChange={this.onThumbChange} defaultValue={this.state.thumbnail} />
                            </Form.Group>

                            <Form.Group controlId="formPlace">
                                <Form.Label>Place</Form.Label>
                                <Form.Control defaultValue={this.state.event_place} onChange={this.onPlaceChange} />
                            </Form.Group>

                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="str 123" onChange={this.onAddressChange} defaultValue={this.state.event_address} />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="InitDate">
                                    <Form.Label>Initial Date</Form.Label>
                                    <Form.Control onChange={this.onIDateChange} defaultValue={this.state.event_initial_date} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="finalDate">
                                    <Form.Label>Final Date</Form.Label>
                                    <Form.Control onChange={this.onFDateChange} defaultValue={this.state.event_final_date} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formVirtual">
                                <Form.Check type="checkbox" label="Virtual" onChange={this.onVirtualChange} defaultChecked={this.state.event_type} />
                            </Form.Group>

                            <Button variant="primary" type="button" href="/events" onClick={this.handleCrate} style={{ marginRight: "10px" }}>
                                Update
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
