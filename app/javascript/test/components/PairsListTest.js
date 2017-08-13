import { shallow } from 'enzyme'
import React from 'react'
import { expect } from  'chai'

import PairsList from '../../components/PairsList'

describe('Displaying Pairs', () => {
  let pairsList
  let pairs = [{id: 1, pairOne: 'User One', pairTwo: 'User Two'}]

  beforeEach(() => {
    pairsList = shallow(<PairsList pairs={pairs}/>)
  })

  step('display pairs', () => {
    expect(pairsList.find('ul.pairs')).to.exist
    expect(pairsList.find('ul.pairs')).to.contain.text('User One | User Two')
  })
})