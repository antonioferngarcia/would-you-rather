import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Login</h3>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(Login)