import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { clickButton, clickLink } from '../helpers/formHelper'
import App from '../../components/App'
import SignUp from '../../components/SignUp'
import PairsList from '../../components/PairsList'
import UserRepositoryFake from '../fakes/userRepositoryFake'

describe('Pairing Users', () => {
  let app
  let userRepositoryFake

  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake()
    app = shallow(<App userRepository={userRepositoryFake} />)
  })

  it("clicking Let's Code! Button renders PairsList", async () => {
    expect(app).to.containMatchingElement(<SignUp />)
    await clickButton(app, "Let's Code!")
    expect(app).to.containMatchingElement(<PairsList />)
  })

  it('clicking Back button renders SignUp', () => {
    app.setState({ renderSignUp: false })
    clickLink(app, 'Back')
    expect(app).to.containMatchingElement(<SignUp />)
  })
})
