// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'promise-polyfill'
import 'babel-polyfill'
import App from '../components/App'
import UserRepository from '../repositories/userRepository'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

ReactDOM.render(
  <App userRepository={new UserRepository()} />,
  document.getElementById('root')
)
