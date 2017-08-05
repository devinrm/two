import { expect } from 'chai'

export default function UserRepositoryContractTest(UserRepositoryClass) {
  let userRepository

  describe('User Repository', () => {
    beforeEach(async () => {
      userRepository = new UserRepositoryClass('http://localhost:3333')
    })

    describe('Adding Users', () => {
      let validUserData = { fullName: 'TestFullName', level: 'Level' }

      it('adds the user', async () => {
        await userRepository.add(validUserData)
        let expectedUsers = await userRepository.getAll()
        validateUser(expectedUsers, validUserData)
      })
    })

    describe('Getting Users', () => {
      it('returns empty array when no users found', async () => {
        let returnedUsers = await userRepository.getAll()
        expect(returnedUsers).to.deep.eq( { users: [] })
      })
    })
  })
}

const validateUser = (expectedUsers, userData) => {
  let user = expectedUsers.users.find(user => user.name === userData.fullName)

  expect(user).to.exist
  expect(user.level).to.eq(userData.skillLevel)
}