import React from 'react'
import PropTypes from 'prop-types'
import SignUp from './SignUp'
import PairsList from './PairsList'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pairs: [],
      renderSignUp: true
    }
  }

  renderPairsList = async () => {
    let pairsJson = await this.props.userRepository.getPairs()
    this.setState({
      renderSignUp: false,
      pairs: pairsJson.pairs
    })
  }

  handleBackClick = () => {
    this.setState({
      renderSignUp: true
    })
  }

  render () {
    const renderSignUp = this.state.renderSignUp
    if (renderSignUp) {
      return (
        <section>
          <SignUp userRepository={this.props.userRepository} />
          <button className='raise' onClick={this.renderPairsList}>
            Let's Code!
          </button>
        </section>
      )
    } else {
      return (
        <section>
          <a onClick={this.handleBackClick}>
            <i className='fa fa-arrow-circle-o-left fa-fw'
              aria-hidden='true' />
              Back
          </a>
          <PairsList pairs={this.state.pairs} />
        </section>
      )
    }
  }
}

App.propTypes = {
  userRepository: PropTypes.object
}
