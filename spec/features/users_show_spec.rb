require "rails_helper"

describe "Viewing the users show page" do
  it "shows one user" do
    user_one = User.create(name: "Jane Doe",
                           developer_level: "Senior Developer")

    visit user_url(user_one)

    expect(page).to have_text("two")
    expect(page).to have_text(user_one.name)
    expect(page).to have_text(user_one.developer_level)
  end
end
