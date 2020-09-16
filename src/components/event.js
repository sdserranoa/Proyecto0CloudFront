import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

export default class Event extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            event: {
                id: 1,
                event_type: ""
            }
        }
    }

    componentDidMount() {
        fetch('http://3.131.142.53:8080/events/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            this.setState({ event: data })
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card style={{ width: '25rem', marginBottom: "20px" }}>
                            <Card.Img variant="top" src={this.state.event.thumbnail} />
                            <Card.Body>
                            <Card.Title>{this.state.event.event_name}</Card.Title>
                                <Card.Text>
                                    Category: {this.state.event.event_category}<br/>
                                    Place: {this.state.event.event_place}<br/>
                                    Address: {this.state.event.event_address}<br/>
                                    Start date: {this.state.event.event_initial_date}<br/>
                                    End date: {this.state.event.event_final_date}<br/>
                                    Virtual: {this.state.event.event_type.toString()}<br/>
                                </Card.Text>
                                <Button style={{ marginRight: "10px" }} href={"/events/edit/"+this.state.event.id} variant="primary">Edit</Button>
                                <Button href="/events" variant="danger">Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}
