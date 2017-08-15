require 'rails_helper'

describe 'getting pairs' do 
  before do 
    allow(PairingService).to receive_message_chain(:new, :get_pairs).and_return [1,2]
    get '/pairs'
  end

  it 'sends a list of pairs' do 
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['pairs'].length).to eq(2)
  end
end