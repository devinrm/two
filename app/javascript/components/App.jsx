import React from 'react'

import SignUp from './SignUp'
import PairsList from './PairsList'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pairs: [],
      renderSignUp: true
    }
  }

  renderPairsList = async () => {
    let pairs = await this.props.userRepository.getPairs()
    this.setState({
      renderSignUp: false,
      pairs: pairs
    })
  }

  render() {
    const renderSignUp = this.state.renderSignUp
    if(renderSignUp) {
      return (
        <div>
          <SignUp UserRepository={this.props.userRepository} />
          <button onClick={this.renderPairsList}>Let's Code!</button>
        </div>
      )
    } else {
      return (
        <PairsList pairs={this.state.pairs}/>
      )
    }
  }
}
