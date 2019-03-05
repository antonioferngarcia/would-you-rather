import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionPage extends Component {
  render() {
    const { id, replies } = this.props
    return (
      <div>
        QUESTION PAGE
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {}
}

export default connect(mapStateToProps)(QuestionPage)