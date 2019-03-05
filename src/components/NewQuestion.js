import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    text: '',
    toHome: false,
  };

  render() {
    const { text, toHome } = this.state;

    /* if (toHome === true) {
      return <Redirect to='/' />
    } */

    return (
      <div>
        <h3 className='center'>Compose new Question</h3>

      </div>
    )
  }
}

export default connect()(NewQuestion)