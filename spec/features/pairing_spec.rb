require 'rails_helper'
require 'capybara/rails'
require 'capybara/rspec'

xdescribe 'Pairing Users', js: true do
  it 'can pair created users' do
    visit root_url

    fill_in "Full Name", with: 'Hey Devin'
    choose('Senior Developer')
    click_button 'Create User'

    within('table.users') do
      expect(page).to have_content('Hey Devin')
      expect(page).to have_content('Senior Developer')
    end
  end
end
