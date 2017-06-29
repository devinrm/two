require "rails_helper"

RSpec.describe User, type: :model do
  it "requires a name" do
    user = User.new(name: "")

    user.valid?

    expect(user.errors[:name].any?).to eq(true)
  end

  it "requires a developer_level" do
    user = User.new(developer_level: "")

    user.valid?

    expect(user.errors[:developer_level].any?).to eq(true)
  end
end
