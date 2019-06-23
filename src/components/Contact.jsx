import React from 'react'
import { connect } from 'react-redux'
import { login } from '../store'

const mapDispatchToProps = dispatch => ({
  loggIn: () => dispatch(login()),
})

const mapStateToProps = ({ loggedIn }) => ({
  loggedIn,
})

export default connect(mapStateToProps, mapDispatchToProps)(props => (
  <div>
    this page is the Contact
    <button
      type="primary"
      onClick={() => {
        console.log(props)
        props.loggIn()
      }}
    >
      logIn
    </button>
  </div>
))
