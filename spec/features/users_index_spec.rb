require "rails_helper"

describe "Viewing the users index page" do
  it "shows all the users" do
    user_one = User.create(name: "Jane Doe")

    user_two = User.create(name: "John Doe")

    user_three = User.create(name: "Pizza Doe")

    visit users_path

    expect(page).to have_text("two")
    expect(page).to have_text(user_one.name)
    expect(page).to have_text(user_two.name)
    expect(page).to have_text(user_three.name)
  end
end
