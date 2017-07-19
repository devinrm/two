class AddReferencesToLevel < ActiveRecord::Migration[5.1]
  def change
    add_reference :levels, :user, foreign_key: true
  end
end
