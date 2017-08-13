import React from 'react'

export default class PairsList extends React.Component {
  constructor(props) {
    super(props)
  }
  
  renderPairs = () => {
    return (
      this.props.pairs.map(pair => 
        <li key={pair.id}>
          {pair.pairOne} | {pair.pairTwo}
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