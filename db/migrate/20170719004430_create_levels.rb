class CreateLevels < ActiveRecord::Migration[5.1]
  def change
    create_table :levels do |t|
      t.string :junior
      t.string :mid
      t.string :senior

      t.timestamps
    end
  end
end
