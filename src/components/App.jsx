import React from 'react'
import {
  Link, Route, HashRouter,
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
      <HashRouter>
        <div>
          <h1>{ title }</h1>
          <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <main>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
          </main>
        </div>
      </HashRouter>
    )
  }
}
