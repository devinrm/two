import 'whatwg-fetch'
import {noop} from 'lodash'

export default function userRepository() {
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

  this.getAll = async () => {
    let usersJson = []

    await fetch('/users')
      .then((data) => {
        return data.json()
      }).then((json) => {
        usersJson = json
      }).catch((error) => {

        console.log('request failed', error)
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

        console.log('request failed', error)
      })

    return { pairs: pairsJson }
  }
}
