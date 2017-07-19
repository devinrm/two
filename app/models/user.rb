class User < ApplicationRecord
  validates_presence_of :name

  def pair(user)
  end
end
