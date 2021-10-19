class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.integer :user_id
      t.string :username
      t.string :password
      t.string :firstname
      t.string :lastname
      t.integer :user_type

      t.timestamps
    end
  end
end
