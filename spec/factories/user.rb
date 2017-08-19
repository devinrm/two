FactoryGirl.define do
  factory :junior_user, class: User do
    name 'junior'
    level 'junior'
  end

  factory :mid_level_user, class: User do
    name 'mid_level'
    level 'mid_level'
  end

  factory :senior_user, class: User do
    name 'senior'
    level 'senior'
  end
end