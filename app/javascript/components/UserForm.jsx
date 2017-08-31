import React from 'react'
import PropTypes from 'prop-types'

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      skillLevel: ''
    }
  }

  handleInputChange = event => {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleAddUser = async (event) => {
    event.preventDefault()
    let { fullName, skillLevel } = this.state
    this.setState({fullName: '', skillLevel: ''})
    await this.props.addUser({ fullName, skillLevel })
  }

  render() {
    return (
      <form>
        <div>
          <input
            id="user-full-name"
            type="text"
            name="fullName"
            required 
            placeholder=" "
            value={this.state.fullName}
            onChange={this.handleInputChange} />
          <label htmlFor="user-full-name">Full Name</label>
        </div>
        <div>
          <input
            type="radio"
            name="skillLevel"
            value="junior"
            id="user-skillLevel-junior"
            checked={this.state.skillLevel == "junior"}
            onClick={this.handleInputChange} />
          <label htmlFor="user-skillLevel-junior">Junior Developer</label>
        </div>
        <div>
          <input
            type="radio"
            name="skillLevel"
            value="mid_level"
            id="user-skillLevel-mid-level"
            checked={this.state.skillLevel == "mid_level"}
            onClick={this.handleInputChange} />
          <label htmlFor="user-skillLevel-mid-level">Mid-level Developer</label>
        </div>
        <div>
          <input
            type="radio"
            name="skillLevel"
            value="senior"
            id="user-skillLevel-senior"
            checked={this.state.skillLevel == "senior"}
            onClick={this.handleInputChange} />
          <label htmlFor="user-skillLevel-senior">Senior Developer</label>
        </div>
        <button className="fill" onClick={this.handleAddUser}>
          Sign Up
        </button>
      </form>
    );
  }
}

UserForm.propTypes = {
  addUser: PropTypes.func
}
