import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './Header.jsx'
import routes from '../routes'


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
          {
            routes.map(page => <Route key={page.path} {...page} />)
          }
        </Switch>
      </div>
    )
  }
}
