import React from 'react'
import {
  NavLink, Route, Switch,
} from 'react-router-dom'

import Home from './Home.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '欢迎来到澳门皇冠赌场~',
    }
  }


  render() {
    const { title } = this.state
    return (
      <div>
        <h1>{ title }</h1>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
        </Switch>
      </div>
    )
  }
}
