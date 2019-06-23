import React from 'react'
import { connect } from 'react-redux'
import { logIn, logOut } from '../store'

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn()),
  logOut: () => dispatch(logOut()),
})

const mapStateToProps = ({ loggedIn }) => ({
  loggedIn,
})

export default connect(mapStateToProps, mapDispatchToProps)(({ loggedIn, logOut, logIn }) => (
  <div>
    this page is the Contact
    {
      loggedIn
        ? <button onClick={() => { logOut() }}> logOut </button>
        : <button onClick={() => { logIn() }}> logIn </button>
    }
  </div>
))
