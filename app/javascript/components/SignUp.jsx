import React from 'react'
import { capitalize, replace } from 'lodash'
import UserForm from './UserForm'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    let users = await this.props.userRepository.getAll()
    this.setState({ users: users.users })
  }

  renderUserRows = () => {
    return (
      this.state.users.map(user =>
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{capitalize(replace(user.level, "_", " "))} Developer</td>
        </tr>)
    )
  }

  addUser = async (userData) => {
    await this.props.userRepository.add(userData)
    this.getUsers()
  }

  render() {
    return (
      <section>
        <UserForm addUser={this.addUser} />
        <table className="users">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {this.renderUserRows()}
          </tbody>
        </table>
      </section>
    )
  }
}