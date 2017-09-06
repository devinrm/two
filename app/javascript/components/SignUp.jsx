import React from 'react'
import PropTypes from 'prop-types'
import { capitalize, replace } from 'lodash'
import UserForm from './UserForm'
import UserRepository from '../repositories/userRepository'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount () {
    this.getUsers()
  }

  getUsers = async () => {
    let users = await this.props.userRepository.getAll()
    this.setState({ users: users.users })
  }

  handleDeleteUser = async (userID) => {
    await this.props.userRepository.delete(userID)
    this.getUsers()
  }

  renderUserRows = () => {
    return (
      this.state.users.map(user =>
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{capitalize(replace(user.level, '_', ' '))} Developer</td>
          <td className='fa-icon'>
            <i className='fa fa-trash'
              aria-hidden='true'
              aria-label='delete user'
              id={`delete-user-${user.id}`}
              onClick={() => { this.handleDeleteUser(user.id) }} />
          </td>
        </tr>)
    )
  }

  addUser = async userData => {
    await this.props.userRepository.add(userData)
    this.getUsers()
  }

  render () {
    return (
      <section>
        <UserForm addUser={this.addUser} />
        <table className='users'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th />
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

SignUp.propTypes = {
  userRepository: PropTypes.instanceOf(UserRepository)
}
