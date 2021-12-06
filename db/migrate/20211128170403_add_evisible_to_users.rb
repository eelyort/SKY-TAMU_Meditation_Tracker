class AddEvisibleToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :evisible, :integer, default: 1
  end
end
