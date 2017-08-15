import { shallow } from 'enzyme'
import React from 'react'
import { expect } from  'chai'

import PairsList from '../../components/PairsList'

describe('Displaying Pairs', () => {
  let pairsList
  let pairs = [{pair_one: 'User One', pair_two: 'User Two'}]

  beforeEach(() => {
    pairsList = shallow(<PairsList pairs={pairs}/>)
  })

  step('display pairs', () => {
    expect(pairsList.find('ul.pairs')).to.exist
    expect(pairsList.find('ul.pairs')).to.contain.text('User One | User Two')
  })
})