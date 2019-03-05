import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Home</h3>
        <ul className='dashboard-list'>
          List of questions
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(Home)