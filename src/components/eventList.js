import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class EventList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            events: []
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        fetch('http://172.24.98.178:8080/events/', {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            this.setState({ events: data })
        })
    }

    handleDelete(id) {

        fetch("http://172.24.98.178:8080/events/"+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem("token"),
            }
        }).then(res => {

        })

        const events = this.state.events.filter(t => t.id !== id)
        this.setState({ events })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={1}></Col>
                    <Col>
                        <Row style={{marginBottom: "10px"}}>
                            <h2 >Your event list</h2>
                            <Button style={{marginLeft: "10px"}} href="/events/create">New event +</Button>
                        </Row>
                        
                        
                        <Table className="table" bordered hover>
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Categoría</th>
                                    <th scope="col">Lugar</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Virtual</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.events.map((e, i) => (

                                    <tr key={i}>
                                        <td>{e.id}</td>
                                        <td>{e.event_name}</td>
                                        <td>{e.event_category}</td>
                                        <td>{e.event_place}</td>
                                        <td>{e.event_address}</td>
                                        <td>{e.event_type.toString()}</td>
                                        <td><Link to={{ pathname: '/events/detail/' + e.id }}>Details</Link> / <Link to={{ pathname: '/events/' }} onClick={() => this.handleDelete(e.id)}>Delete</Link></td>

                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            </div>
        )
    }
}
