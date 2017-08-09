import { mount } from 'enzyme'
import React from 'react'
import { noop } from 'lodash'
import { expect } from 'chai'

import App from '../components/App'
import UserRepositoryFake from './fakes/userRepositoryFake'

describe('creating users', () => {

  let app

  beforeEach(() => {
    let userRepositoryFake = new UserRepositoryFake()
    app = mount(<App userRepository={userRepositoryFake} />)
  })

  step('fill out new user form', async () => {
    fillIn('Full Name', { with: 'Test Name'} )
    clickRadioButtonByLabel('Senior Developer')
    await clickButton('Sign Up')

    expect(app.find('table.users')).to.exist
    expect(app.find('table.users')).to.contain.text('Test Name')
    expect(app.find('table.users')).to.contain.text('Senior Developer')
  })

  const fillIn = (labelName, args) => {
    const input = findInputByLabel(labelName)
    input.simulate('change', { target: { value: args.with, name: input.props().name } })
  }

  const findInputByLabel = (text) => {
    const label = app.find('label').findWhere(e => e.text() == text)
    return app.find(`input#${label.prop('htmlFor')}`)
  }

  const clickRadioButtonByLabel = (labelName) => {
    const radioButton = findInputByLabel(labelName)
    radioButton.simulate('click', { target: { value: radioButton.props().value, name: radioButton.props().name} })
  }

  const clickButton = (text) => {
    app.find(`button[children="${text}"]`).simulate('click', { preventDefault: noop })
  }
})
