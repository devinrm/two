require "rails_helper"

describe "Viewing the users index page" do
  it "shows all the users" do
    user_one = User.create(name: "Jane Doe",
                           developer_level: "Senior Developer")

    user_two = User.create(name: "John Doe",
                           developer_level: "Mid-level Developer")

    user_three = User.create(name: "Pizza Doe",
                             developer_level: "Junior Developer")

    visit users_url

    expect(page).to have_text("two")
    expect(page).to have_text(user_one.name)
    expect(page).to have_text(user_one.developer_level)

    expect(page).to have_text(user_two.name)
    expect(page).to have_text(user_two.developer_level)

    expect(page).to have_text(user_three.name)
    expect(page).to have_text(user_three.developer_level)
  end
end
