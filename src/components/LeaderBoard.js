import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>LeaderBoard</h3>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(LeaderBoard)