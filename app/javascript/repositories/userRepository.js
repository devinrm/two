import 'whatwg-fetch'
import {noop} from 'lodash'

export default function UserRepository() {
  this.add = async (userData) => {
    await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.fullName,
        level: userData.skillLevel,
      })
    }).then(noop)
  }

  this.delete = async (userID) => {
    await fetch('/users/' + userID, {
      method: 'DELETE',
    })
      .then(noop)
      .catch((error) => {
        console.log('delete user request failed', error)
      })
  }

  this.getAll = async () => {
    let usersJson = []

    await fetch('/users')
      .then((data) => {
        return data.json()
      }).then((json) => {
        usersJson = json
      }).catch((error) => {
        console.log('get users request failed', error)
      })

    return {users: usersJson}
  }

  this.getPairs = async () => {
    let pairsJson = []

    await fetch('/pairs')
      .then((data) => {
        return data.json()
      }).then((json) => {
        pairsJson = json
      }).catch((error) => {
        console.log('get pairs request failed', error)
      })
    
    return pairsJson
  }
}
