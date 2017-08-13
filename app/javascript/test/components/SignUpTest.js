import { mount } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import { clickButton } from '../helpers/formHelper'

import SignUp from '../../components/SignUp'
import UserRepositoryFake from '../fakes/userRepositoryFake'

describe('User Sign Up', () => {

  let signUp

  beforeEach(() => {
    let userRepositoryFake = new UserRepositoryFake()
    signUp = mount(<SignUp userRepository={userRepositoryFake} />)
  })

  step('fill out new user form', async () => {
    fillIn('Full Name', { with: 'Test Name'} )
    clickRadioButtonByLabel('Senior Developer')
    await clickButton(signUp, 'Sign Up')

    expect(signUp.find('table.users')).to.exist
    expect(signUp.find('table.users')).to.contain.text('Test Name')
    expect(signUp.find('table.users')).to.contain.text('Senior Developer')
  })

  const fillIn = (labelName, args) => {
    const input = findInputByLabel(labelName)
    input.simulate('change', { target: { value: args.with, name: input.props().name } })
  }

  const findInputByLabel = (text) => {
    const label = signUp.find('label').findWhere(e => e.text() == text)
    return signUp.find(`input#${label.prop('htmlFor')}`)
  }

  const clickRadioButtonByLabel = (labelName) => {
    const radioButton = findInputByLabel(labelName)
    radioButton.simulate('click', { target: { value: radioButton.props().value, name: radioButton.props().name} })
  }
})
