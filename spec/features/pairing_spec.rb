require 'rails_helper'

describe 'Pairing Spec' do
  before do 
    visit root_path

    sign_up_user('User One', 'Senior Developer')
    sign_up_user('User Two', 'Junior Developer')
  end

  describe 'Pairing Users', js: true do
    it 'can pair created users' do
      validate_user_signed_up('User One')
      validate_user_signed_up('User Two')

      click_button("Let's Code!")

      within('ul.pairs') do 
        expect(page).to have_content('User One')
        expect(page).to have_content('User Two')
      end
    end
  end

  fdescribe 'Deleting Users', js: true do 
    it 'can delete created users' do
      user_one = User.find_by_name('User One')
      find("#delete-user-#{user_one.id}").click

      expect(page).to have_content('User Two')
      expect(page).to_not have_content('User One')
    end
  end

  def sign_up_user(user_name, skill_level)
    fill_in 'Full Name', with: user_name
    choose(skill_level)
    click_button 'Sign Up'
  end

  def validate_user_signed_up(user_name)
    within('table.users') do 
      expect(page).to have_content(user_name)
    end
  end
end
