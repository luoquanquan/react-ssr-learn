import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './Header.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import UserInfo from './UserInfo.jsx'


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

        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/userInfo" exact component={UserInfo} />
        </Switch>
      </div>
    )
  }
}
