require 'rails_helper'

describe 'User management' do
  describe 'creating a user' do
    before do
      post '/users', params: { user: user_params }
    end

    context 'with valid user params' do  
      let(:user_params) { { name: 'Test Name', level: 'junior' } }

      it 'redirects to user index page' do
        expect(response).to redirect_to(users_url)
      end
    end

    context 'with invalid user params' do
      let(:user_params) { { level: 'junior' } }

      it 'remains on the new user page' do
        expect(response).to_not redirect_to(users_url)
      end
    end
  end
end
