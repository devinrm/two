import React from 'react'

export default class PairsList extends React.Component {
  constructor(props) {
    super(props)
  }
  
  renderPairs = () => {
    return (
      this.props.pairs.map((pair, index) => 
        <li key={index}>
          {pair.pair_one} | {pair.pair_two}
        </li>
      )
    )
  }

  render() {
    return(
      <ul className="pairs">
        {this.renderPairs()}
      </ul>
    )
  }
}