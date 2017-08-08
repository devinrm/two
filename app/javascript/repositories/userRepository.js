import 'whatwg-fetch'
import {noop} from 'lodash'

export default function userRepository(baseUrl) {
  this.add = async (userData) => {
    await fetch(`${baseUrl}/users`, {
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

    await fetch(`${baseUrl}/users`)
      .then((data) => {
        return data.json()
      }).then((json) => {
        usersJson = json
      }).catch((error) => {

        console.log('request failed', error)
      })

    return {users: usersJson}
  }
}
