require 'rails_helper'

describe 'getting users' do
  before do
    allow(User).to receive(:all).and_return [1, 2]
    get '/users'
  end

  it 'sends a list of users' do
    expect(response).to be_success
    expect(response.parsed_body.length).to eq(2)
  end
end

describe 'creating users' do
  let(:user) { User.new }

  before do 
    allow(User).to receive(:new).and_return user
  end

  describe 'valid user params' do
    before do 
      allow(user).to receive(:save).and_return true
      post '/users', params: { user: { 'a': 'b' } }
    end

    it 'creates a user' do 
      expect(response).to have_http_status(:created)
    end
  end

  describe 'invalid user params' do 
    before do 
      allow(user).to receive(:save).and_return false
      allow(user).to receive_message_chain(:errors, :full_messages).and_return ['error!']
      post '/users', params: { user: { 'a': 'b' } }
    end

    it 'returns error messages' do
      expect(response.parsed_body).to eq(['error!'])
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end

describe 'deleting users' do 
  before do 
      allow(User).to receive(:delete).and_return deleted_rows
      delete "/users/100"
    end

  describe 'user exists' do 
    let(:deleted_rows) { 1 }

    it 'deletes the user' do 
      expect(response).to be_ok
    end
  end

  describe 'user does not exist' do 
    let(:deleted_rows) { 0 }

    it 'returns an error message' do
      expect(response.parsed_body).to eq(['Cannot delete user that does not exist'])
      expect(response).to have_http_status :not_found
    end
  end
end