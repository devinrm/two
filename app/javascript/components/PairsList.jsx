import React from 'react'
import PropTypes from 'prop-types'

export default class PairsList extends React.Component {
  renderPairs = () => {
    return this.props.pairs.map((pair, index) =>
      <li key={index}>
        {pair.pair_one} & {pair.pair_two}
      </li>
    )
  }

  render () {
    return (
      <ul className='pairs'>
        {this.renderPairs()}
      </ul>
    )
  }
}

PairsList.propTypes = {
  pairs: PropTypes.arrayOf(PropTypes.object)
}
