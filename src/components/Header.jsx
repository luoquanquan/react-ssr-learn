import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ loggedIn }) => ({ loggedIn })

export default connect(mapStateToProps)(({ loggedIn }) => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    {Boolean(loggedIn) && <Link to="/userInfo">UserInfo</Link>}
  </header>
))
