require "rails_helper"

RSpec.describe User, type: :model do
  it "requires a name" do
    user = User.new(name: "")

    user.valid?

    expect(user.errors[:name].any?).to eq(true)
  end
end
