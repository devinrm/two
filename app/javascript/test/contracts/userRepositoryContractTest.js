import { expect } from 'chai';

export default function UserRepositoryContractTest(UserRepositoryClass) {
  let userRepository
  let validUserData = { fullName: 'TestFullName', level: 'Level' }

  describe('User Repository', () => {
    beforeEach(async () => {
      userRepository = new UserRepositoryClass();
    });

    describe('Adding Users', () => {
      it('adds the user', async () => {
        await userRepository.add(validUserData);
        let expectedUsers = await userRepository.getAll();
        validateUser(expectedUsers, validUserData);
      });
    });

    describe('Getting Users', () => {
      it('returns empty array when no users found', async () => {
        let returnedUsers = await userRepository.getAll()
        expect(returnedUsers).to.eql( { users: [] })
      })
    })

    describe('Deleting Users', () => {
      it('deletes the user', async () => {
        await userRepository.add(validUserData)
        await userRepository.delete(1)
        let returnedUsers = await userRepository.getAll()
        expect(returnedUsers).to.eql({ users: [] })
      })
    })

    describe('Getting Pairs', () => {
      it('returns array of pairs', async () => {
        await userRepository.add({ fullName: 'User One' })
        await userRepository.add({ fullName: 'User Two' })
        let returnedPairs = await userRepository.getPairs()
        expect(returnedPairs).to.eql({
          pairs: [
            { pair_one: 'User One', pair_two: 'User Two' }
          ] 
        })
      })
    })
  })
}

const validateUser = (expectedUsers, userData) => {
  let user = expectedUsers.users.find(user => user.name === userData.fullName);

  expect(user).to.exist;
  expect(user.level).to.eq(userData.skillLevel);
};
