import UserRepositoryContractTest from '../contracts/userRepositoryContractTest'
import { expect } from 'chai'
import isEmpty from 'lodash/isEmpty'
import chunk from 'lodash/chunk'
 
export default function UserRepositoryFake() {
  let users = []
  let pairs = []
  let id = 1

  this.add = async (userData) => {
    users.push({name: userData.fullName, level: userData.skillLevel, id: id})
    id += 1
  }

  this.getAll = async () => ({ users: users })

  this.getPairs = async () => {
    if(!isEmpty(users)) {
      let pairChunks = chunk(users, 2)
      pairChunks.forEach((users) => {
        const pairOne = users[0].name
        const pairTwo = (users[1] && users[1].name) || null
        pairs.push({pair_one: pairOne,
                    pair_two: pairTwo
        })
      })
    }
    return { pairs: pairs } 
  }
}

describe('UserRepositoryFake Contract Test', () => {
  UserRepositoryContractTest(UserRepositoryFake)
})