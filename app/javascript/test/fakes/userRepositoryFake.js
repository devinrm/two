import UserRepository from '../../repositories/userRepository'
import UserRepositoryContractTest from '../contracts/userRepositoryContractTest'
import isEmpty from 'lodash/isEmpty'
import chunk from 'lodash/chunk'
import remove from 'lodash/remove'

export default class UserRepositoryFake extends UserRepository {
  constructor () {
    super()
    this.users = []
    this.pairs = []
    this.id = 1
  }

  add = async userData => {
    this.users.push({ name: userData.fullName, level: userData.skillLevel, id: this.id })
    this.id += 1
  }

  delete = async (userID) => {
    remove(this.users, (user) => user.id === userID)
  }

  getAll = async () => ({ users: this.users })

  getPairs = async () => {
    if (!isEmpty(this.users)) {
      let pairChunks = chunk(this.users, 2)
      pairChunks.forEach(users => {
        const pairOne = users[0].name
        const pairTwo = (users[1] && users[1].name) || null
        this.pairs.push({
          pair_one: pairOne,
          pair_two: pairTwo
        })
      })
    }
    return { pairs: this.pairs }
  }
}

describe('UserRepositoryFake Contract Test', () => {
  UserRepositoryContractTest(UserRepositoryFake)
})
