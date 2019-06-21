import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <div className="box">
        这是我学习 SSR 的第一个 Demo
      </div>
    )
  }
}
