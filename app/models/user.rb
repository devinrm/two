class User < ApplicationRecord
  validates_presence_of :name, :developer_level
end
