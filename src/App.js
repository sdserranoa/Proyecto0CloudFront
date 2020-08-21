import React from 'react';
import './App.css';
import Home from './components/home'
import EventList from './components/eventList'
import Event from './components/event'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './components/register'
import CreateEvent from './components/createEvent'
import EventEdit from './components/eventEdit'

function App() {
  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>Welcome to event App</h1>
      <br />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/events/detail/:id" exact component={Event} />
        <Route path="/events/create" exact component={CreateEvent} />
        <Route path="/events" exact component={EventList} />
        <Route path="/register" component={Register} />
        <Route path="/events/edit/:id" component={EventEdit} />
      </Router>
    </div>
  );
}

export default App;
