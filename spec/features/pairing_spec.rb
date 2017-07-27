require 'rails_helper'
require 'capybara/rails'
require 'capybara/rspec'

describe 'Pairing Users' do
  it 'can pair created users' do
    visit root_url

    fill_in 'Full Name', with: 'Test Name'
    choose('Senior Developer')
    click_button 'Create User'

    within('table.users') do
      expect(page).to have_content('Test Name')
      expect(page).to have_content('Senior Developer')
    end
  end
end
