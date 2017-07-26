class User < ApplicationRecord
  has_one :level

  validates_presence_of :name
end
