import UserRepositoryContractTest from '../contracts/userRepositoryContractTest'
import { expect } from 'chai'

export default function UserRepositoryFake() {
  let users = []
  let id = 1

  this.add = async (userData) => {
    users.push({name: userData.fullName, level: userData.skillLevel, id: id})
    id += 1
  }

  this.getAll = async () => {
    return ({ users: users })
  }
}

describe('UserRepositoryFake Contract Test', () => {
  UserRepositoryContractTest(UserRepositoryFake)
})