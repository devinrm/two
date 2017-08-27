import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { clickButton } from '../helpers/formHelper';
import sinon from 'sinon';
import App from '../../components/App';
import SignUp from '../../components/SignUp';
import PairsList from '../../components/PairsList';
import UserRepositoryFake from '../fakes/userRepositoryFake';

describe('Pairing Users', () => {
  let app,
    pairsJson = { pairs: [1] },
    userRepositoryFake;

  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    app = shallow(<App userRepository={userRepositoryFake} />);
  });

  step("click Let's Code! Button renders PairsList", async () => {
    expect(app).to.contain(<SignUp userRepository={userRepositoryFake} />);
    await clickButton(app, "Let's Code!");
    expect(app).to.contain(<PairsList pairs={[]} />);
  });
});
