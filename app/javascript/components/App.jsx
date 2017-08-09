import React from 'react'
import { capitalize, replace } from 'lodash'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      fullName: '',
      skillLevel: ''
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

  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleAddUser = async (event) => {
    event.preventDefault()
    let { fullName, skillLevel } = this.state
    await this.props.userRepository.add({ fullName, skillLevel })
    this.getUsers()
  }

  render() {
    return (
      <section>
        <form>
          <div>
            <input id="user-full-name"
              type="text"
              name="fullName"
              required placeholder=" "
              onChange={this.handleInputChange} />
            <label htmlFor="user-full-name">Full Name</label>
          </div>
          <div>
            <input type="radio"
              name="skillLevel"
              value="junior"
              id="user-skillLevel-junior"
              onClick={this.handleInputChange} />
            <label htmlFor="user-skillLevel-junior">Junior Developer</label>
          </div>
          <div>
            <input type="radio"
              name="skillLevel"
              value="mid_level"
              id="user-skillLevel-mid-level"
              onClick={this.handleInputChange} />
            <label htmlFor="user-skillLevel-mid-level">Mid-level Developer</label>
          </div>
          <div>
            <input type="radio"
              name="skillLevel"
              value="senior"
              id="user-skillLevel-senior"
              onClick={this.handleInputChange} />
            <label htmlFor="user-skillLevel-senior">Senior Developer</label>
          </div>
          <button className="fill" onClick={this.handleAddUser}>Sign Up</button>
        </form>

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
