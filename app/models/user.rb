class User < ApplicationRecord
  enum level: %i[junior mid_level senior]
  validates_presence_of :name
end
